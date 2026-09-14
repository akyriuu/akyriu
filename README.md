# devmarcus

Portfólio de Marcus Vinícius Carneiro dos Santos — Desenvolvedor Backend (Node.js, NestJS, TypeScript, AWS).

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript.

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Estrutura

| Caminho                     | Conteúdo                                                        |
| --------------------------- | --------------------------------------------------------------- |
| `src/lib/content.ts`        | Todo o conteúdo do site em PT e EN — única fonte de verdade      |
| `src/lib/i18n.tsx`          | Troca de idioma persistida em `localStorage`                     |
| `src/components/cube.tsx`   | Cubo 3×3 interativo em CSS 3D (arraste, clique, teclas R U F L D B) |
| `src/app/page.tsx`          | Home                                                            |
| `src/app/resume/page.tsx`   | Currículo em HTML, com download do PDF                          |
| `public/`                   | PDF do currículo servido em `/marcus-vinicius-backend.pdf`      |

Para atualizar textos, números ou projetos, edite apenas `src/lib/content.ts`.

## Deploy

`NEXT_PUBLIC_SITE_URL` define a URL base usada em metadata, `sitemap.xml` e `robots.txt`.
Todas as rotas são pré-renderizadas estaticamente.
