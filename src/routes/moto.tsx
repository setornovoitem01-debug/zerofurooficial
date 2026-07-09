import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-zerofuro.png.asset.json";
import motoImg from "@/assets/selante-moto.jpg";

export const Route = createFileRoute("/moto")({
  head: () => ({
    meta: [
      { title: "Selante Zero Furo para Moto — Em breve" },
      {
        name: "description",
        content:
          "Selante Zero Furo para motos. Proteção contra furos para pneus de moto. Em breve disponível.",
      },
      { property: "og:title", content: "Selante Zero Furo para Moto" },
      {
        property: "og:description",
        content: "Selante Zero Furo para motos — em breve.",
      },
    ],
  }),
  component: MotoPage,
});

function MotoPage() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans">
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3.5">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <img src={logo.url} alt="Zero Furo" className="h-8" />
          <span className="w-16" />
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
        <img
          src={motoImg}
          alt="Selante Zero Furo para moto"
          width={1024}
          height={1024}
          loading="lazy"
          className="mx-auto h-64 w-64 md:h-80 md:w-80 object-cover rounded-2xl border border-[color:var(--color-line)]"
        />
        <h1 className="mt-8 text-3xl md:text-5xl font-semibold tracking-tight">
          Selante Zero Furo para Moto
        </h1>
        <p className="mt-4 text-base md:text-lg text-[color:var(--color-ink-soft)] max-w-xl mx-auto">
          Estamos preparando o kit ideal para motos. Em breve você poderá proteger
          seu pneu de moto contra furos com a mesma tecnologia Zero Furo.
        </p>
        <span className="mt-8 inline-flex items-center justify-center h-11 px-6 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-semibold text-sm">
          Em breve
        </span>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-black text-white hover:bg-black/90 font-semibold text-[15px] transition"
          >
            Ver outras categorias
          </Link>
        </div>
      </section>
    </div>
  );
}
