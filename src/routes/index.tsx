import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Wrench } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

import logo from "@/assets/logo-zerofuro.png.asset.json";
import hero from "@/assets/hero-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zero Furo — Seu caminho mais seguro" },
      {
        name: "description",
        content:
          "Selante Zero Furo para carros e motos e o Compressor de Ar Portátil 3 em 1. Proteção e praticidade para nunca mais ficar na mão.",
      },
      { property: "og:title", content: "Zero Furo — Seu caminho mais seguro" },
      {
        property: "og:description",
        content:
          "Selante Zero Furo para carros e motos e o Compressor de Ar Portátil 3 em 1.",
      },
    ],
  }),
  component: Home,
});

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
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

type Categoria = {
  nome: string;
  Icon: typeof Car;
  to: string;
};

const categorias: Categoria[] = [
  { nome: "Selante Zero Furo Para Seu Carro", Icon: Car, to: "/carro" },
  { nome: "Compressor de Ar Portátil 3 em 1", Icon: Wrench, to: "/compressor" },
];

function Home() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3.5">
          <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
        </div>
      </header>

      {/* Hero banner */}
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={hero}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-20 min-h-[420px] md:min-h-[500px] flex items-center">
          <Reveal>
            <div className="max-w-lg">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">
                Seu caminho<br />mais seguro
              </h1>
              <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-md">
                Nunca mais sofra com os inconvenientes do pneu furado em lugares perigosos.
              </p>
              <a
                href="#categorias"
                className="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-md bg-white text-black hover:bg-white/90 font-semibold text-[15px] transition"
              >
                Compre agora
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="max-w-6xl mx-auto px-4 py-10 md:py-16 scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center">
            Categorias
          </h2>
        </Reveal>

        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {categorias.map(({ nome, Icon, to }, i) => (
            <Reveal key={nome} delay={i * 120}>
              <Link
                to={to}
                preload="viewport"
                className="group flex flex-col items-center text-center"
              >
                <div className="h-40 w-40 md:h-48 md:w-48 rounded-full border-[3px] border-[color:var(--color-brand)] grid place-items-center bg-[color:var(--color-brand-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:bg-white">
                  <Icon
                    className="h-20 w-20 md:h-24 md:w-24 text-[color:var(--color-brand)]"
                    strokeWidth={1.75}
                  />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm md:text-base font-medium max-w-[200px]">
                    {nome}
                  </span>
                  <span className="h-9 w-9 rounded bg-[color:var(--color-brand)] text-white grid place-items-center transition group-hover:bg-[color:var(--color-ink)]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--color-line)] bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="mb-8">
            <img src={logo.url} alt="Zero Furo" className="h-9" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
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
