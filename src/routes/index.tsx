import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
  Check,
  Star,
  ChevronRight,
  Zap,
  Battery,
  Flashlight,
  Gauge,
  Volume2,
  Timer,
  CreditCard,
  BadgeCheck,
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

export const Route = createFileRoute("/")({
  component: Landing,
});

const images = [p1, p2, p3, p4, p5, p6, p7, p8];

const quickFeatures = [
  { icon: Zap, label: "Compressor potente" },
  { icon: Battery, label: "Power Bank" },
  { icon: Flashlight, label: "Lanterna LED" },
  { icon: ShieldCheck, label: "Desliga automático" },
];

const features = [
  { icon: Gauge, title: "Display digital preciso", text: "Leitura em tempo real em PSI, BAR, KPA e KG/CM²." },
  { icon: Zap, title: "Enche até 2,5x mais rápido", text: "Motor potente que suporta até 150 PSI de pressão." },
  { icon: Battery, title: "Bateria de longa duração", text: "Mais de 8 horas de autonomia com recarga USB." },
  { icon: Flashlight, title: "LED integrado", text: "Iluminação forte para emergências e uso noturno." },
  { icon: Volume2, title: "Operação silenciosa", text: "Motor otimizado que trabalha sem incomodar." },
  { icon: Timer, title: "Desligamento automático", text: "Para na pressão programada, sem risco de estourar." },
];

// ---------- helpers ----------

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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- page ----------

