# ExoFlex Website

Marketing site for [ExoFlex](https://www.exoflex.ca) — motorized stretching and
rehabilitation devices. Built with [Next.js][nextjs] (App Router),
[Tailwind CSS][tailwind], [GSAP][gsap] and [react-three-fiber][r3f].

Content is written directly in the code — there is no CMS.

## Quick start

```sh
npm install
npm run dev
```

The site runs at <http://localhost:3000>.

## Scripts

| Script           | What it does                 |
| ---------------- | ---------------------------- |
| `npm run dev`    | Dev server (Turbopack)       |
| `npm run build`  | Production build             |
| `npm start`      | Serve the production build   |
| `npm run lint`   | ESLint                       |
| `npm run format` | Prettier over the whole repo |

## Project layout

- `src/app/` — routes. `page.tsx` is the homepage; `team/`, `contact/` and the
  legal pages (`privacy/`, `terms/`, `confidentialite/`, `conditions/`) are
  static pages. `api/hubspot/` proxies contact-form submissions to HubSpot.
- `src/sections/` — the homepage sections, in render order: `Hero`,
  `FadeInText`, `AlternativeText`, `Interface`. Each one holds its own copy as
  constants at the top of the file.
- `src/components/` — shared UI (header, nav, footer, forms, 3D canvas).
- `src/lib/nav.ts` — the header/mobile-nav links.
- `public/` — videos, posters, interface screenshots, team photos, the 3D model.

## Editing content

| What                      | Where                                            |
| ------------------------- | ------------------------------------------------ |
| Homepage copy             | the `const` blocks in `src/sections/*/index.tsx` |
| Navigation links          | `src/lib/nav.ts`                                 |
| Team members              | the `team` array in `src/app/team/page.tsx`      |
| Address, phone, socials   | `src/components/Footer.tsx`                      |
| Page titles / OG metadata | the `metadata` export in each `page.tsx`         |

Images and videos live in `public/`; reference them by path (e.g.
`/images/team/felix-roy.jpg`).

## Environment

`NEXT_PUBLIC_SITE_URL` (optional) — the canonical origin used to resolve Open
Graph image URLs. Defaults to `https://www.exoflex.ca`.

## License

Apache-2.0. See [LICENSE](./LICENSE).

[nextjs]: https://nextjs.org/
[tailwind]: https://tailwindcss.com/
[gsap]: https://gsap.com/
[r3f]: https://r3f.docs.pmnd.rs/
