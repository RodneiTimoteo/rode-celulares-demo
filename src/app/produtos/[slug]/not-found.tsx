import Link from "next/link";
import { Container, SectionTitle, buttonStyles } from "@/components/ui";
import { QuotePanel } from "@/components/catalog/quote-panel";
export default function ProductNotFound() {
  return (
    <main id="catalogo" className="flex-1">
      <Container className="py-16">
        <section className="ui-card py-16 text-center">
          <p className="eyebrow">Catálogo RODE Celulares</p>
          <SectionTitle as="h1" className="text-3xl">
            Produto não encontrado.
          </SectionTitle>
          <p className="mt-5 text-muted">
            Este item pode ter sido removido ou estar temporariamente
            indisponível.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/produtos" className={buttonStyles()}>
              Ver catálogo
            </Link>
            <Link href="/" className={buttonStyles("secondary")}>
              Voltar ao início
            </Link>
          </div>
        </section>
        <div className="mx-auto mt-10 max-w-3xl">
          <QuotePanel />
        </div>
      </Container>
    </main>
  );
}
