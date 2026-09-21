# ShippersLab Context

This file explains what ShippersLab is, who it is for and how it talks. Read it before writing copy, naming things, designing UI or making product decisions in any ShippersLab repository.

For visual rules (colors, type, spacing, motion) the source of truth is `DESIGN.md`. This file covers everything else.

## What ShippersLab is

ShippersLab is a digital studio, lab and community from Santa Fe, Argentina. It was founded by Franco and his brother Bruno, together with a small group of engineers.

The name comes from "shippear", dev slang for launching something, plus "Lab", the place where you experiment. The core idea: ideas are cheap, finished things are not. ShippersLab exists to take things from idea to launched.

It works on three pillars that feed each other:

1. **Studio**: client work. We design and build digital products for companies and for people starting something of their own.
2. **Lab**: our own products and experiments. This is where we test ideas, learn and stay sharp.
3. **Community**: build nights, meetups and hackathons for people who build, starting in Santa Fe and growing across Argentina.
## Services

Services are framed by the client's moment, not by technology. Each one answers "what does this solve for you".

- **Brand**: identity, website and materials. So what you do looks like what it is.
- **Product**: from idea to product. Product design plus web and mobile development, and team-as-a-service for companies that need extra hands.
- **Artificial intelligence**: AI inside the product, solving something concrete. Not for hype, for use.
We build new products from scratch and we improve products that already exist.

## How we work

These four principles show up in copy and should shape product decisions:

- **You talk to the people building it.** No middlemen, no account managers.
- **Few projects at a time.** We are small on purpose so we can be present in each one.
- **Progress every week.** Real progress, not a report at the end.
- **Scope in writing.** What's in, what's out and when, clear from day one.
## Team

Four people, all working engineers:

- **Franco**: Full Stack Engineer. Studies Artificial Intelligence Engineering at UNL.
- **Bruno**: Staff Engineer with experience at large tech companies.
- Two more engineers who work for European companies.
Combined experience covers infrastructure, AWS, backend, frontend and AI, earned at large companies and on products built for clients abroad.

Public copy never names individuals, roles or bios. It states collective experience and may show the approved employer strip: Mercado Libre, Coderhouse, PUMA and NFTYDoor. No other employer without explicit approval.

## Current stage

ShippersLab is new. Keep this in mind in every piece of copy and UI:

- There are no public client case studies yet. Never invent clients, logos, metrics, testimonials or results.
- Do not name specific projects or products in public copy. Use neutral placeholders ("Project 01") until real work is approved for publishing.
- Events are planned, not yet held. Talk about them as what we organize, not as past successes with attendance numbers.
- No formal company structure yet. Do not reference legal entities, offices or headcount beyond "a small team".
## Audience

- **Clients**: companies and founders who need a product designed, built or improved. They want a team that ships, not a pitch deck.
- **Community**: developers, designers, students and people starting something of their own.
- **Sponsors**: any company that wants to reach people who build, whether they make tools for them, are hiring, or want to be close to what is being made. Not limited to dev tool companies.
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
- **X**: @theshipperslab (priority channel for community and sponsors)
- **GitHub**: github.com/ShippersLab
- **Event registrations**: Luma
## Repository conventions

- Internal ShippersLab repos use the `shipperslab-` prefix: `shipperslab-landing`, `shipperslab-brand`
- Lab products use their own name with no prefix
- Topics tag each repo: `internal`, `lab`, `client`
- Commits follow conventional commits as `feature(topic): message`, with no body and no co-authored line
- No source file over roughly 300 lines. Split logic so everything stays readable.
- Agent configuration lives in subfolders (`.claude/`, `.agents/`), never in the project root
