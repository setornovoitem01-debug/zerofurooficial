import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  Copy,
  Lock,
  MapPin,
  ShieldCheck,
  Truck,
  User,
  QrCode,
  Loader2,
} from "lucide-react";
import logo from "@/assets/logo-zerofuro.png.asset.json";
import { clearCart, useCart } from "@/lib/cart";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Finalizar compra — Zero Furo" },
      { name: "description", content: "Checkout seguro Zero Furo em 3 passos, com pagamento via PIX." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CarrinhoPage,
});

type Step = 1 | 2 | 3;

type Identity = { nome: string; email: string; cpf: string; telefone: string };
type Address = {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type ShippingOption = { id: string; label: string; eta: string; price: number };

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "gratis", label: "Frete Grátis — Transportadora", eta: "7 a 10 dias úteis", price: 0 },
  { id: "sedex", label: "Correios Sedex", eta: "3 a 5 dias úteis", price: 25.68 },
  { id: "sedex12", label: "Correios Sedex 12", eta: "12 a 24 horas úteis", price: 68.75 },
];

const brl = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

const onlyDigits = (s: string) => s.replace(/\D+/g, "");
const maskCpf = (s: string) =>
  onlyDigits(s).slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskTel = (s: string) => {
  const d = onlyDigits(s).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};
const maskCep = (s: string) => onlyDigits(s).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}
function validCpf(s: string) {
  return onlyDigits(s).length === 11;
}

