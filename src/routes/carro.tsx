import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
  Check,
  ChevronRight,
  ChevronLeft,
  Timer,
  BadgeCheck,
  Car,
  Droplets,
  Gauge,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";

import logo from "@/assets/logo-zerofuro.png.asset.json";
import p1 from "@/assets/produto-1.png.asset.json";
import p2 from "@/assets/produto-2.png.asset.json";
import p3 from "@/assets/produto-3.png.asset.json";
import p4 from "@/assets/produto-4.png.asset.json";
import p5 from "@/assets/produto-5.png.asset.json";
import p6 from "@/assets/produto-6.png.asset.json";
import p7 from "@/assets/produto-7.png.asset.json";
import p8 from "@/assets/produto-8.png.asset.json";

export const Route = createFileRoute("/carro")({
  head: () => ({
    meta: [
      { title: "Selante Zero Furo para Carro — Escolha o aro" },
      {
        name: "description",
        content:
          "Kit Selante Zero Furo para carros. Escolha o aro do seu carro (13 a 23) e receba o kit ideal para nunca mais ficar na mão.",
      },
    ],
  }),
  component: CarroPage,
});

type AroKey = "13-15" | "16-18" | "19-23";

type Kit = {
  key: AroKey;
  titulo: string;
  chamada: string;
  subtitulo: string;
  price: number;
  oldPrice: number;
  images: { url: string }[];
  descricao: string[];
  destaques: string[];
};

