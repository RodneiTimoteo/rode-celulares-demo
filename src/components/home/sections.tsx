import Link from "next/link";
import { whatsappUrl } from "@/utils/whatsapp";
import {
  Button,
  Card,
  Container,
  SearchField,
  SectionTitle,
  buttonStyles,
} from "@/components/ui";
import type { Produto } from "@/data/produtos";
import { storeUnits } from "@/data/units";
import { ProductCard } from "./product-card";

const whatsapp = whatsappUrl();

const categoryIconPaths = [
  "M7 2h10a2 2 0 0 1 2 2v16H5V4a2 2 0 0 1 2-2Zm3 3h4m-3 12h2",
  "M4 7h16v10H4zM8 4h8m-5 16h2",
  "M5 6h14v12H5zM9 10v4m3-4v4m3-4v4",
] as const;

const advantages = [
  {
    title: "Atendimento pelo WhatsApp",
    text: "Fale com nossa equipe e consulte produtos e condições.",
    icon: "M4 3h16v13H9l-5 5V3Zm4 5h8m-8 4h5",
  },
  {
    title: "Duas unidades",
    text: "Mais facilidade para você encontrar nossa loja.",
    icon: "M12 21s7-6 7-12A7 7 0 1 0 5 9c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    title: "Smartphones e acessórios",
    text: "Produtos para deixar você sempre conectado.",
    icon: "M7 2h10a2 2 0 0 1 2 2v16H5V4a2 2 0 0 1 2-2Zm3 3h4m-3 12h2",
  },
  {
    title: "Atendimento personalizado",
    text: "Ajuda para encontrar o aparelho ou acessório ideal.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6.5-10A4 4 0 1 0 9.5 3a4 4 0 0 0 0 8ZM17 8h4m-2-2v4",
  },
] as const;

function LineIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export function HomeSearch({
  busca,
  onSearch,
  onSubmit,
  sugestoes,
  carregando,
  erro,
}: {
  busca: string;
  onSearch: (value: string) => void;
  onSubmit: (value: string) => void;
  sugestoes: Produto[];
  carregando: boolean;
  erro: string | null;
}) {
  return (
    <section className="home-chapter bg-surface" aria-labelledby="busca-titulo">
      <Container className="pb-14 pt-6 md:pb-20 md:pt-8">
        <div className="search-panel mx-auto max-w-4xl rounded-3xl bg-background shadow-sm">
          <p className="eyebrow">Busca rápida</p>
          <SectionTitle id="busca-titulo" className="text-2xl md:text-3xl">
            O que você está procurando?
          </SectionTitle>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(busca);
            }}
          >
            <SearchField
              aria-label="Busca principal por produto, marca ou categoria"
              placeholder="Busque por produto, marca ou categoria..."
              value={busca}
              onChange={(event) => onSearch(event.target.value)}
            />
            <Button type="submit" className="shrink-0">
              Buscar produtos
            </Button>
          </form>
          {busca.trim() && (
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Sugestões de produtos"
            >
              {sugestoes.map((produto) => (
                <button
                  key={`${produto.id}-${produto.nome}-${produto.dosagem}`}
                  type="button"
                  className="rounded-lg bg-brand-soft px-3 py-2 text-left text-sm text-brand hover:text-health"
                  onClick={() => onSubmit(produto.nome)}
                >
                  {produto.nome}
                  {produto.marca ? ` · ${produto.marca}` : ""}
                </button>
              ))}
              <p role="status" className="w-full text-sm text-muted">
                {carregando
                  ? "Carregando sugestões..."
                  : erro
                    ? "Sugestões indisponíveis no momento."
                    : sugestoes.length === 0
                      ? "Nenhuma sugestão encontrada. Consulte o catálogo para ver todas as opções."
                      : "Selecione uma sugestão ou continue sua busca no catálogo."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function CategorySection({
  produtos,
  carregando,
  erro,
  onSelect,
}: {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
  onSelect: (value: string) => void;
}) {
  const categories = [
    ...new Set(
      produtos.map((produto) => produto.categoria.trim()).filter(Boolean),
    ),
  ]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 10);

  return (
    <section
      id="categorias"
      className="home-chapter bg-background"
      aria-labelledby="categorias-titulo"
    >
      <Container className="py-16 md:py-24">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Categorias</p>
            <SectionTitle
              id="categorias-titulo"
              className="text-3xl md:text-4xl"
            >
              Encontre o que você procura
            </SectionTitle>
            <p className="mt-3 text-muted">
              Navegue pelas principais categorias da loja.
            </p>
          </div>
          <Link className={buttonStyles("secondary")} href="/produtos">
            Ver todas
          </Link>
        </div>
        {carregando ? (
          <p role="status" className="text-sm text-muted">
            Carregando categorias...
          </p>
        ) : erro ? (
          <p role="alert" className="text-sm text-muted">
            As categorias estão indisponíveis no momento.
          </p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted">Nenhuma categoria disponível.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className="category-card home-category-card"
                onClick={() => onSelect(category)}
                aria-label={`Explorar ${category}`}
              >
                <span className="category-icon">
                  <LineIcon
                    path={categoryIconPaths[index % categoryIconPaths.length]}
                  />
                </span>
                <span className="text-sm font-semibold">{category}</span>
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function FeaturedProducts({
  produtos,
  carregando,
  erro,
}: {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
}) {
  return (
    <section
      className="home-chapter bg-surface"
      aria-labelledby="destaques-titulo"
    >
      <Container className="py-16 md:py-24">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Seleção RODE</p>
            <SectionTitle
              id="destaques-titulo"
              className="text-3xl md:text-4xl"
            >
              Destaques da loja
            </SectionTitle>
            <p className="mt-3 text-muted">
              Uma seleção objetiva do catálogo demonstrativo.
            </p>
          </div>
          <Link className={buttonStyles("secondary")} href="/produtos">
            Ver todos os produtos
          </Link>
        </div>
        {carregando ? (
          <p role="status" className="text-sm text-muted">
            Carregando destaques...
          </p>
        ) : erro ? (
          <p
            role="alert"
            className="rounded-2xl bg-warning-soft p-6 text-warning"
          >
            Os destaques estão indisponíveis no momento. Consulte o catálogo
            diretamente.
          </p>
        ) : produtos.length === 0 ? (
          <p className="text-muted">Nenhum destaque disponível no momento.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produtos.slice(0, 6).map((produto) => (
              <ProductCard
                key={`${produto.id}-${produto.nome}-${produto.dosagem}`}
                produto={produto}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section
      className="home-chapter bg-background"
      aria-labelledby="vantagens-titulo"
    >
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Por que escolher a RODE</p>
          <SectionTitle id="vantagens-titulo" className="text-3xl md:text-4xl">
            Tecnologia com atendimento próximo
          </SectionTitle>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <Card key={advantage.title} className="home-advantage-card h-full">
              <span className="category-icon">
                <LineIcon path={advantage.icon} />
              </span>
              <h3 className="mt-5 font-semibold text-brand">
                {advantage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {advantage.text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BrandsSection() {
  return (
    <section className="home-brands bg-surface" aria-labelledby="marcas-titulo">
      <Container className="py-12 md:py-16">
        <p
          id="marcas-titulo"
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted"
        >
          Marcas que você encontra por aqui
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["Apple", "Samsung", "Motorola", "Xiaomi"].map((brand) => (
            <div className="home-brand-name" key={brand}>
              {brand}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function LocationsSection() {
  return (
    <section
      id="unidades"
      className="home-chapter bg-background"
      aria-labelledby="unidades-titulo"
    >
      <Container className="py-16 md:py-24">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nossas unidades</p>
            <SectionTitle
              id="unidades-titulo"
              className="max-w-3xl text-3xl md:text-4xl"
            >
              Encontre uma RODE Celulares perto de você
            </SectionTitle>
            <p className="mt-3 text-muted">
              Informações demonstrativas, prontas para receber os dados reais.
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {storeUnits.map((unit, index) => (
            <Card key={unit.id} className="home-unit-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-health">
                    Unidade {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-brand">
                    {unit.name}
                  </h3>
                </div>
                <span className="category-icon shrink-0">
                  <LineIcon path="M12 21s7-6 7-12A7 7 0 1 0 5 9c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </span>
              </div>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground">Endereço</dt>
                  <dd className="mt-1 text-muted">{unit.address}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Atendimento</dt>
                  <dd className="mt-1 text-muted">{unit.hours}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {unit.locationUrl ? (
                  <a
                    href={unit.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles("secondary", "flex-1")}
                  >
                    Ver localização
                  </a>
                ) : (
                  <Button disabled variant="secondary" className="flex-1">
                    Ver localização
                  </Button>
                )}
                <a
                  href={whatsappUrl(
                    `Olá! Gostaria de falar com a ${unit.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles("whatsapp", "flex-1")}
                >
                  Falar no WhatsApp
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contato" className="home-chapter bg-surface">
      <Container className="py-16 md:py-24">
        <div className="home-whatsapp-cta">
          <div>
            <p className="eyebrow">Atendimento direto</p>
            <SectionTitle className="max-w-2xl text-3xl text-surface md:text-5xl">
              Encontrou o que procura?
            </SectionTitle>
            <p className="mt-5 max-w-xl leading-relaxed text-surface/70">
              Fale com nossa equipe pelo WhatsApp e consulte disponibilidade e
              condições.
            </p>
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles("whatsapp", "shrink-0")}
          >
            Chamar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
