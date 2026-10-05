# ShippersLab Context

This file explains what ShippersLab is, who it is for and how it talks. Read it before writing copy, naming things, designing UI or making product decisions in any ShippersLab repository.

For visual rules (colors, type, spacing, motion) the source of truth is `DESIGN.md`. This file covers everything else.

## What ShippersLab is

ShippersLab is a digital studio, lab and community. It is a small team of engineers and designers from Argentina. Publicly only two people are named and shown: Franco (engineering) and Juani (commercial and marketing). The other members are never named or shown; in copy they are "ingenieros" inside "un equipo chico".

The name comes from "shippear", dev slang for launching something, plus "Lab", the place where you experiment. The core idea: ideas are cheap, finished things are not. ShippersLab exists to take things from idea to launched.

It works on three pillars that feed each other:

1. **Studio**: client work. We build management systems, integrations, bots and digital presence for small and mid-size businesses.
2. **Lab**: our own products and experiments. This is where we test ideas, learn and stay sharp.
3. **Community**: build nights, meetups and hackathons for people who build, starting in Santa Fe and growing across Argentina.
## Services

Services are framed by the client's moment, not by technology. Each one answers "what does this solve for you".

The four confirmed services, in this order:

1. **Sistemas de gestión a medida**: stock, orders, cash, appointments. Solves "I run this on Excel and it no longer holds". EventOps is the real example.
2. **Integraciones**: connect WhatsApp, spreadsheets, invoicing and the systems the client already uses. Solves "I don't want to change everything, I want these things to talk".
3. **Bots de WhatsApp y agentes de IA**: replaces "automatizaciones con IA". AI only where it pays off, no AI for hype.
4. **Presencia digital para comercios o emprendedores**: landings, appointment booking, catalogs. Solves "people can't find or book me".

EventOps is not a service card. It is proof in the Trust section and the example inside the first service.

## How we work

These four principles show up in copy and should shape product decisions:

- **You talk to the people building it.** No middlemen, no account managers. It is no longer a headline on the landing because it is obvious to a pyme owner. It stays as a working principle.
- **Few projects at a time.** We are small on purpose so we can be present in each one.
- **Progress every week.** Real progress, not a report at the end.
- **Scope in writing.** What's in, what's out and when, clear from day one.
## Team

Publicly only two people are named and shown: Franco (engineering) and Juani (commercial and marketing). The other members are never named or shown. In copy they are "ingenieros" inside "un equipo chico". Team description in public: "un equipo chico de ingenieros y diseñadores de Argentina". No individual bios.

Combined experience covers infrastructure, AWS, backend, frontend and AI, earned at large companies and on products built for clients abroad.

The approved employer strip is Mercado Libre, Coderhouse, PUMA and NFTYDoor. They are former employers, never clients. No other employer without explicit approval.

## Current stage

ShippersLab is new. Keep this in mind in every piece of copy and UI:

- There are no public client case studies yet. Never invent clients, logos, metrics, testimonials or results.
- EventOps (https://eventops.digital) is approved to be named in public copy as an own Lab product in production. Only claim "in production", never user counts or client names. Other projects and client work stay unnamed until approved. Use neutral placeholders ("Project 01") for them.
- Events are planned, not yet held. Talk about them as what we organize, not as past successes with attendance numbers.
- No formal company structure yet. Do not reference legal entities, offices or headcount beyond "a small team".
## Audience

- **Clients**: owners and operations managers of:
  - (a) traditional pymes of 5 to 50 employees running on Excel, WhatsApp, paper or old systems
  - (b) service companies that coordinate operations (events companies enter through EventOps)
  - (c) shops and emprendedores without a good digital presence

  The decision maker is the owner or operations lead, not an IT department. They want something that works, not a pitch deck.
- **Community**: developers, designers, students and people starting something of their own.
- **Sponsors**: any company that wants to reach people who build, whether they make tools for them, are hiring, or want to be close to what is being made. Not limited to dev tool companies.
## Positioning status

The pyme positioning is being validated in discovery talks during October to December 2026. The owner quotes and problem table in the internal positioning doc are hypotheses and must not be used as landing copy until they come up in real talks. The entry offer (free 30-minute call) is not confirmed. Do not promise it in public copy.

## Voice and tone

Confident, plain and direct. An established studio operating in the present tense, not a manifesto.

Do:
- Use short sentences and active voice
- Use plain, concrete words
- Say what the reader gets before saying who we are
- Sound like a builder talking to another builder
Do not:
- Use corporate filler: "empowering", "cutting-edge", "innovative solutions", "passionate about", "leverage", "synergy"
- Write manifestos about shipping culture
- Overpromise or use superlatives we cannot back up
- Use the em dash character anywhere. Use periods, commas or colons instead.
- Use AI-tell patterns: "no es X, es Y" reveals, "no X, no Y, no Z" lists, maxim-style closing lines.
## Language

- **Spanish first.** Local and community content is in Spanish (rioplatense, using "vos": "traé", "contanos", "hablemos").
- **English second.** Every public page supports English through i18n. English copy should read as native English, not a literal translation.
- Code, commit messages, file names and technical docs are in English.
## Phrase bank

Approved lines that can be reused in copy:

| Spanish | English |
|---|---|
| Un lab que lanza. | A lab that ships. |
| Diseñamos y construimos productos digitales. | We design and build digital products. |
| Traé eso que tenés a medias. | Bring the unfinished thing. |
| Se hace acá. | Built here. |
| Todavía construyendo. | Still building. |
| Las ideas son baratas. Las cosas terminadas, no. | Ideas are cheap. Finished things are not. |
| Nadie se acuerda de la app que nunca se lanzó. | Nobody remembers the app that never launched. |
| Todo lo grande fue el proyecto de fin de semana de alguien. | Every big thing was somebody's weekend project. |
| Hecho en Argentina. | Made in Argentina. |

## Presence

- **Domain**: shipperslab.tech
- **Main contact**: hola@shipperslab.tech
- **Events and sponsors**: eventos@shipperslab.tech
- **Instagram**: https://www.instagram.com/shipperslab/ (@shipperslab), main channel for clients
- **WhatsApp Business**: destination for client messages. Owners write on WhatsApp before email.
- **X**: @theshipperslab, paused for community until there is an event
- **Franco**: https://www.linkedin.com/in/francogalfre/ and https://x.com/francogalfredev
- **Juani**: https://www.linkedin.com/in/juanidlsdev/ and https://x.com/JuanDls01
  - Used on the landing only if a team section with faces is added (not part of EOP-64).
- **GitHub**: github.com/ShippersLab
- **Event registrations**: Luma
## Repository conventions

- Internal ShippersLab repos use the `shipperslab-` prefix: `shipperslab-landing`, `shipperslab-brand`
- Lab products use their own name with no prefix
- Topics tag each repo: `internal`, `lab`, `client`
- Commits follow conventional commits as `feature(topic): message`, with no body and no co-authored line
- No source file over roughly 300 lines. Split logic so everything stays readable.
- Agent configuration lives in subfolders (`.claude/`, `.agents/`), never in the project root
