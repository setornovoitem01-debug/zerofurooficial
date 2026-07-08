import { createFileRoute, Link } from "@tanstack/react-router";
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
import { useImagePreload } from "@/hooks/useImagePreload";
import { useMemo } from "react";

import logo from "@/assets/logo-zerofuro.png.asset.json";

import car1 from "@/assets/selante-carro-aro13-15-1.png.asset.json";
import car2 from "@/assets/selante-carro-aro13-15-2.png.asset.json";
import car3 from "@/assets/selante-carro-aro13-15-3.png.asset.json";
import car4 from "@/assets/selante-carro-aro13-15-4.png.asset.json";
import car5 from "@/assets/selante-carro-aro13-15-5.png.asset.json";
import car6 from "@/assets/selante-carro-aro13-15-6.png.asset.json";

import car16a from "@/assets/selante-carro-aro16-18-1.png.asset.json";
import car16b from "@/assets/selante-carro-aro16-18-2.png.asset.json";
import car16c from "@/assets/selante-carro-aro16-18-3.png.asset.json";
import car16d from "@/assets/selante-carro-aro16-18-4.png.asset.json";
import car16e from "@/assets/selante-carro-aro16-18-5.png.asset.json";
import car16f from "@/assets/selante-carro-aro16-18-6.png.asset.json";

import car19a from "@/assets/selante-carro-aro19-23-1.png.asset.json";
import car19b from "@/assets/selante-carro-aro19-23-2.png.asset.json";
import car19c from "@/assets/selante-carro-aro19-23-3.png.asset.json";
import car19d from "@/assets/selante-carro-aro19-23-4.png.asset.json";
import car19e from "@/assets/selante-carro-aro19-23-5.png.asset.json";
import car19f from "@/assets/selante-carro-aro19-23-6.png.asset.json";
import car19g from "@/assets/selante-carro-aro19-23-7.png.asset.json";

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
  sections?: { title: string; paragraphs?: string[]; bullets?: string[] }[];
  specs?: [string, string][];
  inclui?: string[];
  composicao?: string[];
  dica?: string;
};

