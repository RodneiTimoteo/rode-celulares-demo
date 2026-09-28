"use client";

import { useCatalog } from "@/components/catalog/catalog-provider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/brand/rode-celulares-logo-horizontal.svg";
import { Container, buttonStyles } from "@/components/ui";
import { storeUnits } from "@/data/units";
import { whatsappUrl } from "@/utils/whatsapp";

function BrandLogo() {
  return (
    <Link href="/" aria-label="RODE Celulares — início" className="brand-logo">
      <Image
        src={logo}
        alt="RODE Celulares — Conectando você com o que importa."
        sizes="280px"
        loading="eager"
      />
    </Link>
  );
}
const navigation = [
  ["Início", "/#inicio"],
  ["Produtos", "/produtos"],
  ["Ofertas", "/ofertas"],
  ["Unidades", "/unidades"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
];
const footerNavigation = [
  ["Início", "/#inicio"],
  ["Produtos", "/produtos"],
  ["Ofertas", "/ofertas"],
  ["Unidades", "/unidades"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
];
export function Header() {
  const { quantidadeTotal: quantidade } = useCatalog();
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const cartHref =
    pathname === "/produtos" ? "#orcamento" : "/produtos#orcamento";
  return (
    <header className="site-header">
      <Container className="header-inner">
        <BrandLogo />
        <nav aria-label="Navegação principal" className="desktop-nav">
          {navigation.map(([label, id]) => (
            <Link key={id} href={id}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className={buttonStyles("secondary", "cart-link")}
            href={cartHref}
            aria-label={`Meu orçamento: ${quantidade} ${
              quantidade === 1 ? "item" : "itens"
            }`}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3h2l3 13h11l3-9H6M9 20h.01M18 20h.01" />
            </svg>
            <span aria-live="polite">{quantidade}</span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={aberto}
            aria-controls="mobile-nav"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto(!aberto)}
          >
            {aberto ? "✕" : "☰"}
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Navegação mobile"
          className="mobile-nav"
          hidden={!aberto}
        >
          {navigation.map(([label, id]) => (
            <Link key={id} href={id} onClick={() => setAberto(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-main">
        <div className="footer-brand">
          <BrandLogo />
          <p>Conectando você com o que importa.</p>
        </div>

        <nav aria-label="Navegação do rodapé" className="footer-column">
          <strong>Navegação</strong>
          {footerNavigation.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="footer-column">
          <strong>Atendimento</strong>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <span>Instagram · perfil a definir</span>
          <Link href="/contato">Fale conosco</Link>
        </div>

        <div className="footer-column">
          <strong>Unidades</strong>
          {storeUnits.map((unit) => (
            <Link href="/unidades" key={unit.id}>
              {unit.name} · {unit.address}
            </Link>
          ))}
        </div>
      </Container>
      <Container className="footer-bottom">
        <p>
          Projeto demonstrativo. Produtos, preços, endereços e condições devem
          ser confirmados no atendimento.
        </p>
        <p>Desenvolvido por RODE – Soluções Inteligentes</p>
      </Container>
    </footer>
  );
}
