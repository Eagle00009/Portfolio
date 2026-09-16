# Jeevesh's portfolio with thumbnail carousel

Working copy of the Desktop portfolio, migrated to Next.js App Router, React, TypeScript and Tailwind CSS 4. The existing sections are preserved in `content/*.html`, assets in `public/`, and existing interactions in `public/portfolio.js`.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000/#gallery. Validate with `npm run build` and `npm run typecheck`.

## Component and styles

- `components/ui/thumbnail-carousel.tsx`: reusable carousel; optional `images: {src, alt}[]` and `autoDelay` props (5000 ms by default; 0 disables autoplay).
- `components/ui/demo.tsx`: requested standalone demo.
- `components/ui/name-portal.tsx`: opening animation with Jeevesh Singh's name.
- `components/ui/glyph-portal-demo.tsx`: separate BUILD animation after Projects.
- `components/ui/glyph-portal.tsx`: supplied scroll-driven type component, with its MIT attribution retained. Includes a direct entry link and reduced-motion fallback.
- `components/ui/theme-toggle.tsx`: light/dark control in the header, persistent browser preference, and first-visit system preference.
- `lib/gallery.ts`: the personal photo gallery and descriptive alt text.
- `app/page.tsx`: composes the name introduction, portfolio sections, BUILD, and gallery.
- `app/globals.css`: compiled Tailwind and original portfolio styles.
- `components.json`: shadcn aliases; `@/components/ui` is the shared UI directory. This convention keeps CLI-generated components and imports consistent; it is not a React requirement.

No context provider or global state is needed. The carousel uses local React state and Framer Motion hooks. The portfolio uses edited personal photos in `public/gallery`; Unsplash defaults remain in the standalone carousel demo. Replace `personalPhotos` to change the portfolio gallery. Local paths must start with `/`; additional remote hosts require `next.config.ts` configuration.

The personal gallery uses a responsive 4:3 frame up to 672px wide, preserving the complete image inside it. Thumbnails scroll horizontally. Supports touch drag, thumbnail selection, previous/next buttons, arrow keys, play/pause, reduced motion and pauses while interacting or while the tab is hidden.

## shadcn setup reference

This project is already manually configured. For a fresh equivalent scaffold:

```sh
npx create-next-app@latest portfolio --typescript --tailwind --app --import-alias "@/*"
cd portfolio
npx shadcn@latest init
npm install framer-motion lucide-react
```

Choose no `src/` directory to match this project's root-level `components/ui` and `app/globals.css`. To add a shadcn component here, run `npx shadcn@latest add button`.

References: https://nextjs.org/docs/app/getting-started/installation, https://tailwindcss.com/docs/installation/framework-guides/nextjs, https://ui.shadcn.com/docs/components-json.

## Chatbot and deployment

The original page exposed an API key. Rotate that key. Set a replacement `GEMINI_API_KEY` in `.env.local` and in Vercel environment settings; never use a `NEXT_PUBLIC_` key. The new `/api/chat` route keeps it server-side. Chat is unavailable until configured. AI replies are rendered as escaped plain text. Before enabling public chat, add request limits appropriate to your hosting/account.

Deployment uses Vercel's Next.js framework preset and `next build`, configured in `vercel.json`. The original Desktop folder remains untouched.
