import type { Metadata } from "next";
import { Container, SectionTitle } from "@/components/ui";
import { InstitutionalHero } from "@/components/institutional/shared";
import { UnitCards } from "@/components/institutional/unit-cards";

export const metadata: Metadata = {
  title: "Unidades",
  description:
    "Conheça as unidades demonstrativas da RODE Celulares e fale com nossa equipe pelo WhatsApp.",
  alternates: { canonical: "/unidades" },
};

export default function UnitsPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="RODE perto de você"
        title="Nossas unidades"
        description="Escolha a unidade mais conveniente para você e fale com nossa equipe."
      />
      <Container className="py-14 md:py-20">
        <UnitCards />

        <section className="mt-14 md:mt-20" aria-labelledby="mapa-futuro">
          <div className="institutional-map-placeholder">
            <span className="category-icon">
              <MapIcon />
            </span>
            <div>
              <p className="eyebrow">Localização</p>
              <SectionTitle id="mapa-futuro" className="text-2xl md:text-3xl">
                Espaço preparado para o mapa
              </SectionTitle>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                As localizações serão exibidas aqui quando os endereços e links
                oficiais das unidades forem cadastrados.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

function MapIcon() {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6.5 9 3l6 3.5L20 3v14.5L15 21l-6-3.5L4 21V6.5Zm5-3.5v14.5M15 6.5V21" />
    </svg>
  );
}
