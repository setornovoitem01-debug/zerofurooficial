import { createServerFn } from "@tanstack/react-start";
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

// -------------------------- Schemas --------------------------

const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  document: z.string().min(11),
});

const shippingSchema = z.object({
  cep: z.string(),
  address: z.string(),
  number: z.string(),
  complement: z.string().optional().default(""),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
});

const trackingSchema = z
  .object({
    src: z.string().nullish(),
    sck: z.string().nullish(),
    utm_source: z.string().nullish(),
    utm_medium: z.string().nullish(),
    utm_campaign: z.string().nullish(),
    utm_content: z.string().nullish(),
    utm_term: z.string().nullish(),
  })
  .partial()
  .optional();

const createInputSchema = z.object({
  productId: z.string().min(1),
  shippingId: z.enum(["gratis", "sedex", "sedex12"]),
  customer: customerSchema,
  shipping: shippingSchema,
  tracking: trackingSchema,
});

// -------- Tabela de preços travada no servidor (nunca confie no cliente) --------

type ProductRow = { name: string; price: number };
const PRODUCTS: Record<string, ProductRow> = {
  "carro-13-15": { name: "Kit Selante Zero Furo — Aro 13 a 15", price: 95.0 },
  "carro-16-18": { name: "Kit Selante Zero Furo — Aro 16 a 18", price: 110.5 },
  "carro-19-23": { name: "Kit Selante Zero Furo — Aro 19 a 23", price: 129.79 },
  "compressor-3em1": {
    name: "Compressor de Ar Portátil 3 em 1 com Carregador Power Bank e Lanterna LED",
    price: 55.9,
  },
};

const SHIPPING_PRICES: Record<"gratis" | "sedex" | "sedex12", number> = {
  gratis: 0,
  sedex: 25.68,
  sedex12: 68.75,
};

const SLUG = "zerofuro";

// -------------------------- Yuvex resposta --------------------------

type YuvexPixResponse = {
  payment: {
    id: string;
    txId: string;
    amount: number;
    status: string;
    expiresAt: string;
    methodData: {
      type: "PIX";
      pixCopyPaste: string;
      qrCodeBase64: string | null;
      qrCodeUrl: string | null;
    };
  };
};

// -------------------------- createPixCharge --------------------------

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createInputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.YUVEXPAY_API_KEY;
    if (!apiKey) throw new Error("YUVEXPAY_API_KEY não configurada");

    const product = PRODUCTS[data.productId];
    if (!product) throw new Error(`Produto desconhecido: ${data.productId}`);

    const shippingPrice = SHIPPING_PRICES[data.shippingId];
    const amount = Math.round((product.price + shippingPrice) * 100) / 100;
    const amountCents = Math.round(amount * 100);

    const externalId = `${SLUG}-${crypto.randomUUID()}`;

    const yuvexRes = await fetch("https://api.yuvexpay.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": externalId,
      },
      body: JSON.stringify({
        amount,
        currency: "BRL",
        methods: ["PIX"],
        mode: "headless",
        description: `Pedido Zero Furo — ${product.name}`,
        externalId,
        expiresInMinutes: 30,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          phone: data.customer.phone,
          document: data.customer.document,
        },
        metadata: {
          slug: SLUG,
          productId: data.productId,
          shippingId: data.shippingId,
        },
      }),
    });

    if (!yuvexRes.ok) {
      const txt = await yuvexRes.text();
      console.error(`[yuvexpay create] ${yuvexRes.status}: ${txt}`);
      throw new Error(`Falha ao gerar Pix (${yuvexRes.status})`);
    }

    const body = (await yuvexRes.json()) as YuvexPixResponse;
    const payment = body.payment;
    const method = payment.methodData;

    let customerIp: string | null = null;
    try {
      customerIp =
        getRequestHeader("cf-connecting-ip") ||
        getRequestHeader("x-real-ip") ||
        getRequestIP({ xForwardedFor: true }) ||
        null;
    } catch {
      customerIp = null;
    }

    const tracking = data.tracking ?? {};

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insertErr } = await supabaseAdmin.from("orders").insert({
      external_id: externalId,
      yuvex_payment_id: payment.id,
      yuvex_tx_id: payment.txId,
      status: "pending",
      amount,
      product_id: data.productId,
      product_name: product.name,
      units: 1,
      shipping_id: data.shippingId,
      shipping_price: shippingPrice,
      pix_copy_paste: method.pixCopyPaste,
      pix_qr_code_base64: method.qrCodeBase64,
      customer: { ...data.customer, ip: customerIp },
      shipping_address: data.shipping,
      utm: tracking,
      expires_at: payment.expiresAt,
    });
    if (insertErr) {
      console.error("[orders insert]", insertErr);
      throw new Error("Falha ao salvar pedido");
    }

    // Utmify waiting_payment (best-effort).
    try {
      const { sendUtmifyOrder } = await import("./utmify.server");
      await sendUtmifyOrder({
        orderId: externalId,
        status: "waiting_payment",
        createdAt: new Date(),
        amountCents,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          document: data.customer.document,
          phone: data.customer.phone,
          ip: customerIp,
        },
        product: { id: data.productId, name: product.name, quantity: 1 },
        tracking,
      });
    } catch (err) {
      console.error("Utmify pending tracking failed", err);
    }

    return {
      externalId,
      amount,
      pixCopyPaste: method.pixCopyPaste,
      qrCodeBase64: method.qrCodeBase64,
      qrCodeUrl: method.qrCodeUrl,
      expiresAt: payment.expiresAt,
    };
  });

// -------------------------- getOrderStatus --------------------------

export const getOrderStatus = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ externalId: z.string() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("status, paid_at, amount")
      .eq("external_id", data.externalId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) return { status: "not_found" as const, paidAt: null, amount: 0 };
    return {
      status: row.status as string,
      paidAt: row.paid_at as string | null,
      amount: Number(row.amount),
    };
  });
