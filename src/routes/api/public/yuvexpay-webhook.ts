import { createFileRoute } from "@tanstack/react-router";

// Recebe payloads encaminhados pelo YuvexPay Webhooks Hub.
// O Hub envia: POST <esta-url>/api/public/yuvexpay-webhook?token=<HUB_FORWARD_TOKEN>
// com o body original do YuvexPay (JSON).
//
// Sempre responde 200 para o hub/YuvexPay não reenviar — erros vão pros logs.
export const Route = createFileRoute("/api/public/yuvexpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Aceita o token do hub APENAS via header — nunca via query string,
          // que ficaria gravada em logs de servidor, CDN e Referer.
          const token =
            request.headers.get("x-hub-token") ||
            request.headers.get("x-forward-token") ||
            "";
          const expected = process.env.HUB_FORWARD_TOKEN || "";
          if (!expected || !token || !timingSafeEqualStr(token, expected)) {
            console.error("[yuvexpay-webhook] token do hub inválido ou ausente");
            return ok();
          }

          const raw = await request.text();
          let payload: any = null;
          try {
            payload = raw ? JSON.parse(raw) : null;
          } catch {
            console.error("[yuvexpay-webhook] JSON inválido");
            return ok();
          }

          const event: string | undefined =
            payload?.event ?? payload?.type ?? payload?.eventType;

          const p = payload?.payment ?? payload?.data?.payment ?? payload?.data ?? payload ?? {};
          const paymentId: string | undefined = p.id ?? p.paymentId;
          const externalId: string | undefined =
            p.externalId ?? p.external_id ?? payload?.externalId ?? payload?.external_id;
          const status: string | undefined = p.status;
          const paidAt: string | undefined = p.paidAt ?? p.paid_at ?? payload?.paidAt;

          if (!externalId && !paymentId) {
            console.error("[yuvexpay-webhook] sem externalId nem paymentId");
            return ok();
          }

          // Só processa eventos deste projeto (prefixo do slug).
          if (externalId && !externalId.toLowerCase().startsWith("zerofuro")) {
            return ok();
          }

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

          const update: { status?: string; paid_at?: string } = {};
          const isPaid =
            event === "PAYMENT_PAID" ||
            event === "PAYMENT_CONFIRMED" ||
            status === "PAID" ||
            status === "CONFIRMED";
          const isExpired = event === "PAYMENT_EXPIRED" || status === "EXPIRED";
          const isRefunded = event === "PAYMENT_REFUNDED" || status === "REFUNDED";
          const isCancelled = event === "PAYMENT_CANCELLED" || status === "CANCELLED";


          if (isPaid) {
            update.status = "paid";
            update.paid_at = paidAt ?? new Date().toISOString();
          } else if (isExpired) update.status = "expired";
          else if (isRefunded) update.status = "refunded";
          else if (isCancelled) update.status = "cancelled";

          if (Object.keys(update).length === 0) return ok();

          // Idempotência: não sobrescreve pedidos já pagos e evita Utmify duplicado.
          let q = supabaseAdmin.from("orders").update(update);
          if (externalId) q = q.eq("external_id", externalId);
          else if (paymentId) q = q.eq("yuvex_payment_id", paymentId);
          if (isPaid) q = q.is("paid_at", null);
          else q = q.neq("status", "paid");

          const { data: updatedRows, error } = await q.select("id");
          if (error) console.error("[yuvexpay-webhook] update error:", error);
          else
            console.log(
              `[yuvexpay-webhook] ${event ?? status} applied=${updatedRows?.length ?? 0} externalId=${externalId ?? "-"} paymentId=${paymentId ?? "-"}`,
            );

          if (isPaid && updatedRows && updatedRows.length > 0) {
            try {
              let sel = supabaseAdmin.from("orders").select("*");
              sel = externalId
                ? sel.eq("external_id", externalId)
                : sel.eq("yuvex_payment_id", paymentId!);
              const { data: row } = await sel.maybeSingle();
              if (row) {
                const { sendUtmifyOrder } = await import("@/lib/utmify.server");
                const cust = (row.customer ?? {}) as {
                  name?: string;
                  email?: string;
                  document?: string;
                  phone?: string;
                  ip?: string | null;
                };
                await sendUtmifyOrder({
                  orderId: row.external_id as string,
                  status: "paid",
                  createdAt: new Date(row.created_at as string),
                  approvedAt: new Date(update.paid_at ?? new Date().toISOString()),
                  amountCents: Math.round(Number(row.amount) * 100),
                  customer: {
                    name: cust.name ?? "",
                    email: cust.email ?? "",
                    document: cust.document ?? null,
                    phone: cust.phone ?? null,
                    ip: cust.ip ?? null,
                  },
                  product: {
                    id: (row.product_id as string) ?? "zerofuro",
                    name: (row.product_name as string) ?? "Zero Furo",
                    quantity: (row.units as number) ?? 1,
                  },
                  tracking: (row.utm ?? {}) as Record<string, string | null>,
                });
              }
            } catch (utmErr) {
              console.error("[yuvexpay-webhook] utmify paid failed", utmErr);
            }
          }

          return ok();
        } catch (err) {
          console.error("[yuvexpay-webhook] unexpected:", err);
          return ok();
        }
      },
    },
  },
});

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function ok() {
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
