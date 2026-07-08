import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Battery,
  Flashlight,
  ShieldCheck,
  Timer,
  Volume2,
  Check,
  Star,
  Truck,
  Lock,
  RefreshCcw,
} from "lucide-react";

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

const gallery = [p1, p2, p3, p4, p5, p6, p7, p8];

const features = [
  { icon: Zap, title: "Compressor Potente", text: "Enche pneus rapidamente com pressão precisa e ajustável." },
  { icon: Battery, title: "Power Bank", text: "Carrega seu celular em qualquer lugar, mesmo sem tomada." },
  { icon: Flashlight, title: "Lanterna LED", text: "Iluminação forte para emergências à noite ou na estrada." },
  { icon: ShieldCheck, title: "Desligamento Automático", text: "Para na pressão programada, sem risco de estourar." },
  { icon: Timer, title: "Rápido e Prático", text: "Encha um pneu de carro em minutos, sem esforço." },
  { icon: Volume2, title: "Silencioso", text: "Motor otimizado que trabalha sem incomodar." },
];

const badges = [
  { icon: Truck, title: "Frete grátis", text: "Para todo o Brasil" },
  { icon: Lock, title: "Compra segura", text: "Site 100% protegido" },
  { icon: RefreshCcw, title: "7 dias de garantia", text: "Direito de arrependimento" },
];

