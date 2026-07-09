import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { setCartItem } from "@/lib/cart";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  Timer,
  BadgeCheck,
  Bike,
  Droplets,
  Gauge,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/useReveal";
import { useImagePreload } from "@/hooks/useImagePreload";

import logo from "@/assets/logo-zerofuro.png.asset.json";
import moto125_1 from "@/assets/selante-moto-125-1.png.asset.json";
import moto125_2 from "@/assets/selante-moto-125-2.png.asset.json";
import moto125_3 from "@/assets/selante-moto-125-3.png.asset.json";
import moto125_4 from "@/assets/selante-moto-125-4.png.asset.json";
import moto125_5 from "@/assets/selante-moto-125-5.png.asset.json";
import moto125_6 from "@/assets/selante-moto-125-6.png.asset.json";
import moto150 from "@/assets/selante-moto-150-300.jpg";
import moto350 from "@/assets/selante-moto-350.jpg";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/moto")({
  head: () => ({
    meta: [
      { title: "Selante Zero Furo para Moto — Escolha a cilindrada" },
      {
        name: "description",
        content:
          "Kit Selante Zero Furo para motos. Escolha o kit ideal para a cilindrada da sua moto (até 125cc, 150 a 300cc, ou 350cc+) e nunca mais fique na mão.",
      },
      { property: "og:title", content: "Selante Zero Furo para Moto" },
      {
        property: "og:description",
        content:
          "Kit Selante Zero Furo para motos — proteção sob medida para cada cilindrada.",
      },
    ],
  }),
  component: MotoPage,
});

type MotoKey = "125" | "150-300" | "350";

type Kit = {
  key: MotoKey;
  productId: "moto-125" | "moto-150-300" | "moto-350";
  titulo: string;
  chamada: string;
  subtitulo: string;
  price: number;
  oldPrice: number;
  images: { url: string }[];
  descricao: string[];
  destaques: string[];
  sections: { title: string; paragraphs?: string[]; bullets?: string[] }[];
  specs: [string, string][];
  inclui: string[];
  composicao: string[];
  dica: string;
};

