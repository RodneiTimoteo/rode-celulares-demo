import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, SectionTitle, buttonStyles } from "@/components/ui";
import {
  InstitutionalHero,
  InstitutionalIcon,
} from "@/components/institutional/shared";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o propósito demonstrativo da RODE Celulares e sua experiência de tecnologia e atendimento próximo.",
  alternates: { canonical: "/sobre" },
};

const pillars = [
  {
    title: "Tecnologia para o dia a dia",
    text: "Produtos e soluções pensados para uma rotina mais prática e conectada.",
    icon: "digital",
  },
  {
    title: "Atendimento próximo",
    text: "Uma equipe acessível para ajudar você a encontrar o que procura.",
    icon: "chat",
  },
  {
    title: "Duas unidades",
    text: "Mais opções para escolher a unidade mais conveniente para você.",
    icon: "store",
  },
  {
    title: "Smartphones e acessórios",
    text: "Uma seleção de celulares e itens para completar sua experiência.",
    icon: "device",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Nossa marca"
        title="Sobre a RODE Celulares"
        description="Tecnologia, praticidade e atendimento para manter você conectado ao que importa."
      />
      <Container className="py-14 md:py-20">
        <section className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Nosso propósito</p>
            <SectionTitle className="text-3xl md:text-4xl">
              Tecnologia mais próxima de você
            </SectionTitle>
          </div>
          <div className="max-w-2xl space-y-5 leading-relaxed text-muted">
            <p>
              A RODE Celulares nasceu com o propósito de aproximar tecnologia,
              praticidade e atendimento de qualidade.
            </p>
            <p>
              Trabalhamos com smartphones, acessórios e soluções para manter
              você sempre conectado, com uma experiência simples desde a busca
              pelo produto até a conversa com nossa equipe.
            </p>
          </div>
        </section>

        <section className="mt-14 md:mt-20" aria-labelledby="pilares-titulo">
          <div className="section-heading">
            <div>
              <p className="eyebrow">O que você encontra</p>
              <SectionTitle id="pilares-titulo" className="text-3xl">
                Uma experiência feita para conectar
              </SectionTitle>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="h-full">
                <span className="category-icon">
                  <InstitutionalIcon kind={pillar.icon} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-brand">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-brand p-8 text-surface md:mt-20 md:p-12">
          <p className="eyebrow">Explore a RODE</p>
          <SectionTitle className="max-w-2xl text-3xl text-surface md:text-4xl">
            Encontre seu próximo smartphone ou acessório
          </SectionTitle>
          <p className="mt-4 max-w-xl leading-relaxed text-surface/70">
            Consulte o catálogo demonstrativo e fale com nossa equipe quando
            precisar.
          </p>
          <Link href="/produtos" className={buttonStyles("primary", "mt-7")}>
            Conheça nossos produtos
          </Link>
        </section>
      </Container>
    </main>
  );
}