function CarrinhoPage() {
  const cart = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [identity, setIdentity] = useState<Identity>({ nome: "", email: "", cpf: "", telefone: "" });
  const [address, setAddress] = useState<Address>({
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingId, setShippingId] = useState<string | null>(null);

  // Buscar CEP via ViaCEP
  useEffect(() => {
    const cep = onlyDigits(address.cep);
    if (cep.length !== 8) {
      setCepError(null);
      return;
    }
    let cancelled = false;
    setCepLoading(true);
    setCepError(null);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.erro) {
          setCepError("CEP não encontrado.");
          return;
        }
        setAddress((prev) => ({
          ...prev,
          rua: data.logradouro || prev.rua,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          uf: data.uf || prev.uf,
        }));
      })
      .catch(() => {
        if (!cancelled) setCepError("Não foi possível buscar o CEP.");
      })
      .finally(() => {
        if (!cancelled) setCepLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [address.cep]);

  // Cotação de frete: dispara quando o CEP tem 8 dígitos, simula loading e
  // apresenta as opções disponíveis. Reseta a seleção sempre que o CEP muda.
  useEffect(() => {
    const cep = onlyDigits(address.cep);
    if (cep.length !== 8) {
      setShippingOptions([]);
      setShippingLoading(false);
      setShippingId(null);
      return;
    }
    let cancelled = false;
    setShippingLoading(true);
    setShippingOptions([]);
    setShippingId(null);
    const t = window.setTimeout(() => {
      if (cancelled) return;
      setShippingOptions(SHIPPING_OPTIONS);
      setShippingId(SHIPPING_OPTIONS[0].id);
      setShippingLoading(false);
    }, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [address.cep]);

  const shipping = useMemo(
    () => shippingOptions.find((o) => o.id === shippingId) ?? null,
    [shippingOptions, shippingId],
  );
  const shippingPrice = shipping?.price ?? 0;
  const total = cart ? cart.price + shippingPrice : 0;

  const pixCode = useMemo(() => {
    if (!cart) return "";
    const ref = Math.random().toString(36).slice(2, 10).toUpperCase();
    return `00020126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865406${total
      .toFixed(2)
      .padStart(8, "0")}5802BR5913ZERO FURO LTDA6009SAO PAULO62070503${ref}6304ABCD`;
  }, [cart, total]);

  if (!cart) {
    return (
      <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans antialiased">
        <Header />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="h-14 w-14 rounded-full bg-[color:var(--color-brand-soft)] grid place-items-center mx-auto">
            <Truck className="h-6 w-6 text-[color:var(--color-brand)]" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Seu carrinho está vazio</h1>
          <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
            Escolha um produto para começar sua compra.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link to="/carro" className="cta-green inline-flex items-center justify-center h-11 px-6 rounded-md font-semibold text-[15px]">
              Ver Selante Zero Furo
            </Link>
            <Link to="/compressor" className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-[color:var(--color-ink)] font-semibold text-[15px] hover:bg-[color:var(--color-surface)] transition">
              Ver Compressor Portátil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (identity.nome.trim().length < 3) e.nome = "Informe seu nome completo.";
    if (!validEmail(identity.email)) e.email = "E-mail inválido.";
    if (!validCpf(identity.cpf)) e.cpf = "CPF inválido.";
    if (onlyDigits(identity.telefone).length < 10) e.telefone = "Telefone inválido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (onlyDigits(address.cep).length !== 8) e.cep = "CEP inválido.";
    if (!address.rua.trim()) e.rua = "Informe a rua.";
    if (!address.numero.trim()) e.numero = "Informe o número.";
    if (!address.bairro.trim()) e.bairro = "Informe o bairro.";
    if (!address.cidade.trim()) e.cidade = "Informe a cidade.";
    if (!address.uf.trim()) e.uf = "UF.";
    if (!shippingId) e.shipping = "Selecione uma opção de frete.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(
    pixCode,
  )}`;

  return (
    <div className="min-h-screen bg-[color:var(--color-surface)] text-[color:var(--color-ink)] font-sans antialiased">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="flex justify-center">
          <Stepper step={step} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="bg-white rounded-xl border border-[color:var(--color-line)] p-5 md:p-8">
            {step === 1 && (
              <StepIdentificacao
                identity={identity}
                setIdentity={setIdentity}
                errors={errors}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepEndereco
                address={address}
                setAddress={setAddress}
                errors={errors}
                cepLoading={cepLoading}
                cepError={cepError}
                shippingLoading={shippingLoading}
                shippingOptions={shippingOptions}
                shippingId={shippingId}
                setShippingId={setShippingId}
                onBack={() => setStep(1)}
                onNext={goNext}
              />
            )}
            {step === 3 && (
              <StepPagamento
                pixCode={pixCode}
                qrUrl={qrUrl}
                total={total}
                copied={copied}
                onCopy={copyPix}
                onBack={() => setStep(2)}
                onFinish={() => {
                  clearCart();
                  navigate({ to: "/" });
                }}
              />
            )}
          </div>

          <ResumoPedido item={cart} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
}

// ---------- header ----------

function Header() {
  return (
    <header className="border-b border-[color:var(--color-line)] bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-4 py-3.5 relative">
        <Link to="/" preload="viewport" aria-label="Ir para a página inicial">
          <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
        </Link>
        <div className="absolute right-4 hidden sm:flex items-center gap-1.5 text-xs text-[color:var(--color-ink-soft)]">
          <Lock className="h-3.5 w-3.5" /> Compra segura
        </div>
      </div>
    </header>
  );
}

// ---------- stepper ----------

function Stepper({ step }: { step: Step }) {
  const steps = [
    { n: 1, label: "Identificação", Icon: User },
    { n: 2, label: "Entrega", Icon: MapPin },
    { n: 3, label: "Pagamento", Icon: QrCode },
  ] as const;
  return (
    <ol className="flex items-center justify-center gap-3 md:gap-4">
      {steps.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <li key={s.n} className="flex items-center gap-3 md:gap-4">
            <div
              className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold transition-colors ${
                done
                  ? "bg-emerald-600 text-white"
                  : active
                  ? "bg-[color:var(--color-ink)] text-white"
                  : "bg-white border border-[color:var(--color-line)] text-[color:var(--color-ink-soft)]"
              }`}
              aria-label={s.label}
              title={s.label}
            >
              {done ? <Check className="h-4 w-4" /> : s.n}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-10 md:w-16 ${step > s.n ? "bg-emerald-600" : "bg-[color:var(--color-line)]"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ---------- step 1 ----------

function StepIdentificacao({
  identity,
  setIdentity,
  errors,
  onNext,
}: {
  identity: Identity;
  setIdentity: (v: Identity) => void;
  errors: Record<string, string>;
  onNext: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Identificação</h2>
      <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
        Vamos precisar de alguns dados para emitir seu pedido.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" error={errors.nome} className="sm:col-span-2">
          <input
            className="input"
            value={identity.nome}
            onChange={(e) => setIdentity({ ...identity, nome: e.target.value })}
            placeholder="Como está no seu documento"
            autoComplete="name"
          />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input
            type="email"
            className="input"
            value={identity.email}
            onChange={(e) => setIdentity({ ...identity, email: e.target.value })}
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Telefone / WhatsApp" error={errors.telefone}>
          <input
            className="input"
            value={identity.telefone}
            onChange={(e) => setIdentity({ ...identity, telefone: maskTel(e.target.value) })}
            placeholder="(11) 99999-9999"
            autoComplete="tel"
          />
        </Field>
        <Field label="CPF" error={errors.cpf}>
          <input
            className="input"
            value={identity.cpf}
            onChange={(e) => setIdentity({ ...identity, cpf: maskCpf(e.target.value) })}
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        </Field>
      </div>

      <Actions rightLabel="Continuar" onRight={onNext} />
      <TrustFooter />
      <style>{`.input{width:100%;height:44px;padding:0 14px;border:1px solid var(--color-line);border-radius:8px;background:#fff;font-size:14px;transition:border-color .15s,box-shadow .15s;} .input:focus{outline:none;border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,107,26,.15);}`}</style>
    </form>
  );
}

// ---------- step 2 ----------

function StepEndereco({
  address,
  setAddress,
  errors,
  cepLoading,
  cepError,
  shippingLoading,
  shippingOptions,
  shippingId,
  setShippingId,
  onBack,
  onNext,
}: {
  address: Address;
  setAddress: (v: Address) => void;
  errors: Record<string, string>;
  cepLoading: boolean;
  cepError: string | null;
  shippingLoading: boolean;
  shippingOptions: ShippingOption[];
  shippingId: string | null;
  setShippingId: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Endereço de entrega</h2>
      <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
        Digite o CEP e preencheremos o endereço automaticamente.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-6">
        <Field label="CEP" error={errors.cep || cepError || undefined} className="sm:col-span-2">
          <div className="relative">
            <input
              className="input pr-10"
              value={address.cep}
              onChange={(e) => setAddress({ ...address, cep: maskCep(e.target.value) })}
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
            />
            {cepLoading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[color:var(--color-ink-soft)]" />
            )}
          </div>
        </Field>
        <Field label="Rua" error={errors.rua} className="sm:col-span-4">
          <input
            className="input"
            value={address.rua}
            onChange={(e) => setAddress({ ...address, rua: e.target.value })}
            autoComplete="address-line1"
          />
        </Field>
        <Field label="Número" error={errors.numero} className="sm:col-span-2">
          <input
            className="input"
            value={address.numero}
            onChange={(e) => setAddress({ ...address, numero: e.target.value })}
          />
        </Field>
        <Field label="Complemento (opcional)" className="sm:col-span-4">
          <input
            className="input"
            value={address.complemento}
            onChange={(e) => setAddress({ ...address, complemento: e.target.value })}
            placeholder="Apto, bloco, referência…"
          />
        </Field>
        <Field label="Bairro" error={errors.bairro} className="sm:col-span-3">
          <input
            className="input"
            value={address.bairro}
            onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
          />
        </Field>
        <Field label="Cidade" error={errors.cidade} className="sm:col-span-2">
          <input
            className="input"
            value={address.cidade}
            onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
          />
        </Field>
        <Field label="UF" error={errors.uf} className="sm:col-span-1">
          <input
            className="input uppercase"
            maxLength={2}
            value={address.uf}
            onChange={(e) => setAddress({ ...address, uf: e.target.value.toUpperCase() })}
          />
        </Field>
      </div>

      {/* Cotação de frete */}
      {onlyDigits(address.cep).length === 8 && !cepError && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-ink-soft)] mb-3">
            Escolha o frete
          </h3>
          {shippingLoading ? (
            <div className="flex items-center gap-3 rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-5 text-sm text-[color:var(--color-ink-soft)]">
              <Loader2 className="h-4 w-4 animate-spin text-[color:var(--color-brand)]" />
              Calculando opções de entrega para o seu CEP…
            </div>
          ) : (
            <div className="space-y-2">
              {shippingOptions.map((opt) => {
                const selected = shippingId === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition ${
                      selected
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/15"
                        : "border-[color:var(--color-line)] hover:border-[color:var(--color-ink-soft)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={selected}
                      onChange={() => setShippingId(opt.id)}
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[color:var(--color-ink)] flex items-center gap-2">
                        <Truck className="h-4 w-4 text-[color:var(--color-ink-soft)]" />
                        {opt.label}
                      </div>
                      <div className="text-xs text-[color:var(--color-ink-soft)] mt-0.5">
                        {opt.eta}
                      </div>
                    </div>
                    <div className="text-sm font-semibold whitespace-nowrap">
                      {opt.price === 0 ? (
                        <span className="text-emerald-700">Grátis</span>
                      ) : (
                        <span>R$ {opt.price.toFixed(2).replace(".", ",")}</span>
                      )}
                    </div>
                  </label>
                );
              })}
              {errors.shipping && (
                <div className="text-xs text-red-600">{errors.shipping}</div>
              )}
            </div>
          )}
        </div>
      )}

      <Actions leftLabel="Voltar" onLeft={onBack} rightLabel="Ir para o pagamento" onRight={onNext} />
      <TrustFooter />
      <style>{`.input{width:100%;height:44px;padding:0 14px;border:1px solid var(--color-line);border-radius:8px;background:#fff;font-size:14px;transition:border-color .15s,box-shadow .15s;} .input:focus{outline:none;border-color:var(--color-brand);box-shadow:0 0 0 3px rgba(255,107,26,.15);}`}</style>
    </form>
  );
}

