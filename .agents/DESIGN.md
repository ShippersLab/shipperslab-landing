# DESIGN.md

Design system and agent rules for the ShippersLab landing page. This is the single source of truth — for every visual decision and for how any agent (Claude, Codex, or otherwise) is expected to work in this repo. `.claude/CLAUDE.md` and `.agents/AGENTS.md` both point here instead of repeating it. The Tailwind theme (`src/styles/globals.css`) implements exactly what is written here — if they ever disagree, this file wins and the CSS gets fixed.

## Colors

| Token    | Value     | Tailwind utility (examples)         | Usage                                    |
| -------- | --------- | ------------------------------------ | ----------------------------------------- |
| `accent` | `#FE5634` | `bg-accent`, `text-accent`, `border-accent` | CTAs and a small number of accents. **Restricted: must not appear more than 5 times on the page.** |
| `ink`    | `#0B0F1A` | `bg-ink`, `text-ink`                 | Primary text.                             |
| `paper`  | `#F2F3F5` | `bg-paper`, `text-paper`             | Page background.                          |
| `muted`  | `#6E7686` | `text-muted`                         | Secondary text.                           |
| `border` | `#E0E3E9` | `border-border`                      | Hairline borders.                         |

No other colors are introduced without updating this table first.

## Typography

| Role                         | Font        | Weight | Tracking   | Size                          | Line height | Tailwind utility        |
| ----------------------------- | ----------- | ------ | ---------- | ------------------------------ | ----------- | ------------------------ |
| Section titles                | Geist Pixel | 500    | `-0.01em`  | —                               | —           | `font-heading tracking-heading` (applied by default to `h1`/`h2`/`h3`) |
| Hero                           | Geist Pixel | 500    | `-0.04em`  | `clamp(48px, 8vw, 96px)`       | 0.95        | `font-pixel-circle tracking-hero text-hero` |
| Body                           | Geist       | 400    | normal     | 16–18px                        | 1.6         | `font-sans text-base` / `text-lg` |
| Labels / technical details     | Geist Mono  | 500    | `0.12em`, uppercase | 11px                | 1.4         | `font-mono uppercase tracking-label text-label` |

Nunito is not used anywhere on the landing. Geist Pixel is the only display face: section titles use the plain `font-pixel` axis (`ELSH 1`, most legible at heading sizes) through the shared `font-heading` token, and the hero keeps its heavier `font-pixel-circle` axis (`ELSH 20`) as its one dedicated display treatment. Don't reach for the heavier pixel axes (`font-pixel-grid`, `font-pixel-triangle`, `font-pixel-line`) outside of the hero — they read as decoration at smaller sizes.

A headline can pick up a subtle print-grain texture instead of a flat fill with the `text-grain` utility (`src/styles/globals.css`): it clips a noise pattern to the text using `background-clip: text`. Use it sparingly, on a single short headline at a time, never on body copy or the labels role — texture competes with the 11px size there.

## Layout

- Content max-width: **1200px** — `max-w-content`.
- Vertical section padding: **140px on desktop** — `py-section`.
- Borders are **1px**, and boxes are **never** shadowed. `shadow-*` utilities resolve to `none`; if a shape needs separation, give it a `border-border` instead.
- Border radius tops out at **8px**. The `rounded-*` scale (`xs` through `4xl`) is clamped so nothing in the app can round past 8px.
- `accent` is a spotlight color, not a brand wash: budget its five uses deliberately across the page (the primary CTAs in the nav, hero and contact form, plus the two mid-page "talk to us" prompts that shorten the path to an email).

## Motion

- GSAP is the animation library. Scroll-triggered reveals go through `ScrollTrigger` (or a plain `IntersectionObserver` for the simplest cases) — never a scroll listener that runs on every frame. An element starts hidden/offset and animates to its resting state once, when it crosses the viewport threshold.
- Photographic/illustrated images resolve from a soft blur into focus (fade + `filter: blur()` to `0`) instead of scaling or sliding in. Abstract UI illustrations (the kind built from divs, not images) build themselves in with a small stagger instead.
- Hovers transition over **200ms** (`duration-200`) with a standard ease.
- Every animation and transition respects `prefers-reduced-motion`. `globals.css` collapses all animation/transition durations to near-zero for users who request reduced motion, and any GSAP timeline must check `window.matchMedia("(prefers-reduced-motion: reduce)")` (or `gsap.matchMedia()`) and skip straight to the end state instead of bypassing it.

## Rules

These apply to every agent working in this repo, not just UI work.

- **Never leave comments in code.** No line comments, no block comments, no JSDoc, no commented-out code. If something feels like it needs a comment, rename it or extract it into a function whose name says the surprising part.
- **Always import through the `@/*` alias.** Never write a relative import (`./`, `../`), not even for a sibling file. `@/*` resolves to `src/*` and is declared once in `tsconfig.json`.
- **Everything lives in a folder that says what it is.** Landing sections go in `src/components/sections`, reusable primitives in `src/components/ui`, cross-cutting helpers in `src/lib`, copy in `src/i18n/messages`. Don't drop a component or helper loose in `src/app` or `src/components`.
- **No file exceeds 300 lines.** Split into a folder of smaller files before it gets there.
- **Agent configuration lives in subfolders, never loose in the project root.** This file, skills, and any future agent docs live under `.agents/` or `.claude/`. The root `AGENTS.md` is the one exception — Next.js's dev server owns and regenerates it in place, so it cannot be relocated.
- **Commits are conventional, one line, no body:**

  ```
  feature(topic): short description
  ```

  No description beyond the subject line, no bullet list, no "Co-authored-by" line. `topic` is the area touched (`hero`, `pricing`, `i18n`, `design`, …). `commitlint` enforces the allowed types on every commit via a git hook.

## Source of truth

Tailwind tokens live in `src/styles/globals.css` under `@theme inline`, and font loading lives in `src/lib/fonts.ts`. Component-level styling uses these tokens through Tailwind utilities only — no inline styles, no ad hoc hex values, no arbitrary values (`w-[13px]`) when a token already covers the case.

## Brand assets

Logos, avatars, and social graphics are maintained in the separate `shipperslab-brand` repository, not here. When a brand asset is needed in the landing page, copy the exported file into `public/images` (content) or `public/icons` (icons, favicons) — never reference the sibling repo's path directly, since it won't exist in deployment.