function Landing() {
  const [active, setActive] = useState(0);
  const price = 249.9;
  const oldPrice = 499.9;
  const installment = price / 12;

  return (
    <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3.5">
          <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
        </div>
      </header>

      {/* Hero de apresentação */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-surface)] to-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--color-brand)] tracking-widest uppercase bg-white border border-[color:var(--color-line)] px-3 py-1.5 rounded-full">
                <Zap className="h-3.5 w-3.5" /> Lançamento • 3 em 1
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                Nunca mais fique <span className="text-[color:var(--color-brand)]">na mão</span> com pneu vazio.
              </h1>
              <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-xl">
                Compressor de Ar Portátil Zero Furo: enche em minutos, carrega seu celular e ilumina o caminho. Tudo num único aparelho que cabe no porta-luvas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#comprar" className="inline-flex items-center justify-center h-13 px-8 py-4 rounded-md bg-[color:var(--color-brand)] hover:brightness-95 text-white font-semibold text-[15px] transition shadow-lg shadow-[color:var(--color-brand)]/20">
                  Quero o meu agora
                </a>
                <a href="#descricao" className="inline-flex items-center justify-center h-13 px-8 py-4 rounded-md border border-[color:var(--color-ink)] hover:bg-[color:var(--color-surface)] font-semibold text-[15px] transition">
                  Ver detalhes
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-[color:var(--color-ink-soft)]">
                <div className="flex text-[color:var(--color-brand)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span>4.9 • +12.437 clientes satisfeitos</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute inset-0 bg-[color:var(--color-brand)]/10 blur-3xl rounded-full" />
              <div className="relative aspect-square rounded-2xl bg-white border border-[color:var(--color-line)] p-8 md:p-12 shadow-xl">
                <img src={p1.url} alt="Compressor de Ar Portátil 3 em 1 Zero Furo" className="w-full h-full object-contain" />
                <span className="absolute top-4 left-4 bg-[color:var(--color-brand)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -50% HOJE
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-[color:var(--color-ink-soft)] flex items-center gap-1.5 overflow-x-auto">
        <span>Início</span>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span>Automotivo</span>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span className="text-[color:var(--color-ink)] font-medium truncate">
          Compressor de Ar Portátil 3 em 1
        </span>
      </div>

      {/* Product area */}
      <section className="max-w-7xl mx-auto px-4 pb-10 md:pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 min-w-0 w-full">
          {/* Thumbs */}
          <div className="flex md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible md:max-h-[520px] md:pr-1 justify-center md:justify-start scrollbar-thin px-1 -mx-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-lg border-2 overflow-hidden bg-[color:var(--color-surface)] transition-all ${
                  active === i
                    ? "border-[color:var(--color-ink)]"
                    : "border-[color:var(--color-line)] hover:border-[color:var(--color-ink-soft)]"
                }`}
                aria-label={`Ver imagem ${i + 1}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-contain p-1" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative w-full md:flex-1 min-w-0">
            <div className="aspect-square rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] overflow-hidden flex items-center justify-center p-6 md:p-10">
              <img
                key={active}
                src={images[active].url}
                alt="Compressor de Ar Portátil 3 em 1 Zero Furo"
                className="w-full h-full object-contain animate-in fade-in duration-300"
              />
            </div>
            <span className="absolute top-3 left-3 bg-[color:var(--color-brand)] text-white text-[11px] font-bold px-2.5 py-1 rounded">
              -50%
            </span>
          </div>
        </div>

        {/* Buy panel */}
        <div id="comprar" className="lg:sticky lg:top-24 self-start scroll-mt-24">
          <div className="text-[11px] font-semibold text-[color:var(--color-brand)] tracking-widest uppercase">
            Novo • Mais vendido
          </div>
          <h1 className="mt-2 text-2xl md:text-[28px] font-semibold leading-tight tracking-tight">
            Compressor de Ar Portátil 3 em 1 com Carregador Power Bank e Lanterna LED
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex text-[color:var(--color-brand)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-[color:var(--color-ink-soft)]">(12.437 avaliações)</span>
            <span className="text-emerald-600 font-medium ml-1 hidden sm:inline">| +2 mil vendidos</span>
          </div>

          <div className="mt-6">
            <div className="text-sm text-[color:var(--color-ink-soft)] line-through">
              R$ {oldPrice.toFixed(2).replace(".", ",")}
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl md:text-5xl font-light tracking-tight">
                R$ <span className="font-medium">{price.toFixed(2).replace(".", ",")}</span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                50% OFF
              </span>
            </div>
            <div className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
              em 12x de <span className="text-[color:var(--color-ink)] font-medium">R$ {installment.toFixed(2).replace(".", ",")}</span> sem juros
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-emerald-700 font-medium">
            <Truck className="h-4 w-4" /> Frete grátis para todo o Brasil
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)]">
            <Timer className="h-4 w-4" /> Entrega em 5 a 12 dias úteis
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              className="w-full h-12 rounded-md bg-[color:var(--color-brand)] hover:brightness-95 text-white font-semibold text-[15px] transition"
            >
              Comprar agora
            </button>
            <button
              type="button"
              className="w-full h-12 rounded-md border border-[color:var(--color-ink)] hover:bg-[color:var(--color-surface)] text-[color:var(--color-ink)] font-semibold text-[15px] transition"
            >
              Adicionar ao carrinho
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
            <div className="flex items-center gap-2 text-[color:var(--color-ink-soft)]">
              <CreditCard className="h-4 w-4 text-[color:var(--color-ink)]" /> Até 12x sem juros
            </div>
          </div>

          <ul className="mt-6 border-t border-[color:var(--color-line)] pt-5 space-y-2 text-sm">
            {quickFeatures.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <f.icon className="h-4 w-4 text-[color:var(--color-brand)]" />
                <span>{f.label}</span>
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
            { icon: CreditCard, t: "12x sem juros", s: "Em todos os cartões" },
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

      {/* Description */}
      <section className="max-w-4xl mx-auto px-4 py-14 md:py-20">
        <Reveal>
          <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase text-center">
            Descrição do produto
          </div>
          <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-center leading-tight">
            Pneu vazio no meio do nada?{" "}
            <span className="text-[color:var(--color-brand)]">Resolva em 5 minutos.</span>
          </h2>
          <div className="mt-6 space-y-4 text-[color:var(--color-ink-soft)] text-[15px] md:text-base leading-relaxed max-w-2xl mx-auto text-center">
            <p>
              Sem ajuda, sem posto, sem solução. A maioria das pessoas só pensa nisso depois que
              acontece uma vez. Quem já passou, nunca mais saiu sem um.
            </p>
            <p>
              Com o <span className="text-[color:var(--color-ink)] font-medium">Compressor Portátil Zero Furo</span>,
              você nunca mais se preocupará com pneu vazio. É a sua bomba pessoal e poderosa para
              resolver todos os seus problemas de pressão.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Feature grid */}
      <section className="bg-[color:var(--color-surface)] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
                Tecnologia que resolve
              </h2>
              <p className="mt-3 text-[color:var(--color-ink-soft)]">
                Um aparelho compacto, três funções essenciais. Estudado para durar e para funcionar
                em qualquer situação.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div className="h-full rounded-xl bg-white border border-[color:var(--color-line)] p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="h-11 w-11 rounded-lg bg-[color:var(--color-ink)] text-white grid place-items-center">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Split blocks */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20 space-y-16 md:space-y-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal>
            <div className="aspect-square rounded-xl overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-line)] p-8">
              <img src={p3.url} alt="Detalhe do compressor" className="w-full h-full object-contain" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase">
                Portátil e compacto
              </div>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                Cabe no porta-luvas. Vai com você onde precisar.
              </h3>
              <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                Design inovador, ideal para levar dentro do carro e evitar frustrações com pneus
                furados. Acompanha 3 bicos extras para bolas, boias, colchões infláveis e mais.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal className="md:order-2">
            <div className="aspect-square rounded-xl overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-line)] p-8">
              <img src={p4.url} alt="Display digital e LED" className="w-full h-full object-contain" />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:order-1">
            <div>
              <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase">
                Recarregável com LED
              </div>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
                +8 horas de autonomia, sem cabos.
              </h3>
              <p className="mt-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                Bateria recarregável de longa duração. Display digital exibe a pressão em tempo real
                e o LED integrado ajuda até no escuro.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Recarga rápida via USB",
                  "Desligamento automático na pressão programada",
                  "Suporta até 150 PSI",
                  "Compatível com carro, moto, bike e mais",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-[color:var(--color-brand)] shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specs */}
      <section className="border-t border-[color:var(--color-line)] py-14 md:py-20 bg-[color:var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Especificações</h3>
              <dl className="mt-5 divide-y divide-[color:var(--color-line)] bg-white rounded-xl border border-[color:var(--color-line)]">
                {[
                  ["Material", "Polímero de alta resistência"],
                  ["Carregamento", "USB"],
                  ["Pressão máxima", "150 PSI"],
                  ["Autonomia", "+8 horas de uso"],
                  ["Unidades", "PSI, BAR, KPA, KG/CM²"],
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
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">O pacote inclui</h3>
              <ul className="mt-5 bg-white rounded-xl border border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
                {[
                  "1x Mini Compressor de Ar Digital Portátil",
                  "1x Cabo de Carregamento USB",
                  "1x Mangueira de Ar (carros, motos, bikes)",
                  "1x Agulha para bolas",
                  "1x Bocal para infláveis e boias",
                  "1x Bocal para balões",
                  "1x Manual de Instrução",
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
              { q: "Serve para pneus de carro?", a: "Sim. Funciona em pneus de carro, moto, bike, patinete e bolas esportivas." },
              { q: "Quanto tempo leva para encher um pneu?", a: "Em média de 3 a 5 minutos por pneu de carro, dependendo da pressão inicial." },
              { q: "Precisa ligar na tomada?", a: "Não. Possui bateria interna recarregável via USB. Também pode ser conectado ao acendedor de cigarros." },
              { q: "Qual é o prazo de entrega?", a: "De 5 a 12 dias úteis para todo o Brasil, com frete grátis." },
              { q: "Tem garantia?", a: "Sim, 7 dias para arrependimento e 3 meses de garantia contra defeitos de fabricação." },
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

          <div className="mt-10 pt-6 border-t border-[color:var(--color-line)]">
            <p className="text-xs text-[color:var(--color-ink-soft)] leading-relaxed">
              A loja Zero Furo é operada pela Social S.A. CNPJ: 28.511.223/0004-85 — Endereço:
              Av. Caio Cotrim, 46, Galpão 01, 02 e 03 Setor CLI 2 — Itapevi - SP, CEP: 06696-060
              — 2026 Copyright Zero Furo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
