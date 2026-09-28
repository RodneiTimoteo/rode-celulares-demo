import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, SectionTitle, buttonStyles } from "@/components/ui";
import {
  InstitutionalHero,
  InstitutionalIcon,
} from "@/components/institutional/shared";
import { ContactForm } from "@/components/institutional/contact-form";
import { storeUnits } from "@/data/units";
import { whatsappUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe da RODE Celulares pelo WhatsApp ou consulte os canais demonstrativos de atendimento.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Atendimento RODE"
        title="Fale com a gente"
        description="Escolha a melhor forma de entrar em contato com nossa equipe."
      />
      <Container className="py-14 md:py-20">
        <section aria-labelledby="canais-titulo">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Canais de atendimento</p>
              <SectionTitle id="canais-titulo" className="text-3xl">
                Estamos prontos para conversar
              </SectionTitle>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="contact-channel-card">
              <span className="category-icon">
                <InstitutionalIcon kind="chat" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-brand">WhatsApp</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Consulte produtos, disponibilidade e condições com a equipe.
              </p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-semibold text-health"
              >
                Iniciar conversa ↗
              </a>
            </Card>
            <Card className="contact-channel-card">
              <span className="category-icon">
                <InstitutionalIcon kind="phone" />
              </span>
              <h2 className="mt-5 text-lg font-bold text-brand">Instagram</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Perfil a definir. O link será adicionado quando o canal oficial
                estiver cadastrado.
              </p>
            </Card>
            {storeUnits.map((unit) => (
              <Card key={unit.id} className="contact-channel-card">
                <span className="category-icon">
                  <InstitutionalIcon kind="location" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-brand">
                  {unit.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {unit.address} · {unit.hours}
                </p>
                <Link
                  href="/unidades"
                  className="mt-5 inline-block text-sm font-semibold text-health"
                >
                  Ver unidade ↗
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 grid items-start gap-10 md:mt-20 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Mensagem demonstrativa</p>
            <SectionTitle className="text-3xl md:text-4xl">
              Conte como podemos ajudar
            </SectionTitle>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Este formulário não envia dados. Para atendimento, utilize o
              WhatsApp como canal principal.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("whatsapp", "mt-7")}
            >
              Falar no WhatsApp
            </a>
          </div>
          <ContactForm />
        </section>
      </Container>
    </main>
  );
}
