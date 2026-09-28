import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionTitle, buttonStyles } from "@/components/ui";
import {
  InstitutionalHero,
  WhatsAppCta,
} from "@/components/institutional/shared";
import { OfferSelections } from "@/components/institutional/offer-selections";

export const metadata: Metadata = {
  title: "Ofertas",
  description:
    "Confira produtos em destaque da RODE Celulares e consulte condições pelo WhatsApp.",
  alternates: { canonical: "/ofertas" },
};

export default function OffersPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Seleção RODE"
        title="Ofertas em destaque"
        description="Confira alguns dos produtos que separamos para você. Consulte valores e condições com nossa equipe."
      />
      <Container className="py-14 md:py-20">
        <section aria-labelledby="ofertas-produtos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Produtos selecionados</p>
              <SectionTitle
                id="ofertas-produtos"
                className="text-3xl md:text-4xl"
              >
                Oportunidades para ficar conectado
              </SectionTitle>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                Preços e condições são demonstrativos e devem ser confirmados
                diretamente no atendimento.
              </p>
            </div>
            <Link href="/produtos" className={buttonStyles("secondary")}>
              Ver todos os produtos
            </Link>
          </div>
          <OfferSelections />
        </section>

        <div className="mt-16 md:mt-24">
          <WhatsAppCta
            title="Quer saber as condições?"
            text="Fale com nossa equipe pelo WhatsApp e consulte disponibilidade, valores e formas de pagamento."
          />
        </div>
      </Container>
    </main>
  );
}
