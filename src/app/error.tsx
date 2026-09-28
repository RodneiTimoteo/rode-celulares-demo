"use client";

import Link from "next/link";
import { Button, Container, SectionTitle, buttonStyles } from "@/components/ui";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <Container className="py-16 md:py-24">
        <section role="alert" className="ui-card mx-auto max-w-3xl py-12 text-center md:py-16">
          <p className="eyebrow">RODE Celulares</p>
          <SectionTitle as="h1" className="text-3xl md:text-4xl">
            Algo não saiu como esperado.
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Tente novamente ou volte para o catálogo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => retry()}>Tentar novamente</Button>
            <Link href="/produtos" className={buttonStyles("secondary")}>
              Ver produtos
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
