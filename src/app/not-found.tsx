import Image from "next/image";
import Link from "next/link";
import symbol from "../../public/brand/rode-celulares-symbol.svg";
import { Container, SectionTitle, buttonStyles } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <Container className="py-16 md:py-24">
        <section className="ui-card mx-auto max-w-3xl py-12 text-center md:py-16">
          <div className="mx-auto mb-7 flex h-28 w-28 items-center justify-center rounded-full bg-health-soft">
            <Image
              src={symbol}
              alt="Símbolo RODE Celulares"
              width={76}
              sizes="76px"
              loading="eager"
            />
          </div>
          <p className="eyebrow">404</p>
          <SectionTitle as="h1" className="text-3xl md:text-4xl">
            Essa página não foi encontrada.
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            O endereço pode ter mudado ou o conteúdo pode não estar mais
            disponível.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={buttonStyles()}>
              Voltar ao início
            </Link>
            <Link href="/produtos" className={buttonStyles("secondary")}>
              Explorar produtos
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
