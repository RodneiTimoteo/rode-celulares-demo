import Link from "next/link";
import { Container, SectionTitle, buttonStyles } from "@/components/ui";
import { whatsappUrl } from "@/utils/whatsapp";

export function InstitutionalHero({
  eyebrow,
  title,
  description,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
}) {
  return (
    <section className="institutional-hero">
      <Container className="py-12 md:py-16">
        <Link
          href="/"
          className="mb-8 inline-block text-xs text-muted hover:text-health"
        >
          ← Início
        </Link>
        <p className="eyebrow">{eyebrow}</p>
        <SectionTitle as="h1" className="max-w-3xl text-3xl md:text-5xl">
          {title}
        </SectionTitle>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
        {note && (
          <p className="mt-5 max-w-2xl text-xs leading-relaxed text-muted">
            {note}
          </p>
        )}
      </Container>
    </section>
  );
}
export function InstitutionalIcon({
  kind,
}: {
  kind:
    | "pressure"
    | "drop"
    | "chat"
    | "injection"
    | "delivery"
    | "phone"
    | "heart"
    | "search"
    | "digital"
    | "location"
    | "store"
    | "device";
}) {
  const paths = {
    pressure: "M4 17a9 9 0 1 1 16 0M12 12l4-5M7 19h10M4 10h2m12 0h2M12 3v2",
    drop: "M12 3C9 8 5 11 5 15a7 7 0 0 0 14 0c0-4-4-7-7-12ZM12 12v6m-3-3h6",
    chat: "M4 3h16v13H9l-5 5V3ZM8 7h8m-8 5h5",
    injection:
      "M14 3l7 7m-5-5-3 3m6-1-3 3M11 6l7 7M12 7l-8 8v5h5l8-8M4 20l-2 2m7-11 3 3",
    delivery:
      "M2 5h12v13H2V5Zm12 5h4l4 5v3h-8M5 18a2 2 0 1 0 4 0m8 0a2 2 0 1 0 4 0",
    phone:
      "M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4c0 3-5 2-8 0A21 21 0 0 1 5 11C3 8 2 3 5 3Z",
    heart: "M12 21S3 16 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 12-9 12Z",
    search: "M10 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm5 12 6 6",
    digital: "M5 3h14v18H5V3Zm4 4h6m-3 10h.01M8 11h8",
    location:
      "M12 21s7-6 7-12A7 7 0 1 0 5 9c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    store:
      "M4 10v11h16V10M3 10l2-7h14l2 7M7 21v-6h4v6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0",
    device: "M7 2h10a2 2 0 0 1 2 2v16H5V4a2 2 0 0 1 2-2Zm3 3h4m-3 12h2",
  };
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
      <path d={paths[kind]} />
    </svg>
  );
}
export function WhatsAppCta({
  title = "Vamos conversar?",
  text,
}: {
  title?: string;
  text: string;
}) {
  return (
    <section className="final-cta">
      <p className="eyebrow">
        RODE Celulares · Conectando você com o que importa
      </p>
      <SectionTitle className="text-3xl">{title}</SectionTitle>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{text}</p>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles("whatsapp", "mt-7")}
      >
        Falar pelo WhatsApp
      </a>
    </section>
  );
}
