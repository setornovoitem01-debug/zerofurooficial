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
  Zap,
  Battery,
  Flashlight,
  Gauge,
  Volume2,
  Timer,
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

export const Route = createFileRoute("/compressor")({
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
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
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
  const price = 55.9;
  const oldPrice = 199.9;

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
        <div className="max-w-3xl mx-auto px-4 py-14 md:py-24 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--color-brand)] tracking-widest uppercase bg-white border border-[color:var(--color-line)] px-3 py-1.5 rounded-full">
              <Zap className="h-3.5 w-3.5" /> Lançamento • 3 em 1
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Nunca mais fique <span className="text-[color:var(--color-brand)]">na mão</span> com pneu vazio.
            </h1>
            <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] leading-relaxed max-w-xl mx-auto">
              Compressor de Ar Portátil Zero Furo: enche em minutos, carrega seu celular e ilumina o caminho. Tudo num único aparelho que cabe no porta-luvas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                  Quero o meu agora
                </a>
                <a href="#descricao" className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-[color:var(--color-ink)] hover:bg-[color:var(--color-surface)] font-semibold text-[15px] transition">
                  Ver detalhes
                </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product area */}
      <section className="max-w-7xl mx-auto px-4 pt-8 md:pt-12 pb-10 md:pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">
        {/* Gallery */}
        <div className="min-w-0 w-full">
          <div className="relative w-full max-w-lg mx-auto">
            <div className="aspect-square rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] overflow-hidden flex items-center justify-center p-6 md:p-10">
              <img
                key={active}
                src={images[active].url}
                alt="Compressor de Ar Portátil 3 em 1 Zero Furo"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain animate-in fade-in duration-300"
              />
            </div>
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
              aria-label="Imagem anterior"
              className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % images.length)}
              aria-label="Próxima imagem"
              className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, i) => (
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
          <h1 className="text-2xl md:text-[28px] font-semibold leading-tight tracking-tight">
            Compressor de Ar Portátil 3 em 1 com Carregador Power Bank e Lanterna LED
          </h1>

          <div className="mt-6">
            <div className="text-sm text-[color:var(--color-ink-soft)] line-through">
              R$ {oldPrice.toFixed(2).replace(".", ",")}
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-4xl md:text-5xl font-light tracking-tight text-emerald-600">
                R$ <span className="font-medium">{price.toFixed(2).replace(".", ",")}</span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                72% OFF
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
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="group aspect-square rounded-xl overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-line)] p-4 md:p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <img src={img.url} alt={`Compressor Zero Furo - imagem ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
            Comprar agora
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

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                Quero garantir o meu
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Split blocks */}
      <section className="max-w-6xl mx-auto px-4 py-14 md:py-20 space-y-16 md:space-y-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal>
            <div className="aspect-square rounded-xl overflow-hidden bg-[color:var(--color-surface)] border border-[color:var(--color-line)] p-8">
              <img src={p3.url} alt="Detalhe do compressor" loading="lazy" decoding="async" className="w-full h-full object-contain" />
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
              <img src={p4.url} alt="Display digital e LED" loading="lazy" decoding="async" className="w-full h-full object-contain" />
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

      {/* CTA antes das especificações */}
      <section className="max-w-6xl mx-auto px-4 pb-14 md:pb-20">
        <Reveal>
          <div className="rounded-2xl bg-[color:var(--color-ink)] text-white px-6 py-10 md:px-12 md:py-14 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Leve o seu com <span className="text-emerald-400">72% de desconto</span>
            </h3>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">
              Estoque limitado. Aproveite o preço promocional enquanto durar.
            </p>
            <div className="mt-6">
              <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                Comprar agora por R$ 55,90
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
    </div>
  );
}
