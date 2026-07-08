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
      {/* Top bar */}
      <div className="bg-black text-white text-xs md:text-sm py-2 text-center px-4">
        🚚 <span className="font-semibold">FRETE GRÁTIS</span> para todo o Brasil • Pagamento em até 12x
      </div>

      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <img src={logo.url} alt="Zero Furo" className="h-9 md:h-11" />
          <a
            href="#comprar"
            className="hidden md:inline-flex items-center rounded-full bg-black text-white text-sm font-semibold px-5 py-2 hover:bg-[color:var(--color-brand)] transition-colors"
          >
            Comprar agora
          </a>
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

      {/* Split highlight */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden bg-white border border-black/5">
            <img src={p2.url} alt="Detalhe do produto" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[color:var(--color-brand)] font-bold uppercase text-sm tracking-wider">
              Tecnologia inteligente
            </span>
            <h2 className="mt-2 text-3xl md:text-5xl font-black leading-tight">
              Display digital com pressão preset
            </h2>
            <p className="mt-4 text-black/70 md:text-lg">
              Escolha a pressão ideal para carro, moto, bike ou bola. O compressor desliga
              automaticamente ao atingir o valor programado — sem risco de estourar.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Unidades PSI, BAR, KPA e KG/CM²",
                "4 bicos inclusos para diferentes usos",
                "Bateria de longa duração",
                "Cabo USB-C para recarga rápida",
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
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Quem tem, recomenda
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Rafael M.", t: "Salvou minha viagem. Furei o pneu no meio da estrada, em 5 minutos estava rodando de novo." },
            { n: "Camila S.", t: "Uso pra encher a bola do meu filho e como power bank. Vale cada centavo." },
            { n: "João P.", t: "Compacto, silencioso e muito potente. Comprei um pra cada carro da família." },
          ].map((r) => (
            <div key={r.n} className="rounded-3xl border border-black/10 p-6 bg-white">
              <div className="flex text-[color:var(--color-brand)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-black/80">"{r.t}"</p>
              <div className="mt-4 font-bold">{r.n}</div>
              <div className="text-xs text-black/50">Compra verificada</div>
            </div>
          ))}
        </div>
      </section>

      {/* Buy CTA */}
      <section id="comprar" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-[color:var(--color-brand)] text-white text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
            Oferta por tempo limitado
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
            Garanta o seu Compressor 3 em 1 com{" "}
            <span className="text-[color:var(--color-brand)]">50% OFF</span>
          </h2>

          <div className="mt-10 bg-white text-black rounded-3xl p-6 md:p-10 max-w-md mx-auto text-left">
            <div className="flex items-center gap-4">
              <img src={p1.url} alt="Produto" className="h-20 w-20 rounded-2xl object-cover bg-neutral-50" />
              <div>
                <div className="font-bold">Compressor 3 em 1</div>
                <div className="text-sm text-black/60">Power Bank + Lanterna LED</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="font-semibold">Quantidade</span>
              <div className="flex items-center rounded-full border border-black/15">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 font-bold">-</button>
                <span className="px-4 font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2 font-bold">+</button>
              </div>
            </div>

            <div className="mt-6 border-t border-black/10 pt-6">
              <div className="text-sm text-black/50 line-through">De R$ {(499.9 * qty).toFixed(2).replace(".", ",")}</div>
              <div className="text-3xl font-black">
                R$ {(249.9 * qty).toFixed(2).replace(".", ",")}
              </div>
              <div className="text-sm text-black/70">
                ou 12x de R$ {(249.9 * qty / 12).toFixed(2).replace(".", ",")}
              </div>
            </div>

            <Button className="mt-6 w-full h-14 rounded-full bg-[color:var(--color-brand)] hover:bg-black text-white font-bold text-base">
              Comprar agora
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-black/60">
              <Lock className="h-3.5 w-3.5" /> Pagamento 100% seguro
            </div>
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
