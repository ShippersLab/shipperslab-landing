# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Clients**: companies and founders who need a product designed, built or improved. They want a team that ships, not a pitch deck.
- **Community**: developers, designers, students and people starting something of their own, mainly in Santa Fe and growing across Argentina.
- **Sponsors**: any company that wants to reach people who build, whether they make tools for them, are hiring, or want to be close to what is being made. Not limited to dev tool companies.

## Product Purpose

ShippersLab is a digital studio, lab and community founded by Franco and his brother Bruno, with a small group of engineers. The name comes from "shippear" (dev slang for launching something) plus "Lab" (where you experiment). The core idea: ideas are cheap, finished things are not. This landing page exists to turn studio inquiries into conversations, and to bring people into the community and its events.

It works on three pillars that feed each other:

1. **Studio**: client work, designing and building digital products for companies and for people starting something of their own.
2. **Lab**: own products and experiments, used to test ideas, learn and stay sharp.
3. **Community**: build nights, meetups and hackathons for builders, starting in Santa Fe.

## Positioning

Services are framed by the client's moment, not by technology ("what does this solve for you"), across three areas:

- **Brand**: identity, website and materials.
- **Product**: from idea to product. Product design plus web and mobile development, and team-as-a-service.
- **Artificial intelligence**: AI inside the product, solving something concrete, not hype.

What a neighboring agency can't truthfully copy: no middlemen (clients talk directly to the engineers building it), few projects running at a time so the team stays present in each one, real weekly progress instead of end-of-engagement reports, and scope committed to writing from day one.

## Operating Context

- The landing page is a single Next.js App Router project (`shipperslab-landing`), currently one primary route (home) plus an events page.
- i18n is client-state based: one route serves both locales, a provider swaps `es`/`en` message dictionaries with no `/en` URL segment (see `src/i18n`).
- The design system lives in `.agents/DESIGN.md` (colors, type, layout, motion) and is the single source of truth for visual decisions; `src/styles/globals.css` implements it.
- Commits are conventional (`feature(topic): message`), enforced by commitlint via a git hook.

## Capabilities and Constraints

- No public client case studies yet. Never invent clients, logos, metrics, testimonials or results attributed to ShippersLab.
- Do not name specific projects or products in public copy; use neutral placeholders ("Project 01") until real work is approved for publishing.
- Events are planned, not yet held. Talk about them as what the studio organizes, not as past successes with attendance numbers.
- No formal company structure yet. Do not reference legal entities, offices or headcount beyond "a small team".
- The contact form has no backend integration yet; it is a UI/validation layer only until an email or form-handling service is wired up.

## Brand Commitments

- **Team**: a small group of working engineers. Public copy never names or profiles individuals and never presents the studio as an employer; it only states collective experience. The approved employer names for the experience strip are Mercado Libre, Coderhouse, PUMA and NFTYDoor. Do not add any other employer without explicit approval. Combined experience covers infrastructure, AWS, backend, frontend and AI, earned at large companies and on products built for clients abroad.
- **Voice**: confident, plain, direct. An established studio operating in the present tense, not a manifesto. Short sentences, active voice, plain concrete words. Say what the reader gets before saying who we are. No corporate filler ("empowering", "cutting-edge", "innovative solutions", "leverage", "synergy"), no manifestos, no superlatives that can't be backed up, no em dash.
- **Language**: Spanish first (rioplatense, "vos"), English second and written as native English, not a literal translation. Code and technical docs stay in English.
- **Phrase bank** (reusable lines): "Un lab que lanza." / "A lab that ships." · "Diseñamos y construimos productos digitales." / "We design and build digital products." · "Traé eso que tenés a medias." / "Bring the unfinished thing." · "Se hace acá." / "Built here." · "Todavía construyendo." / "Still building." · "Las ideas son baratas. Las cosas terminadas, no." / "Ideas are cheap. Finished things are not." · "Nadie se acuerda de la app que nunca se lanzó." / "Nobody remembers the app that never launched." · "Todo lo grande fue el proyecto de fin de semana de alguien." / "Every big thing was somebody's weekend project." · "Hecho en Argentina." / "Made in Argentina."
- **Presence**: domain shipperslab.tech · main contact hola@shipperslab.tech · events/sponsors eventos@shipperslab.tech · X @theshipperslab (priority for community/sponsors) · GitHub github.com/ShippersLab · event registrations via Luma.
- **Repo conventions**: `shipperslab-` prefix for internal repos; lab products carry no prefix; topics tag `internal`/`lab`/`client`; no source file over ~300 lines; agent config lives under `.claude/`/`.agents/`, never the project root (except the Next.js-owned root `AGENTS.md`).

## Evidence on Hand

- No client logos, testimonials, case studies, or event attendance numbers exist. Do not fabricate any.
- The only approved employer names are Mercado Libre, Coderhouse, PUMA and NFTYDoor, shown as a neutral experience strip. No individual names, roles or bios.
- Brand assets (logos, avatars, social graphics) live in the separate `shipperslab-brand` repo and get copied into `public/images` or `public/icons` when needed, never referenced cross-repo. Employer logos, if used, go in `public/logos`.

## Product Principles

1. Lead with the client's problem and moment, not with technology or hype, especially for AI.
2. Never fabricate proof (clients, metrics, testimonials, event history); let the studio's real, current-stage story carry the page instead.
3. Keep the "talk directly to the people building it" promise visible in how the page itself works (direct contact paths, no gatekeeping copy).
4. Community and events are a real pillar, not a footnote, and get their own space to invite sponsors and attendees honestly ("planned", not "past").
5. Spanish (vos) is the primary voice; English is a first-class translation, not an afterthought.