function Landing() {
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-center px-4 py-4">
          <img src={logo.url} alt="Zero Furo" className="h-10 md:h-12" />
        </div>
      </header>


      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-14 pb-10 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <span className="inline-block bg-black text-white text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
            Novo • 3 em 1
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Compressor de Ar Portátil{" "}
            <span className="text-[color:var(--color-brand)]">3 em 1</span>
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-black/70">
            Com Carregador Power Bank e Lanterna LED
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand)] text-white text-sm font-semibold px-4 py-2">
            Poderoso • Seguro • Duradouro • Silencioso
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <div className="flex text-[color:var(--color-brand)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-black/60">• +12.437 clientes satisfeitos</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <div className="text-sm text-black/50 line-through">De R$ 499,90</div>
              <div className="text-4xl md:text-5xl font-black">
                R$ 249<span className="text-2xl align-top">,90</span>
              </div>
              <div className="text-sm text-black/70">ou 12x de R$ 24,79 no cartão</div>
            </div>
            <a
              href="#comprar"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black text-white font-bold px-8 py-4 text-base hover:bg-[color:var(--color-brand)] transition-colors"
            >
              Quero o meu agora
            </a>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
            {["Enche pneu em minutos", "Carrega o celular", "Lanterna LED forte", "Compacto e leve"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[color:var(--color-brand)]" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2">
          <Carousel className="w-full">
            <CarouselContent>
              {gallery.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-50 border border-black/5">
                    <img src={img.url} alt={`Compressor Zero Furo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black text-white border-black hover:bg-[color:var(--color-brand)] hover:text-white" />
            <CarouselNext className="right-2 bg-black text-white border-black hover:bg-[color:var(--color-brand)] hover:text-white" />
          </Carousel>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-4">
              <b.icon className="h-8 w-8 text-[color:var(--color-brand)]" />
              <div>
                <div className="font-bold">{b.title}</div>
                <div className="text-sm text-white/70">{b.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Muito mais que um compressor
          </h2>
          <p className="mt-3 text-black/70 md:text-lg">
            Um único aparelho que resolve três problemas: pneu vazio, celular sem bateria e escuridão.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-black/10 p-6 hover:border-[color:var(--color-brand)] hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-black text-white grid place-items-center group-hover:bg-[color:var(--color-brand)] transition-colors">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-black/70">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Storytelling / Descrição principal */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
            A história que ninguém quer viver
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Pneu vazio no meio do nada?{" "}
            <span className="text-[color:var(--color-brand)]">Resolva em 5 minutos, sozinho.</span>
          </h2>
          <p className="mt-6 text-black/70 md:text-lg">
            Sem ajuda, sem posto, sem solução. A maioria das pessoas só pensa nisso
            <span className="font-semibold text-black"> depois que acontece uma vez</span>.
            Quem já passou, nunca mais saiu sem um.
          </p>
          <p className="mt-4 text-black/70 md:text-lg">
            Com o <span className="font-bold">Compressor Portátil Zero Furo</span>, você nunca mais
            se preocupará com pneu vazio. É a sua bomba pessoal e poderosa para resolver
            todos os seus problemas de pressão — a qualquer hora, em qualquer lugar.
          </p>
        </div>
      </section>

      {/* Split 1: Portátil e compacto */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden bg-white border border-black/5">
            <img src={p3.url} alt="Compressor portátil compacto" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              Portátil e compacto
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
              Design inovador que cabe no porta-luvas
            </h2>
            <p className="mt-4 text-black/70 md:text-lg">
              Perfeito para levar dentro do carro e evitar frustrações com pneus furados.
              Além da mangueira para carros e motos, acompanha <span className="font-semibold">mais 3 bicos diferentes</span>
              {" "}para bolas, balões, boias, colchões infláveis e diversas outras aplicações.
            </p>
          </div>
        </div>
      </section>

      {/* Split 2: Recarregável + LED */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              Recarregável com LED integrado
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
              Mais de 8 horas de autonomia, sem cabos
            </h2>
            <p className="mt-4 text-black/70 md:text-lg">
              Bateria recarregável de longa duração que oferece total liberdade de uso.
              O <span className="font-semibold">display digital</span> exibe a pressão em tempo real,
              garantindo medição precisa e ajuste fácil para cada necessidade.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Display digital com pressão em tempo real",
                "LED integrado para emergências no escuro",
                "Recarga rápida via USB",
                "Desligamento automático na pressão programada",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-black text-white grid place-items-center">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden bg-neutral-50 border border-black/5">
            <img src={p4.url} alt="Display digital e LED integrado" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              Benefícios
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">
              Por que quem tem, não sai mais sem
            </h2>
          </div>
          <ul className="mt-12 grid md:grid-cols-2 gap-5">
            {[
              "Prático e compacto — use em qualquer lugar, a qualquer momento.",
              "Sempre preparado para imprevistos e emergências, sem preocupação.",
              "Infla até 2,5x mais rápido que compressores comuns.",
              "Amplamente utilizável — de pneus de bike a caminhão, suporta até 150 PSI.",
              "Você nunca mais passará apuros nas estradas.",
              "LED integrado: mesmo no escuro, ele te ajuda a resolver o problema.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 p-5 bg-white/[0.03]">
                <span className="h-6 w-6 rounded-full bg-[color:var(--color-brand)] text-white grid place-items-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-white/90">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Especificações */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              Especificações
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
              Tudo o que você precisa saber
            </h2>
            <dl className="mt-6 space-y-3 text-black/80">
              <div className="flex justify-between border-b border-black/10 pb-3">
                <dt className="font-semibold">Material</dt>
                <dd>Polímero de alta resistência</dd>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-3">
                <dt className="font-semibold">Carregamento</dt>
                <dd>USB</dd>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-3">
                <dt className="font-semibold">Pressão máxima</dt>
                <dd>150 PSI</dd>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-3">
                <dt className="font-semibold">Autonomia</dt>
                <dd>+8 horas de uso</dd>
              </div>
            </dl>
          </div>
          <div>
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              O pacote inclui
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black leading-tight">
              Kit completo, pronto pra usar
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "1x Mini Compressor de Ar Digital Portátil Recarregável",
                "1x Cabo de Carregamento USB",
                "1x Mangueira de Ar (carros, motos e bicicletas)",
                "1x Agulha de Bola (vários tipos de bolas)",
                "1x Bocal para brinquedos infláveis e boias de piscina",
                "1x Bocal para vários tipos de balões",
                "1x Manual de Instrução",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-black text-white grid place-items-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-black/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {[
            { q: "Serve para pneus de carro?", a: "Sim. Funciona em pneus de carro, moto, bike, patinete e bolas esportivas." },
            { q: "Quanto tempo leva para encher um pneu?", a: "Em média de 3 a 5 minutos por pneu de carro, dependendo da pressão inicial." },
            { q: "Precisa ligar na tomada?", a: "Não. Possui bateria interna recarregável via USB-C. Também pode ser conectado ao acendedor de cigarros." },
            { q: "Qual é o prazo de entrega?", a: "De 5 a 12 dias úteis para todo o Brasil, com frete grátis." },
            { q: "Tem garantia?", a: "Sim, 7 dias para arrependimento e 3 meses de garantia contra defeitos de fabricação." },
          ].map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="border-black/10">
              <AccordionTrigger className="text-left font-semibold text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-black/70">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo.url} alt="Zero Furo" className="h-9" />
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Zero Furo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
