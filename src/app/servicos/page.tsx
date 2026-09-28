import type { Metadata } from "next";
import { Card, Container, SectionTitle } from "@/components/ui";
import {
  InstitutionalHero,
  InstitutionalIcon,
  WhatsAppCta,
} from "@/components/institutional/shared";
export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça os serviços demonstrativos da RODE Celulares. Conteúdo fictício para apresentar a experiência de uma loja de tecnologia, sem atendimento real.",
  alternates: { canonical: "/servicos" },
};
const services = [
  {
    title: "Configuração inicial",
    icon: "digital",
    description:
      "Uma apresentação conceitual do suporte para configurar um novo aparelho.",
  },
  {
    title: "Transferência de dados",
    icon: "phone",
    description:
      "Exemplo de apoio para levar contatos e arquivos ao seu novo dispositivo.",
  },
  {
    title: "Orientação de compra",
    icon: "chat",
    description:
      "Uma proposta de contato próximo para esclarecer dúvidas sobre o atendimento.",
  },
  {
    title: "Instalação de acessórios",
    icon: "digital",
    description:
      "Demonstração de um atendimento para aplicação e ajuste de acessórios.",
  },
  {
    title: "Entrega local",
    icon: "delivery",
    description:
      "Uma experiência ilustrativa para consultar regiões, horários e condições de entrega.",
  },
  {
    title: "Atendimento pelo WhatsApp",
    icon: "phone",
    description:
      "Um caminho simples para reunir sua lista e iniciar uma conversa pelo canal digital.",
  },
] as const;
export default function ServicesPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Serviços"
        title="Mais tecnologia, mais perto de você."
        description="Conheça alguns serviços que uma loja de celulares moderna pode oferecer."
        note="Serviços apresentados neste projeto são demonstrativos e não representam atendimento real."
      />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="p-8">
              <span className="category-icon">
                <InstitutionalIcon kind={service.icon} />
              </span>
              <h2 className="mt-6 text-xl font-bold text-brand">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
        <section className="py-16">
          <p className="eyebrow">Uma jornada simples</p>
          <SectionTitle className="text-3xl">Como funciona</SectionTitle>
          <div className="mt-9 grid gap-7 md:grid-cols-3">
            {[
              "Escolha o serviço",
              "Entre em contato",
              "Confirme disponibilidade",
            ].map((text, index) => (
              <div className="step" key={text}>
                <span className="step-number">0{index + 1}</span>
                <h3 className="mt-4 font-semibold text-brand">{text}</h3>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted">
            Fluxo ilustrativo: não há agendamento ou prestação de serviços neste
            projeto.
          </p>
        </section>
        <WhatsAppCta
          title="A escolha certa começa com uma conversa."
          text="Conheça o canal demonstrativo de atendimento da RODE Celulares."
        />
      </Container>
    </main>
  );
}