const kits: Record<AroKey, Kit> = {
  "13-15": {
    key: "13-15",
    titulo: "Selante Zero Furo 700 ml Carro - 4un",
    chamada: "Blindagem essencial para aros 13, 14 e 15",
    subtitulo:
      "Kit com 4 unidades de 700 mL — a medida exata para carros de passeio e compactos.",
    price: 95.0,
    oldPrice: 259.0,
    images: [car1, car2, car3, car4, car5, car6],
    descricao: [
      "O Selante Zero Furo Carro 700 mL é a medida exata para quem busca proteção e economia para veículos de passeio e compactos.",
      "Desenvolvido especificamente para pneus de aros 13, 14 e 15, esta embalagem oferece a quantidade ideal para uma blindagem preventiva eficiente, sem desperdícios.",
    ],
    destaques: [
      "Indicado para aros 13, 14 e 15",
      "Sela furos de até 6 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica",
      "Não danifica o pneu nem a roda",
    ],
    sections: [
      {
        title: "Blindagem essencial para aros 13, 14 e 15",
        paragraphs: [
          "Atuando de forma instantânea, nossa fórmula com fibras sintéticas sela furos de até 6 mm na banda de rodagem no momento em que ocorrem.",
          "Com a tecnologia Zero Furo, você elimina a necessidade de trocas perigosas de pneus no acostamento, mantendo a pressão estável e a segurança da sua família em primeiro lugar.",
        ],
      },
      {
        title: "Tecnologia brasileira a serviço da segurança",
        paragraphs: [
          "A Zero Furo nasceu com o propósito de transformar a experiência de dirigir no Brasil. Entendemos que os imprevistos nas vias — de buracos a objetos perfurantes — geram mais do que custos: geram riscos à vida e atrasos no dia a dia.",
          "Com tecnologia 100% brasileira, unimos química de ponta e consciência ambiental. Hoje, a Zero Furo é referência nacional em blindagem de pneus, do uso urbano cotidiano até frotas comerciais.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Sob medida para compactos e sedãs: volume otimizado para o melhor custo-benefício em pneus de Aro 13, 14 e 15.",
          "Vedação instantânea contra objetos perfurantes de até 6 mm na banda de rodagem.",
          "Segurança no dia a dia: evita paradas em locais perigosos ou desertos.",
          "Preservação do pneu: ajuda a manter a temperatura e a pressão correta, prolongando a vida útil da borracha.",
          "Sustentabilidade: fórmula à base de água, ecologicamente correta e não tóxica.",
        ],
      },
      {
        title: "Por que escolher a Zero Furo?",
        paragraphs: [
          "Não espere o pneu furar para agir. A Zero Furo é uma solução preventiva. Ao contrário de sprays de emergência que servem apenas para socorro, nossa blindagem já está lá antes do problema acontecer.",
          "É tranquilidade garantida para o motorista urbano e para quem pega a estrada.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "700 mL (por pneu)"],
      ["Indicação", "Aros 13, 14 e 15"],
      ["Composição", "Selante à base de água com microfibras sintéticas"],
      ["Aplicação", "Via válvula de ar ou interior do pneu"],
      ["Eficiência", "Proteção preventiva enquanto líquido no pneu"],
    ],
    inclui: [
      "4x Selante Zero Furo 700 mL",
      "Bico aplicador",
      "Manual de instrução",
    ],
    composicao: [
      "Borracha Sintética",
      "Borracha Natural",
      "Resina",
      "Regulador de pH",
      "H₂O",
    ],
    dica:
      "Dica Zero Furo: para carros com pneus de aro 13 a 15, o frasco de 700 mL é o seu melhor aliado em manutenção preventiva. Verifique sempre a dosagem correta para o seu modelo de pneu no QR Code do rótulo.",
  },
  "16-18": {
    key: "16-18",
    titulo: "Selante Zero Furo 900 ml Carro - 4un",
    chamada: "Proteção especializada para aros 16, 17 e 18",
    subtitulo:
      "Kit com 4 unidades de 900 mL — dosagem otimizada para SUVs, sedãs médios, crossovers e picapes.",
    price: 110.5,
    oldPrice: 300.0,
    images: [car16f, car16a, car16b, car16c, car16d, car16e],
    descricao: [
      "O Selante Zero Furo Carro 900 mL foi desenvolvido sob medida para veículos de médio e grande porte que exigem o máximo em performance e segurança.",
      "Esta embalagem é ideal para quem utiliza pneus de Aros 16, 17 e 18, oferecendo a dosagem otimizada para garantir uma blindagem interna eficiente contra imprevistos.",
    ],
    destaques: [
      "Indicado para aros 16, 17 e 18",
      "Sela furos de até 6 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica e não inflamável",
      "Não agride a borracha nem corrói a roda",
    ],
    sections: [
      {
        title: "Proteção especializada para aros 16, 17 e 18",
        paragraphs: [
          "Nossa fórmula avançada com fibras sintéticas atua de forma preventiva, selando instantaneamente furos de até 6 mm na banda de rodagem.",
          "Com o Selante Zero Furo, você protege seu investimento e garante que sua viagem não seja interrompida por pneus murchos ou paradas perigosas em vias públicas.",
        ],
      },
      {
        title: "Nossa história: tecnologia brasileira a serviço da segurança",
        paragraphs: [
          "A Zero Furo nasceu com o propósito de transformar a experiência de dirigir no Brasil. Entendemos que os imprevistos nas vias brasileiras — de buracos a objetos perfurantes — geram mais do que custos: geram riscos à vida e atrasos logísticos.",
          "Com tecnologia 100% brasileira, desenvolvemos um produto que une química de ponta e consciência ambiental. Hoje, a Zero Furo é referência nacional em blindagem de pneus, atendendo desde o motorista particular até grandes frotas que buscam reduzir custos de manutenção e maximizar a vida útil de seus pneus.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Foco em aros 16, 17 e 18: volume ideal para SUVs, sedãs médios, crossovers e picapes que utilizam estas medidas de roda.",
          "Vedação instantânea: proteção ativa contra furos de até 6 mm na banda de rodagem.",
          "Segurança máxima: evita paradas perigosas em locais de risco e reduz o risco de acidentes causados por perda súbita de ar.",
          "Economia real: ajuda a manter a temperatura interna estável, reduzindo o desgaste prematuro e prolongando a vida útil do pneu.",
          "Tecnologia eco-friendly: fórmula à base de água, ecologicamente correta, não tóxica e não inflamável.",
        ],
      },
      {
        title: "Por que escolher a Zero Furo?",
        paragraphs: [
          "Diferente de kits de reparo temporários, a Zero Furo é uma solução preventiva. Você aplica uma única vez e viaja tranquilo.",
          "É o investimento mais inteligente para quem busca proteção 24h contra os imprevistos das estradas, garantindo a integridade dos seus pneus de alta performance.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "900 mL (por pneu)"],
      ["Indicação", "Aros 16, 17 e 18"],
      ["Composição", "Selante à base de água com microfibras sintéticas de alta resistência"],
      ["Aplicação", "Via válvula de ar (sem TPMS) ou interior do pneu (com TPMS)"],
      ["Garantia", "Proteção preventiva permanente enquanto líquido no pneu"],
    ],
    inclui: [
      "4x Selante Zero Furo 900 mL",
      "Bico aplicador",
      "Manual de instrução",
    ],
    composicao: [
      "Borracha Sintética",
      "Borracha Natural",
      "Resina",
      "Regulador de pH",
      "H₂O",
    ],
    dica:
      "Dica Zero Furo: para garantir a máxima eficiência em aros 16 a 18, utilize a quantidade exata recomendada em nossa tabela de aplicação oficial disponível via QR Code na embalagem.",
  },
  "19-23": {
    key: "19-23",
    titulo: "Selante Zero Furo 1,2 L Carro - 4un",
    chamada: "Blindagem premium para SUVs, picapes e utilitários",
    subtitulo:
      "Kit com 4 unidades de 1,2 L — nível máximo de proteção para veículos de grande porte.",
    price: 129.79,
    oldPrice: 340.2,
    images: [car19a, car19b, car19c, car19d, car19e, car19f, car19g],
    descricao: [
      "O Selante Zero Furo Carro 1,2 L representa o nível máximo de proteção para quem possui veículos que exigem alta performance.",
      "Com um volume maior, esta embalagem é a escolha definitiva para SUVs, picapes, vans e veículos utilitários, garantindo a quantidade necessária para uma blindagem interna completa e de longa duração.",
    ],
    destaques: [
      "Indicado para aros 19, 20, 21, 22 e 23",
      "Sela furos de até 6 mm na banda de rodagem",
      "Fórmula à base de água, não tóxica e não inflamável",
      "Não danifica a roda nem a estrutura interna do pneu",
    ],
    sections: [
      {
        title: "Blindagem premium para SUVs, picapes e utilitários",
        paragraphs: [
          "Nossa fórmula exclusiva, composta por fibras sintéticas de alta tecnologia, cria uma barreira ativa dentro do pneu.",
          "Ao detectar uma perfuração de até 6 mm na banda de rodagem, o produto veda o buraco instantaneamente através da pressão interna, impedindo a perda de ar e permitindo que você siga viagem com total segurança e controle.",
        ],
      },
      {
        title: "Nossa história: tecnologia brasileira a serviço da segurança",
        paragraphs: [
          "A Zero Furo nasceu com o propósito de transformar a experiência de dirigir no Brasil. Entendemos que os imprevistos nas vias brasileiras — de buracos a objetos perfurantes — geram mais do que custos: geram riscos à vida e atrasos logísticos.",
          "Com tecnologia 100% brasileira, desenvolvemos um produto que une química de ponta e consciência ambiental. Hoje, a Zero Furo é referência nacional em blindagem de pneus, sendo a solução preferida por motoristas que não abrem mão da segurança e por frotistas que buscam eficiência operacional.",
        ],
      },
      {
        title: "Principais características e benefícios",
        bullets: [
          "Ideal para veículos de grande porte: volume perfeito para pneus maiores de SUVs, 4x4, utilitários de carga, caminhonetes de médio e grande porte e carros esportivos.",
          "Vedação de alta performance: proteção ativa contra furos de até 6 mm de forma imediata.",
          "Segurança inabalável: elimina o risco de ter que trocar pneus em acostamentos perigosos ou locais isolados.",
          "Máxima economia: reduz o aquecimento interno do pneu e mantém a calibragem por mais tempo.",
          "Fórmula ecológica: à base de água, não tóxica, não inflamável e ecologicamente correta.",
        ],
      },
      {
        title: "Por que escolher a Zero Furo?",
        paragraphs: [
          "A embalagem de 1,2 L da Zero Furo é o melhor custo-benefício para quem busca a blindagem mais robusta do mercado.",
          "É a garantia de que, independentemente do terreno ou da distância, seu veículo estará protegido contra os imprevistos mais comuns das estradas brasileiras. Invista em prevenção e viaje com a tranquilidade que só a líder em vedação pode oferecer.",
        ],
      },
    ],
    specs: [
      ["Marca", "Zero Furo Blindagem de Pneus"],
      ["Volume", "1,2 L (1200 mL por pneu)"],
      ["Indicação", "SUVs, 4x4, vans, picapes, utilitários e esportivos"],
      ["Composição", "Selante à base de água com microfibras sintéticas de alta resistência"],
      ["Aplicação", "Via válvula de ar ou diretamente no pneu (consulte orientações para TPMS)"],
      ["Durabilidade", "Proteção preventiva permanente enquanto líquido no pneu"],
    ],
    inclui: [
      "4x Selante Zero Furo 1,2 L",
      "Bico aplicador",
      "Manual de instrução",
    ],
    composicao: [
      "Borracha Sintética",
      "Borracha Natural",
      "Resina",
      "Regulador de pH",
      "H₂O",
    ],
    dica:
      "Dica Zero Furo: para veículos utilitários e SUVs de grande porte, o frasco de 1,2 L garante a cobertura total da banda de rodagem. Escaneie o QR Code no rótulo para acessar nossa tabela de aplicação e conferir a dosagem exata para o seu pneu.",
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

function CarroPage() {
  const [aro, setAro] = useState<AroKey | null>(null);
  const [active, setActive] = useState(0);
  const kit = aro ? kits[aro] : null;

  // Pré-carrega todas as imagens do kit selecionado — troca de slide vira instantânea.
  const kitUrls = useMemo(() => (kit ? kit.images.map((i) => i.url) : []), [kit]);
  useImagePreload(kitUrls);


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
      <header className="border-b border-[color:var(--color-line)] sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3.5">
          <Link to="/" preload="viewport" aria-label="Ir para a página inicial">
            <img src={logo.url} alt="Zero Furo" className="h-8 sm:h-10" />
          </Link>
        </div>
      </header>

      {/* Hero + seletor de aro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-surface)] to-white">
        <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 text-center">
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
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />
                </div>
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

          {/* Galeria em grade */}
          <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
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
                    <img src={img.url} alt={`${kit.titulo} - imagem ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
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
          <section id="descricao" className="max-w-4xl mx-auto px-4 py-10 md:py-14 scroll-mt-24">
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
              </div>
            </Reveal>

            {kit.sections && (
              <div className="mt-14 space-y-12 max-w-3xl mx-auto">
                {kit.sections.map((s, i) => (
                  <Reveal key={s.title} delay={i * 80}>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
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
            )}

            {kit.dica && (
              <Reveal delay={200}>
                <div className="mt-12 max-w-3xl mx-auto rounded-xl bg-[color:var(--color-surface)] border border-[color:var(--color-line)] px-6 py-5 text-sm text-[color:var(--color-ink-soft)] leading-relaxed">
                  {kit.dica}
                </div>
              </Reveal>
            )}
          </section>

          {/* CTA antes das especificações */}
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
                  <a href="#comprar" className="cta-green inline-flex items-center justify-center h-12 px-8 rounded-md font-semibold text-[15px]">
                    Comprar agora por R$ {kit.price.toFixed(2).replace(".", ",")}
                  </a>
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
                    {(kit.specs ?? [
                      ["Indicação de aro", `Aros ${kit.key}`],
                      ["Aplicação", "Preventiva e corretiva"],
                      ["Compatibilidade", "Pneus sem câmara"],
                      ["Validade", "24 meses"],
                    ]).map(([k, v]) => (
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
                    {(kit.inclui ?? [
                      "Selante Zero Furo (quantidade ideal para o aro selecionado)",
                      "Bico aplicador",
                      "Manual de instrução",
                    ]).map((t) => (
                      <li key={t} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <Check className="h-4 w-4 text-[color:var(--color-brand)] shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  {kit.composicao && (
                    <>
                      <h3 className="mt-8 text-xl md:text-2xl font-semibold tracking-tight">Composição</h3>
                      <ul className="mt-5 bg-white rounded-xl border border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
                        {kit.composicao.map((t) => (
                          <li key={t} className="flex items-center gap-3 px-4 py-3 text-sm">
                            <Droplets className="h-4 w-4 text-[color:var(--color-brand)] shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
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