// ---------- step 3 ----------

function StepPagamento({
  pixCode,
  qrUrl,
  total,
  copied,
  onCopy,
  onBack,
  onFinish,
}: {
  pixCode: string;
  qrUrl: string;
  total: number;
  copied: boolean;
  onCopy: () => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [generated, setGenerated] = useState(false);
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
        <QrCode className="h-3.5 w-3.5" /> Pagamento via PIX
      </div>
      <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight">Pagamento via PIX</h2>
      <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
        {generated
          ? "Aponte a câmera para o QR Code ou copie o código PIX no seu banco."
          : "Gere o seu QR Code para concluir o pagamento com aprovação imediata."}
      </p>

      <div className="mt-6 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 md:p-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand)]">
          Total a pagar
        </div>
        <div className="mt-1 text-3xl font-semibold text-emerald-700">{brl(total)}</div>

        {!generated ? (
          <div className="mt-6 flex flex-col items-center text-center gap-3">
            <div className="h-40 w-40 rounded-lg border border-dashed border-[color:var(--color-line)] bg-white grid place-items-center text-[color:var(--color-ink-soft)]">
              <QrCode className="h-10 w-10 opacity-50" />
            </div>
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="cta-green inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md font-semibold text-[15px]"
            >
              <QrCode className="h-4 w-4" /> Gerar QR Code PIX
            </button>
            <p className="text-xs text-[color:var(--color-ink-soft)]">
              Após gerar, você pode escanear ou copiar o código copia-e-cola.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr] items-center">
              <div className="bg-white p-3 rounded-lg border border-[color:var(--color-line)] mx-auto">
                <img src={qrUrl} alt="QR Code PIX" width={200} height={200} className="block" />
              </div>
              <ol className="space-y-1.5 text-sm text-[color:var(--color-ink-soft)]">
                <li>1. Abra o app do seu banco e escolha pagar com PIX.</li>
                <li>2. Escaneie o QR Code ou cole o código copia-e-cola.</li>
                <li>3. Confirme o pagamento — a confirmação é imediata.</li>
              </ol>
            </div>

            <div className="mt-6">
              <label className="text-xs font-semibold text-[color:var(--color-ink-soft)] uppercase tracking-wider">
                Código PIX copia-e-cola
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  readOnly
                  value={pixCode}
                  className="flex-1 h-11 px-3 rounded-md border border-[color:var(--color-line)] bg-white text-xs font-mono truncate"
                />
                <button
                  type="button"
                  onClick={onCopy}
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-md bg-[color:var(--color-ink)] text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {generated && (
        <div className="mt-6">
          <button
            type="button"
            onClick={onFinish}
            className="cta-green w-full h-12 rounded-md font-semibold text-[15px]"
          >
            Já paguei — finalizar pedido
          </button>
        </div>
      )}

      <div className="mt-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>
      </div>

      <TrustFooter />
    </div>
  );
}

// ---------- shared ----------

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs font-semibold text-[color:var(--color-ink-soft)] uppercase tracking-wider mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Actions({
  leftLabel,
  rightLabel,
  onLeft,
  onRight,
}: {
  leftLabel?: string;
  rightLabel: string;
  onLeft?: () => void;
  onRight: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      {leftLabel ? (
        <button
          type="button"
          onClick={onLeft}
          className="inline-flex items-center gap-1.5 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition"
        >
          <ChevronLeft className="h-4 w-4" /> {leftLabel}
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onRight}
        className="cta-green inline-flex items-center justify-center h-11 px-8 rounded-md font-semibold text-[15px]"
      >
        {rightLabel}
      </button>
    </div>
  );
}

function TrustFooter() {
  return (
    <div className="mt-8 pt-5 border-t border-[color:var(--color-line)] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[color:var(--color-ink-soft)]">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-600" /> Ambiente seguro
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4 text-emerald-600" /> Dados criptografados
      </div>
      <div className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-emerald-600" /> Frete grátis Brasil
      </div>
    </div>
  );
}

function ResumoPedido({
  item,
  shipping,
  total,
}: {
  item: { name: string; image: string; price: number; oldPrice?: number };
  shipping: ShippingOption | null;
  total: number;
}) {
  return (
    <aside className="bg-white rounded-xl border border-[color:var(--color-line)] p-5 h-fit lg:sticky lg:top-24">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-ink-soft)]">
        Resumo do pedido
      </h3>
      <div className="mt-4 flex gap-3">
        <div className="h-20 w-20 shrink-0 rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-2 grid place-items-center overflow-hidden">
          <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium leading-snug line-clamp-3">{item.name}</div>
          <div className="mt-1 text-xs text-[color:var(--color-ink-soft)]">Quantidade: 1</div>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-[color:var(--color-ink-soft)]">Subtotal</dt>
          <dd>{brl(item.price)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[color:var(--color-ink-soft)]">
            Frete
            {shipping && (
              <span className="block text-[11px] text-[color:var(--color-ink-soft)]/80">
                {shipping.label} · {shipping.eta}
              </span>
            )}
          </dt>
          <dd className={shipping && shipping.price === 0 ? "text-emerald-700 font-medium" : ""}>
            {!shipping
              ? "—"
              : shipping.price === 0
              ? "Grátis"
              : brl(shipping.price)}
          </dd>
        </div>
        {item.oldPrice && item.oldPrice > item.price && (
          <div className="flex justify-between text-xs text-[color:var(--color-ink-soft)]">
            <dt>Você economiza</dt>
            <dd className="text-emerald-700 font-semibold">
              {brl(item.oldPrice - item.price)}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 pt-4 border-t border-[color:var(--color-line)] flex justify-between items-baseline">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-2xl font-semibold text-emerald-700">{brl(total)}</span>
      </div>

      <div className="mt-3 text-[11px] text-[color:var(--color-ink-soft)] flex items-center gap-1.5">
        <QrCode className="h-3.5 w-3.5" /> Pagamento exclusivo via PIX
      </div>
    </aside>
  );
}
