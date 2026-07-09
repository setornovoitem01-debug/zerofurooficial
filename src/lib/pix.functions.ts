import { createServerFn } from "@tanstack/react-start";
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { PRODUCTS, SHIPPING_PRICES, isSealantKitId, type ProductId } from "./products";

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
  addOns: z.array(z.enum(["compressor-3em1"])).optional().default([]),
  customer: customerSchema,
  shipping: shippingSchema,
  tracking: trackingSchema,
});

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
    const slug = "zerofuro";

    const product = PRODUCTS[data.productId as ProductId];
    if (!product) throw new Error(`Produto desconhecido: ${data.productId}`);

    const addOns = Array.from(new Set(data.addOns));
    if (addOns.length > 0 && !isSealantKitId(data.productId)) {
      throw new Error("Order bump disponível apenas para kits de selante");
    }
    const addOnProducts = addOns.map((id) => ({ id, ...PRODUCTS[id] }));

    const shippingPrice = SHIPPING_PRICES[data.shippingId];
    const productsAmount = addOnProducts.reduce(
      (sum, item) => sum + Number(item.price),
      Number(product.price),
    );
    const amount = Math.round((productsAmount + shippingPrice) * 100) / 100;
    const amountCents = Math.round(amount * 100);
    const productId = addOns.length ? `${data.productId}+${addOns.join("+")}` : data.productId;
    const productName = [product.name, ...addOnProducts.map((item) => item.name)].join(" + ");

    const externalId = `${slug}-${crypto.randomUUID()}`;

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
        description: `Pedido Zero Furo — ${productName}`,
        externalId,
        expiresInMinutes: 30,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          phone: data.customer.phone,
          document: data.customer.document,
        },
        metadata: {
          slug,
          productId: data.productId,
          addOns,
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
      product_id: productId,
      product_name: productName,
      units: 1 + addOnProducts.length,
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
        product: { id: productId, name: productName, quantity: 1 + addOnProducts.length },
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