// Placeholder data — imagens principais e descrições reais serão enviadas depois.
const kits: Record<AroKey, Kit> = {
  "13-15": {
    key: "13-15",
    titulo: "Kit Selante Zero Furo — Aros 13, 14 e 15",
    chamada: "Ideal para carros compactos",
    subtitulo:
      "Proteção completa contra furos para veículos com aros 13, 14 e 15.",
    price: 89.9,
    oldPrice: 179.9,
    images: [p1, p2, p3, p4],
    descricao: [
      "Kit desenvolvido para carros compactos com aros de 13 a 15 polegadas.",
      "Sela furos de até 6 mm em poucos segundos, sem precisar tirar a roda.",
    ],
    destaques: [
      "Indicado para aros 13, 14 e 15",
      "Sela furos de até 6 mm",
      "Aplicação em menos de 5 minutos",
      "Não danifica o pneu nem a roda",
    ],
  },
  "16-18": {
    key: "16-18",
    titulo: "Kit Selante Zero Furo — Aros 16, 17 e 18",
    chamada: "Ideal para sedãs e SUVs médios",
    subtitulo:
      "Fórmula reforçada para veículos com aros 16, 17 e 18.",
    price: 109.9,
    oldPrice: 219.9,
    images: [p3, p4, p5, p6],
    descricao: [
      "Kit ideal para sedãs e SUVs médios com aros de 16 a 18 polegadas.",
      "Volume otimizado para pneus de maior perfil, com selagem imediata.",
    ],
    destaques: [
      "Indicado para aros 16, 17 e 18",
      "Sela furos de até 8 mm",
      "Fórmula reforçada de longa duração",
      "Compatível com pneus radiais e sem câmara",
    ],
  },
  "19-23": {
    key: "19-23",
    titulo: "Kit Selante Zero Furo — Aros 19, 20, 21, 22 e 23",
    chamada: "Ideal para SUVs, picapes e utilitários",
    subtitulo:
      "Máxima proteção para veículos com aros 19 a 23.",
    price: 139.9,
    oldPrice: 279.9,
    images: [p5, p6, p7, p8],
    descricao: [
      "Kit premium para SUVs, picapes e utilitários com aros de 19 a 23 polegadas.",
      "Maior quantidade de selante para pneus de alto perfil e uso intenso.",
    ],
    destaques: [
      "Indicado para aros 19, 20, 21, 22 e 23",
      "Sela furos de até 10 mm",
      "Alta performance em estradas e off-road",
      "Proteção duradoura contra novos furos",
    ],
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function CarroPage() {
  const [aro, setAro] = useState<AroKey | null>(null);
  const [active, setActive] = useState(0);
  const kit = aro ? kits[aro] : null;

  const selectAro = (k: AroKey) => {
    setAro(k);
    setActive(0);
    // Scroll to product area after a tick.
    setTimeout(() => {
      document.getElementById("produto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3.5">
          <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
        </div>
      </header>

      {/* Hero + seletor de aro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-surface)] to-white">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--color-brand)] tracking-widest uppercase bg-white border border-[color:var(--color-line)] px-3 py-1.5 rounded-full">
              <Car className="h-3.5 w-3.5" /> Selante Zero Furo • Carro
            </span>
            <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Selecione o <span className="text-[color:var(--color-brand)]">Aro</span> do seu carro
            </h1>
            <p className="mt-4 text-[color:var(--color-ink-soft)] max-w-xl mx-auto">
              Escolha o kit ideal de Selante Zero Furo para o tamanho de aro do seu veículo e nunca mais fique na mão com pneu furado.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {(Object.values(kits)).map((k, i) => {
              const selected = aro === k.key;
              return (
                <Reveal key={k.key} delay={i * 100}>
                  <button
                    type="button"
                    onClick={() => selectAro(k.key)}
                    aria-pressed={selected}
                    className={`w-full h-full text-left rounded-2xl border p-5 md:p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      selected
                        ? "border-[color:var(--color-brand)] shadow-lg ring-2 ring-[color:var(--color-brand)]/30"
                        : "border-[color:var(--color-line)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-lg bg-[color:var(--color-ink)] text-white grid place-items-center">
                        <Gauge className="h-5 w-5" />
                      </div>
                      {selected && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <div className="mt-5 text-xs font-semibold tracking-widest uppercase text-[color:var(--color-brand)]">
                      Aro {k.key}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold leading-tight">
                      {k.chamada}
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                      {k.subtitulo}
                    </p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {!kit && (
            <p className="mt-8 text-sm text-[color:var(--color-ink-soft)]">
              Selecione uma das opções acima para ver o produto, descrição completa e opção de compra.
            </p>
          )}
        </div>
      </section>

      {/* Product area — só aparece quando um aro é selecionado */}
      {kit && (
        <>
          <section
            id="produto"
            className="max-w-7xl mx-auto px-4 pt-8 md:pt-12 pb-10 md:pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 scroll-mt-24"
          >
            {/* Gallery */}
            <div className="min-w-0 w-full">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="aspect-square rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] overflow-hidden flex items-center justify-center p-6 md:p-10">
                  <img
                    key={`${kit.key}-${active}`}
                    src={kit.images[active].url}
                    alt={kit.titulo}
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActive((active - 1 + kit.images.length) % kit.images.length)}
                  aria-label="Imagem anterior"
                  className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % kit.images.length)}
                  aria-label="Próxima imagem"
                  className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                {kit.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      active === i
                        ? "w-6 bg-[color:var(--color-ink)]"
                        : "w-2 bg-[color:var(--color-line)] hover:bg-[color:var(--color-ink-soft)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Buy panel */}
            <div id="comprar" className="lg:sticky lg:top-24 self-start scroll-mt-24">
              <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-brand)]">
                Aro {kit.key}
              </div>
              <h2 className="mt-2 text-2xl md:text-[28px] font-semibold leading-tight tracking-tight">
                {kit.titulo}
              </h2>

              <div className="mt-6">
                <div className="text-sm text-[color:var(--color-ink-soft)] line-through">
                  R$ {kit.oldPrice.toFixed(2).replace(".", ",")}
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-4xl md:text-5xl font-light tracking-tight text-emerald-600">
                    R$ <span className="font-medium">{kit.price.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                    50% OFF
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-emerald-700 font-medium">
                <Truck className="h-4 w-4" /> Frete grátis para todo o Brasil
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)]">
                <Timer className="h-4 w-4" /> Entrega em 5 a 12 dias úteis
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="cta-green w-full h-12 rounded-md font-semibold text-[15px]"
                >
                  Comprar agora
                </button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                  <Lock className="h-4 w-4 text-[color:var(--color-ink)]" /> Compra 100% segura
                </div>
                <div className="flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                  <RefreshCcw className="h-4 w-4 text-[color:var(--color-ink)]" /> 7 dias para troca
                </div>
                <div className="flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                  <BadgeCheck className="h-4 w-4 text-[color:var(--color-ink)]" /> Produto original
                </div>
              </div>

              <ul className="mt-6 border-t border-[color:var(--color-line)] pt-5 space-y-2 text-sm">
                {kit.destaques.map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Droplets className="h-4 w-4 text-[color:var(--color-brand)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Trust strip */}
          <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Truck, t: "Frete grátis", s: "Para todo o Brasil" },
                { icon: BadgeCheck, t: "Produto original", s: "Garantia de qualidade" },
                { icon: ShieldCheck, t: "Compra segura", s: "Site 100% protegido" },
                { icon: RefreshCcw, t: "7 dias de garantia", s: "Direito de arrependimento" },
              ].map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <div className="flex items-center gap-3">
                    <b.icon className="h-6 w-6 text-[color:var(--color-ink)] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{b.t}</div>
                      <div className="text-xs text-[color:var(--color-ink-soft)] truncate">{b.s}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Galeria em grade */}
          <section className="max-w-7xl mx-auto px-4 py-14 md:py-20">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase">
                  Veja de perto
                </div>
                <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight">
                  Cada detalhe pensado para você
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {kit.images.map((img, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="group aspect-square rounded-xl overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-line)] p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <img src={img.url} alt={`${kit.titulo} - imagem ${i + 1}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                Comprar agora com 50% OFF
              </a>
            </div>
          </section>

          {/* Description */}
          <section id="descricao" className="max-w-4xl mx-auto px-4 py-14 md:py-20 scroll-mt-24">
            <Reveal>
              <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase text-center">
                Descrição do produto
              </div>
              <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-center leading-tight">
                Pneu furado?{" "}
                <span className="text-[color:var(--color-brand)]">Resolva na hora.</span>
              </h2>
              <div className="mt-6 space-y-4 text-[color:var(--color-ink-soft)] text-[15px] md:text-base leading-relaxed max-w-2xl mx-auto text-center">
                {kit.descricao.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="text-xs italic text-[color:var(--color-ink-soft)]/80">
                  * Descrição e imagens completas serão atualizadas em breve.
                </p>
              </div>
            </Reveal>
          </section>

          {/* CTA antes das especificações */}
          <section className="max-w-6xl mx-auto px-4 pb-14 md:pb-20">
            <Reveal>
              <div className="rounded-2xl bg-[color:var(--color-ink)] text-white px-6 py-10 md:px-12 md:py-14 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Leve o seu com <span className="text-emerald-400">50% de desconto</span>
                </h3>
                <p className="mt-3 text-white/70 max-w-xl mx-auto">
                  Estoque limitado. Aproveite o preço promocional enquanto durar.
                </p>
                <div className="mt-6">
                  <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                    Comprar agora por R$ {kit.price.toFixed(2).replace(".", ",")}
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Specs */}
          <section className="border-t border-[color:var(--color-line)] py-14 md:py-20 bg-[color:var(--color-surface)]">
            <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
              <Reveal>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Especificações</h3>
                  <dl className="mt-5 divide-y divide-[color:var(--color-line)] bg-white rounded-xl border border-[color:var(--color-line)]">
                    {[
                      ["Indicação de aro", `Aros ${kit.key}`],
                      ["Aplicação", "Preventiva e corretiva"],
                      ["Compatibilidade", "Pneus sem câmara"],
                      ["Validade", "24 meses"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between px-4 py-3 text-sm">
                        <dt className="text-[color:var(--color-ink-soft)]">{k}</dt>
                        <dd className="font-medium text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">O kit inclui</h3>
                  <ul className="mt-5 bg-white rounded-xl border border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
                    {[
                      "Selante Zero Furo (quantidade ideal para o aro selecionado)",
                      "Bico aplicador",
                      "Manual de instrução",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <Check className="h-4 w-4 text-[color:var(--color-brand)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto px-4 py-14 md:py-20">
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
                Perguntas frequentes
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Accordion type="single" collapsible className="mt-8">
                {[
                  { q: "Como sei qual aro é o do meu carro?", a: "A medida do aro está gravada na lateral do pneu, logo após a barra (ex.: 195/65 R15 — o aro é 15)." },
                  { q: "O selante funciona em qualquer furo?", a: "Sim, para furos de até 6 a 10 mm dependendo do kit, na banda de rodagem do pneu." },
                  { q: "Danifica a roda ou o pneu?", a: "Não. A fórmula é segura para rodas e pneus sem câmara." },
                  { q: "Qual é o prazo de entrega?", a: "De 5 a 12 dias úteis para todo o Brasil, com frete grátis." },
                  { q: "Tem garantia?", a: "Sim, 7 dias para arrependimento e garantia contra defeitos de fabricação." },
                ].map((f, i) => (
                  <AccordionItem key={i} value={`i${i}`} className="border-[color:var(--color-line)]">
                    <AccordionTrigger className="text-left font-medium text-[15px] hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[color:var(--color-ink-soft)] text-[14px] leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-[color:var(--color-line)] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-10">
            <img src={logo.url} alt="Zero Furo" className="h-9" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: "Atendimento", items: ["Central de Atendimento", "Minha Conta", "Troca Fácil"] },
              { title: "Informações úteis", items: ["Formas de Pagamento", "Prazos de Entrega", "Trocas e Devoluções", "Política de Privacidade", "FAQ"] },
              { title: "Institucional", items: ["Quem Somos"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold border-b border-[color:var(--color-line)] pb-3 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm text-[color:var(--color-ink-soft)]">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="hover:text-[color:var(--color-brand)] transition-colors">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[color:var(--color-line)]">
            <div className="grid gap-6 md:grid-cols-2 text-xs text-[color:var(--color-ink-soft)] leading-relaxed">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-ink)] mb-2">
                  Razão social
                </div>
                <p>A loja Zero Furo é operada pela</p>
                <p className="text-[color:var(--color-ink)] font-medium">Social S.A.</p>
                <p className="mt-1">CNPJ: 28.511.223/0004-85</p>
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-ink)] mb-2">
                  Endereço
                </div>
                <p>Av. Caio Cotrim, 46 — Galpão 01, 02 e 03</p>
                <p>Setor CLI 2 — Itapevi/SP</p>
                <p>CEP: 06696-060</p>
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-[color:var(--color-line)] text-center text-[11px] text-[color:var(--color-ink-soft)]">
              © 2026 Zero Furo. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Wrench import kept to avoid unused warning in case of future use */}
      <span className="hidden"><Wrench className="h-0 w-0" /></span>
    </div>
  );
}
