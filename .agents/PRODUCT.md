# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Clients**: owners and operations managers of (a) traditional pymes of 5 to 50 employees running on Excel, WhatsApp, paper or old systems, (b) service companies that coordinate operations (events companies enter through EventOps), (c) shops and emprendedores without a good digital presence. The decision maker is the owner or operations lead, not an IT department.
- **Community**: developers, designers, students and people starting something of their own, mainly in Santa Fe and growing across Argentina.
- **Sponsors**: any company that wants to reach people who build, whether they make tools for them, are hiring, or want to be close to what is being made. Not limited to dev tool companies.

## Product Purpose

ShippersLab is a digital studio, lab and community: a small team of engineers and designers from Argentina. The name comes from "shippear" (dev slang for launching something) plus "Lab" (where you experiment). The core idea: ideas are cheap, finished things are not. This landing page exists to turn pyme inquiries into conversations (first by WhatsApp or the form), and to bring people into the community and its events.

It works on three pillars that feed each other:

1. **Studio**: client work, building management systems, integrations, bots and digital presence for small and mid-size businesses.
2. **Lab**: own products and experiments, used to test ideas, learn and stay sharp.
3. **Community**: build nights, meetups and hackathons for builders, starting in Santa Fe.

## Positioning

Services are framed by the client's moment, not by technology ("what does this solve for you"), across four services in this order:

- **Sistemas de gestión a medida**: stock, orders, cash, appointments. EventOps is the real example.
- **Integraciones**: connect WhatsApp, spreadsheets, invoicing and the systems they already use.
- **Bots de WhatsApp y agentes de IA**: AI only where it pays off, not hype.
- **Presencia digital para comercios o emprendedores**: landings, appointment booking, catalogs.

EventOps is not a service card. It is proof in the Trust section and the example inside the first service.

What a neighboring agency can't truthfully copy: few projects running at a time so the team stays present in each one, real weekly progress instead of end-of-engagement reports, and scope committed to writing from day one, and direct contact with the people building it.

## Operating Context

- The landing page is a single Next.js App Router project (`shipperslab-landing`), currently one primary route (home) plus an events page.
- i18n is client-state based: one route serves both locales, a provider swaps `es`/`en` message dictionaries with no `/en` URL segment (see `src/i18n`).
- The design system lives in `.agents/DESIGN.md` (colors, type, layout, motion) and is the single source of truth for visual decisions; `src/styles/globals.css` implements it.
- Commits are conventional (`feature(topic): message`), enforced by commitlint via a git hook.

## Capabilities and Constraints

- No public client case studies yet. Never invent clients, logos, metrics, testimonials or results attributed to ShippersLab.
- EventOps (https://eventops.digital) is approved to be named in public copy as an own Lab product in production. Only claim "in production", never user counts or client names. Other projects and client work stay unnamed until approved ("Project 01" placeholders).
- The pyme positioning is being validated in discovery talks during October to December 2026. The owner quotes and problem table in the internal positioning doc are hypotheses and must not be used as landing copy until they come up in real talks. The free 30-minute call is not confirmed; do not promise it in public copy.
- Events are planned, not yet held. Talk about them as what the studio organizes, not as past successes with attendance numbers.
- No formal company structure yet. Do not reference legal entities, offices or headcount beyond "a small team".
- The contact form and the onboarding flow send email through Resend (`src/lib/email`, `src/app/api/contact`, `src/app/api/onboarding`). The contact form also offers a WhatsApp handoff.

## Brand Commitments

- **Team**: a small team of engineers and designers from Argentina. Franco (engineering) and Juani (commercial and marketing) can be named and shown. The other members are never named or shown; in copy they are "ingenieros" inside "un equipo chico". No individual bios. The approved employer names for the experience strip are Mercado Libre, Coderhouse, PUMA and NFTYDoor, always former employers, never clients. Do not add any other employer without explicit approval. Combined experience covers infrastructure, AWS, backend, frontend and AI, earned at large companies and on products built for clients abroad.
- **Voice**: confident, plain, direct. An established studio operating in the present tense, not a manifesto. Short sentences, active voice, plain concrete words. Say what the reader gets before saying who we are. No corporate filler ("empowering", "cutting-edge", "innovative solutions", "leverage", "synergy"), no manifestos, no superlatives that can't be backed up, no em dash, no AI-tell patterns ("no es X, es Y" reveals, "no X, no Y, no Z" lists, maxim-style closing lines).
- **Language**: Spanish first (rioplatense, "vos"), English second and written as native English, not a literal translation. Code and technical docs stay in English.
- **Phrase bank** (reusable lines): "Un lab que lanza." / "A lab that ships." · "Diseñamos y construimos productos digitales." / "We design and build digital products." · "Traé eso que tenés a medias." / "Bring the unfinished thing." · "Se hace acá." / "Built here." · "Todavía construyendo." / "Still building." · "Las ideas son baratas. Las cosas terminadas, no." / "Ideas are cheap. Finished things are not." · "Nadie se acuerda de la app que nunca se lanzó." / "Nobody remembers the app that never launched." · "Todo lo grande fue el proyecto de fin de semana de alguien." / "Every big thing was somebody's weekend project." · "Hecho en Argentina." / "Made in Argentina."
- **Presence**: domain shipperslab.tech · main contact hola@shipperslab.tech · events/sponsors eventos@shipperslab.tech · Instagram @shipperslab (https://www.instagram.com/shipperslab/, main channel for clients) · WhatsApp Business (where client messages land) · X @theshipperslab (paused for community until there is an event) · GitHub github.com/ShippersLab · event registrations via Luma.
- **Repo conventions**: `shipperslab-` prefix for internal repos; lab products carry no prefix; topics tag `internal`/`lab`/`client`; no source file over ~300 lines; agent config lives under `.claude/`/`.agents/`, never the project root (except the Next.js-owned root `AGENTS.md`).

## Evidence on Hand

- No client logos, testimonials, case studies, or event attendance numbers exist. Do not fabricate any.
- EventOps (https://eventops.digital) is the one own product in production that can be shown.
- The only approved employer names are Mercado Libre, Coderhouse, PUMA and NFTYDoor, shown as a neutral experience strip of former employers. Only Franco and Juani may be named or shown; no bios.
- Brand assets (logos, avatars, social graphics) live in the separate `shipperslab-brand` repo and get copied into `public/images` or `public/icons` when needed, never referenced cross-repo. Employer logos, if used, go in `public/logos`.

## Product Principles

1. Lead with the client's problem and moment, not with technology or hype, especially for AI.
2. Never fabricate proof (clients, metrics, testimonials, event history); let the studio's real, current-stage story carry the page instead.
3. Keep direct access to the people building it visible in how the page works (direct contact paths, no gatekeeping copy). It is no longer a headline, because it is obvious to a pyme owner.
4. Community and events are a real pillar, not a footnote, and get their own space to invite sponsors and attendees honestly ("planned", not "past").
5. Spanish (vos) is the primary voice; English is a first-class translation, not an afterthought.