const kits: Record<MotoKey, Kit> = {
  "125": {
    key: "125",
    productId: "moto-125",
    titulo: "Kit 2 Unidades. Selante Zero Furo 400 ml Moto",
    chamada: "Blindagem de alta performance para motos até 125cc",
    subtitulo:
      "Kit com 2 unidades de 400 mL — dosagem ideal para motos urbanas e entregadores.",
    price: PRODUCTS["moto-125"].price,
    oldPrice: 189.0,
    images: [moto125_1, moto125_2, moto125_3, moto125_4, moto125_5, moto125_6],
    descricao: [
      "O Selante Zero Furo Moto 400 mL é o parceiro indispensável de quem vive sobre duas rodas e não pode perder tempo. Projetado especificamente para as necessidades de motociclistas urbanos e entregadores, este selante oferece uma blindagem interna ativa que veda furos instantaneamente de dentro para fora.",
      "Diferente de soluções de emergência, o Zero Furo atua de forma preventiva. No momento em que um objeto perfura o pneu, a pressão interna força o selante contra o orifício, criando uma vedação permanente em segundos. Isso evita a perda de controle da moto e garante que você não fique parado em locais perigosos ou perca o prazo de suas entregas.",
    ],
    destaques: [
      "Indicado para motos até 125cc",
      "Vedação instantânea contra furos de até 3 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica e não corrosiva",
      "Não danifica a roda nem a estrutura do pneu",
    ],
    sections: [
      {
        title: "Nossa história: tecnologia brasileira a serviço da segurança",
        paragraphs: [
          "A Zero Furo nasceu com o propósito de transformar a experiência de dirigir no Brasil. Entendemos que os imprevistos nas vias — de buracos a objetos perfurantes — geram riscos reais à vida, especialmente para os motociclistas.",
          "Com tecnologia 100% brasileira, desenvolvemos uma fórmula que une química de ponta e consciência ambiental. Hoje, a Zero Furo é referência nacional em blindagem de pneus, oferecendo aos motociclistas a tranquilidade necessária para enfrentar o dia a dia com a garantia de que nada vai parar sua jornada.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Segurança em duas rodas: evita a perda súbita de pressão, reduzindo drasticamente o risco de quedas causadas por pneus murchos.",
          "Vedação instantânea: proteção eficiente contra furos na banda de rodagem causados por objetos perfurantes comuns do asfalto.",
          "Versatilidade total: eficaz em pneus sem câmara de ar (90% de proteção em furos de até 3 mm na banda de rodagem; nos ombros e laterais dos pneus não contém produto).",
          "Durabilidade: age durante toda a vida útil do pneu (enquanto houver produto líquido no interior).",
          "Tecnologia eco-friendly: fórmula à base de água, ecologicamente correta e não corrosiva. Não danifica a roda nem a estrutura do pneu.",
        ],
      },
      {
        title: "Por que escolher a Zero Furo?",
        paragraphs: [
          "Para quem anda de moto, tempo e segurança são preciosos. A Zero Furo elimina o pesadelo de ter que empurrar a moto ou procurar um borracheiro aberto no meio da noite.",
          "É proteção invisível e constante: você aplica uma única vez e a blindagem trabalha por você a cada quilômetro.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "400 mL"],
      ["Indicação", "Ideal para motocicletas de até 125 cilindradas"],
      ["Composição", "Selante à base de água com microfibras sintéticas de alta resistência"],
      ["Aplicação", "Simples e rápida via válvula de ar"],
      ["Compatibilidade", "Pneus sem câmara de ar"],
    ],
    inclui: ["2x Selante Zero Furo Moto 400 mL", "Bico aplicador", "Manual de instrução"],
    composicao: ["Borracha Sintética", "Borracha Natural", "Resina", "Regulador de pH", "H₂O"],
    dica:
      "Dica Zero Furo: este sachê de 400 mL foi dimensionado para oferecer a cobertura perfeita para pneus de motos de até 125 cilindradas. Para garantir a máxima eficiência, utilize a dosagem completa conforme orientado em nossa tabela de aplicação oficial (disponível via QR Code).",
  },
  "150-300": {
    key: "150-300",
    productId: "moto-150-300",
    titulo: "Selante Zero Furo Moto 350 ml - 2un",
    chamada: "Para motos de 150 até 300 cilindradas",
    subtitulo:
      "Kit com 2 unidades de 350 mL — dosagem ideal para motos de média cilindrada usadas no dia a dia e em estradas.",
    price: PRODUCTS["moto-150-300"].price,
    oldPrice: 229.0,
    images: [{ url: moto150 }],
    descricao: [
      "O Selante Zero Furo Moto 350 mL foi pensado para motos de 150 a 300cc — a faixa de motos mais versáteis do país, usadas tanto no trânsito quanto na estrada.",
      "A dosagem foi otimizada para garantir uma blindagem eficiente em pneus de porte médio, sem desperdício.",
    ],
    destaques: [
      "Indicado para motos de 150 a 300cc",
      "Sela furos de até 5 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica e não inflamável",
      "Não agride a borracha nem corrói a roda",
    ],
    sections: [
      {
        title: "Segurança para o dia a dia e para a estrada",
        paragraphs: [
          "Motos de média cilindrada são levadas a todo tipo de terreno. Nossa fórmula avançada com fibras sintéticas sela furos de até 5 mm instantaneamente, seja no asfalto ou em estradas de chão.",
          "Com o Zero Furo Moto, você viaja tranquilo sabendo que seu pneu está protegido contra os imprevistos mais comuns.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Volume otimizado para motos de 150 a 300cc.",
          "Proteção ativa contra furos de até 5 mm.",
          "Mantém a pressão do pneu estável por mais tempo.",
          "Fórmula ecológica, à base de água e não inflamável.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "350 mL (por pneu)"],
      ["Indicação", "Motos de 150 a 300cc"],
      ["Composição", "Selante à base de água com microfibras sintéticas"],
      ["Aplicação", "Via válvula de ar ou interior do pneu"],
    ],
    inclui: ["2x Selante Zero Furo Moto 350 mL", "Bico aplicador", "Manual de instrução"],
    composicao: ["Borracha Sintética", "Borracha Natural", "Resina", "Regulador de pH", "H₂O"],
    dica:
      "Dica Zero Furo: para motos de média cilindrada usadas em viagens, reforce a aplicação antes de longas rotas e verifique a calibragem periodicamente.",
  },
  "350": {
    key: "350",
    productId: "moto-350",
    titulo: "Selante Zero Furo Moto 500 ml - 2un",
    chamada: "Para motos de 350 cilindradas ou mais",
    subtitulo:
      "Kit com 2 unidades de 500 mL — máxima proteção para big trails, esportivas e motos de alta cilindrada.",
    price: PRODUCTS["moto-350"].price,
    oldPrice: 279.0,
    images: [{ url: moto350 }],
    descricao: [
      "O Selante Zero Furo Moto 500 mL é a escolha definitiva para motos de 350cc ou mais — big trails, esportivas e naked de alta performance.",
      "A dosagem elevada garante blindagem completa em pneus maiores, mantendo a segurança em altas velocidades e em longas viagens.",
    ],
    destaques: [
      "Indicado para motos de 350cc ou mais",
      "Sela furos de até 6 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica e não inflamável",
      "Não danifica a roda nem a estrutura interna do pneu",
    ],
    sections: [
      {
        title: "Blindagem premium para motos de alta cilindrada",
        paragraphs: [
          "Motos de alta performance exigem proteção à altura. Nossa fórmula exclusiva cria uma barreira ativa dentro do pneu e sela furos de até 6 mm instantaneamente.",
          "Ao detectar uma perfuração, o produto veda o buraco através da pressão interna, permitindo que você siga viagem com total controle.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Volume ideal para big trails, esportivas e naked de alta cilindrada.",
          "Vedação de alta performance contra furos de até 6 mm.",
          "Reduz o aquecimento interno do pneu em altas velocidades.",
          "Fórmula ecológica, à base de água e não inflamável.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "500 mL (por pneu)"],
      ["Indicação", "Motos de 350cc ou mais"],
      ["Composição", "Selante à base de água com microfibras sintéticas de alta resistência"],
      ["Aplicação", "Via válvula de ar ou interior do pneu"],
    ],
    inclui: ["2x Selante Zero Furo Moto 500 mL", "Bico aplicador", "Manual de instrução"],
    composicao: ["Borracha Sintética", "Borracha Natural", "Resina", "Regulador de pH", "H₂O"],
    dica:
      "Dica Zero Furo: para motos de grande porte, o frasco de 500 mL garante cobertura total da banda de rodagem em pneus maiores. Ideal para viagens longas e uso em estrada.",
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
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function MotoPage() {
  const [motoKey, setMotoKey] = useState<MotoKey | null>(null);
  const [active, setActive] = useState(0);
  const kit = motoKey ? kits[motoKey] : null;
  const navigate = useNavigate();

  const preloadUrls = useMemo(() => (kit ? kit.images.map((i) => i.url) : []), [kit]);
  useImagePreload(preloadUrls);

  const handleBuy = () => {
    if (!kit) return;
    setCartItem({
      id: kit.productId,
      name: kit.titulo,
      image: kit.images[0].url,
      price: kit.price,
      oldPrice: kit.oldPrice,
    });
    navigate({ to: "/carrinho" });
  };

  const selectKit = (k: MotoKey) => {
    setMotoKey(k);
    setActive(0);
    setTimeout(() => {
      document.getElementById("produto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <div className="min-h-screen bg-white text-[color:var(--color-ink)] font-sans antialiased overflow-x-hidden">
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3.5">
          <Link to="/" preload="viewport" aria-label="Ir para a página inicial">
            <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
          </Link>
        </div>
      </header>

      {/* Hero + seletor */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-brand-soft)] via-white to-white">
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[color:var(--color-brand)] tracking-widest uppercase bg-white border border-[color:var(--color-line)] px-3 py-1.5 rounded-full">
              <Bike className="h-3.5 w-3.5" /> Selante Zero Furo • Moto
            </span>
            <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Selecione a <span className="text-[color:var(--color-brand)]">cilindrada</span> da sua moto
            </h1>
            <p className="mt-4 text-[color:var(--color-ink-soft)] max-w-xl mx-auto">
              Escolha o kit ideal de Selante Zero Furo para a cilindrada da sua moto e nunca mais fique na mão com pneu furado.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {(Object.values(kits)).map((k, i) => {
              const selected = motoKey === k.key;
              return (
                <Reveal key={k.key} delay={i * 100}>
                  <button
                    type="button"
                    onClick={() => selectKit(k.key)}
                    aria-pressed={selected}
                    className={`w-full h-full text-left rounded-2xl border p-5 md:p-6 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      selected
                        ? "border-[color:var(--color-brand)] shadow-lg ring-2 ring-[color:var(--color-brand)]/30"
                        : "border-[color:var(--color-line)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-lg bg-[color:var(--color-brand)] text-white grid place-items-center shadow-[0_6px_16px_-6px_rgba(255,107,26,0.55)]">
                        <Gauge className="h-5 w-5" />
                      </div>
                      {selected && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <div className="mt-5 text-xs font-semibold tracking-widest uppercase text-[color:var(--color-brand)]">
                      {k.key === "125" ? "Até 125cc" : k.key === "150-300" ? "150 a 300cc" : "350cc ou mais"}
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

      {kit && (
        <>
          <section
            id="produto"
            className="max-w-7xl mx-auto px-4 pt-8 md:pt-12 pb-10 md:pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 scroll-mt-24"
          >
            {/* Imagem */}
            <div className="min-w-0 w-full">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="aspect-square rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] overflow-hidden flex items-center justify-center p-6 md:p-10">
                  <img
                    key={`${kit.key}-${active}`}
                    src={kit.images[active].url}
                    alt={kit.titulo}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />
                </div>
                {kit.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActive((a) => (a - 1 + kit.images.length) % kit.images.length)}
                      aria-label="Imagem anterior"
                      className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive((a) => (a + 1) % kit.images.length)}
                      aria-label="Próxima imagem"
                      className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-[color:var(--color-line)] shadow-md grid place-items-center hover:bg-[color:var(--color-surface)] transition"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              {kit.images.length > 1 && (
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
              )}
            </div>

            {/* Painel de compra */}
            <div id="comprar" className="lg:sticky lg:top-24 self-start scroll-mt-24">
              <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-brand)]">
                {kit.key === "125" ? "Até 125cc" : kit.key === "150-300" ? "150 a 300cc" : "350cc ou mais"}
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
                  onClick={handleBuy}
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
          <section className="border-y border-[color:var(--color-brand)]/20 bg-[color:var(--color-brand-soft)]">
            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Truck, t: "Frete grátis", s: "Para todo o Brasil" },
                { icon: BadgeCheck, t: "Produto original", s: "Garantia de qualidade" },
                { icon: ShieldCheck, t: "Compra segura", s: "Site 100% protegido" },
                { icon: RefreshCcw, t: "7 dias de garantia", s: "Direito de arrependimento" },
              ].map((b, i) => (
                <Reveal key={b.t} delay={i * 80}>
                  <div className="flex items-center gap-3">
                    <b.icon className="h-6 w-6 text-[color:var(--color-brand)] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{b.t}</div>
                      <div className="text-xs text-[color:var(--color-ink-soft)] truncate">{b.s}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Descrição */}
          <section id="descricao" className="max-w-4xl mx-auto px-4 py-10 md:py-14 scroll-mt-24">
            <Reveal>
              <div className="text-xs font-semibold text-[color:var(--color-brand)] tracking-widest uppercase text-center">
                Descrição do produto
              </div>
              <h2 className="mt-3 text-2xl md:text-4xl font-semibold tracking-tight text-center leading-tight">
                Pneu de moto furado?{" "}
                <span className="text-[color:var(--color-brand)]">Resolva na hora.</span>
              </h2>
              <div className="mt-6 space-y-4 text-[color:var(--color-ink-soft)] text-[15px] md:text-base leading-relaxed max-w-2xl mx-auto text-center">
                {kit.descricao.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <div className="mt-14 space-y-12 max-w-3xl mx-auto">
              {kit.sections.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{s.title}</h3>
                  {s.paragraphs && (
                    <div className="mt-4 space-y-3 text-[color:var(--color-ink-soft)] text-[15px] leading-relaxed">
                      {s.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  )}
                  {s.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
                          <Check className="h-4 w-4 mt-1 text-[color:var(--color-brand)] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-12 max-w-3xl mx-auto rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-line)] px-6 py-5 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                {kit.dica}
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <section className="max-w-6xl mx-auto px-4 pb-10 md:pb-14">
            <Reveal>
              <div className="rounded-2xl bg-[color:var(--color-ink)] text-white px-6 py-10 md:px-12 md:py-14 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Leve o seu com <span className="text-emerald-400">desconto especial</span>
                </h3>
                <p className="mt-3 text-white/70 max-w-xl mx-auto">
                  Estoque limitado. Aproveite o preço promocional enquanto durar.
                </p>
                <div className="mt-6">
                  <button type="button" onClick={handleBuy} className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                    Comprar agora por R$ {kit.price.toFixed(2).replace(".", ",")}
                  </button>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Specs */}
          <section className="border-t border-[color:var(--color-line)] py-10 md:py-14 bg-[color:var(--color-surface)]">
            <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
              <Reveal>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Ficha técnica</h3>
                  <dl className="mt-5 divide-y divide-[color:var(--color-line)] bg-white rounded-xl border border-[color:var(--color-line)]">
                    {kit.specs.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
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
                    {kit.inclui.map((t) => (
                      <li key={t} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <Check className="h-4 w-4 text-[color:var(--color-brand)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-8 text-xl md:text-2xl font-semibold tracking-tight">Composição</h3>
                  <ul className="mt-5 bg-white rounded-xl border border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
                    {kit.composicao.map((t) => (
                      <li key={t} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <Droplets className="h-4 w-4 text-[color:var(--color-brand)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto px-4 py-10 md:py-14">
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-center">
                Perguntas frequentes
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Accordion type="single" collapsible className="mt-8">
                {[
                  { q: "Como sei qual é a cilindrada da minha moto?", a: "A cilindrada está na documentação da moto (CRLV) e também em placas ou adesivos no chassi/motor. Modelos populares como CG 160 têm 160cc; XRE 300 tem 300cc; Ténéré 700 tem 689cc." },
                  { q: "O selante funciona em pneu de moto sem câmara?", a: "Sim, é indicado para pneus sem câmara (tubeless), que são o padrão nas motos modernas com rodas de liga leve." },
                  { q: "E se minha moto tiver pneu com câmara?", a: "Para motos com pneu com câmara (raiada), a aplicação é feita diretamente no interior da câmara. Consulte o manual de instrução incluso no kit." },
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
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="mb-10">
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

          <div className="mt-10 pt-8 border-t border-[color:var(--color-line)] text-center text-[11px] text-[color:var(--color-ink-soft)]">
            © 2026 Zero Furo. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
