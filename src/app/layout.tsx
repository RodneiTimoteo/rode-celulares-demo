import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { CatalogProvider } from "@/components/catalog/catalog-provider";
import { Header, Footer } from "@/components/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, getSiteUrl } from "@/utils/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "RODE Celulares | Smartphones, acessórios e tecnologia",
    template: "%s | RODE Celulares",
  },
  description:
    "Conheça a RODE Celulares: smartphones, acessórios e tecnologia com atendimento próximo e orçamento pelo WhatsApp.",
  applicationName: "RODE Celulares",
  authors: [
    {
      name: "RODE Soluções Inteligentes",
      url: "https://rodesolucoes.com.br",
    },
  ],
  creator: "RODE Soluções Inteligentes",
  publisher: "RODE Soluções Inteligentes",
  keywords: ["smartphones", "celulares", "acessórios", "tecnologia", "ofertas"],
  icons: {
    icon: [{ url: "/brand/rode-celulares-symbol.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/rode-celulares-symbol.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "RODE Celulares",
    title: "RODE Celulares | Smartphones, acessórios e tecnologia",
    description: "Conectando você com o que importa.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "RODE Celulares | Smartphones, acessórios e tecnologia",
    description: "Conectando você com o que importa.",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  const siteUrl = absoluteUrl("/");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "RODE Celulares",
        alternateName: "RODE Celulares e Tecnologia",
        description:
          "Loja demonstrativa de smartphones, acessórios e tecnologia.",
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "RODE Celulares",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/rode-celulares-logo-horizontal.svg"),
        },
        description:
          "Marca fictícia e projeto conceitual desenvolvido pela RODE Soluções Inteligentes para demonstrar uma experiência digital de celulares e tecnologia.",
      },
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={structuredData} />
        <a href="#catalogo" className="skip-link">
          Pular para o conteúdo
        </a>
        <CatalogProvider>
          <Header />
          {children}
          <Footer />
        </CatalogProvider>
      </body>
    </html>
  );
}
