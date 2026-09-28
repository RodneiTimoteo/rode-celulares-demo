# RODE Celulares

Projeto demonstrativo de uma experiência digital para uma loja de celulares e
tecnologia, desenvolvido pela RODE Soluções Inteligentes. O site reúne catálogo,
busca, categorias, lista de orçamento e integração com WhatsApp.

Produtos, serviços, endereços e contatos apresentados são fictícios. O projeto
não realiza vendas nem representa uma loja real.

## Desenvolvimento

Instale as dependências e inicie o servidor local:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Validações disponíveis:

```bash
npm run lint
npm run build
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e configure quando necessário:

- `NEXT_PUBLIC_SITE_URL`: URL pública absoluta do deploy, sem caminho e,
  preferencialmente, sem barra final. Exemplo: `https://www.exemplo.com.br`.
  É obrigatória em produção para canonicals, Open Graph, robots, sitemap e
  JSON-LD apontarem para o domínio correto.
- `NEXT_PUBLIC_PRODUCTS_API_URL`: endpoint público do Google Apps Script que
  retorna o catálogo em JSON. É obrigatório e não possui fallback local.

Não versione `.env.local`. O arquivo já está coberto pelo `.gitignore`.

## Deploy

O projeto pode ser publicado em uma plataforma compatível com Next.js 16.

1. Configure `NEXT_PUBLIC_SITE_URL` com o domínio final em HTTPS.
2. Configure `NEXT_PUBLIC_PRODUCTS_API_URL` com o endpoint público do catálogo.
3. Garanta que o Google Apps Script esteja publicado para leitura pública e
   retorne JSON com o formato esperado pelo projeto.
4. Execute `npm install` e `npm run build` no pipeline de produção.
5. Inicie a aplicação com `npm run start` quando a plataforma não administrar
   esse processo automaticamente.

O sitemap tenta carregar os produtos da API para incluir as páginas dinâmicas.
Se a API estiver indisponível, ele mantém as páginas estáticas e não interrompe
o build. Antes de publicar, valide `/robots.txt`, `/sitemap.xml`, uma página de
produto e a imagem social no domínio definitivo.

Sem `NEXT_PUBLIC_SITE_URL` durante um build de produção, o projeto usa o domínio
reservado `https://rodecelulares.example` apenas como fallback técnico. Esse fallback
não deve ser usado em um deploy público.
