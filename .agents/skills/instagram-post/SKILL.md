---
name: instagram-post
description: Produce Instagram carousels, stories or highlights for ShippersLab. You coordinate Orca workers (Codex for images, Claude for HTML/CSS, Sonnet for copy), deliver 3 new style alternatives, and export every sticker, background and icon as a separate file ready for Figma. Use when the user asks for a post, carousel, story, highlight or social graphic.
---

# instagram-post

Invoked as `/instagram-post <topic>`, usually with reference images. The topic and references come from the user. Everything below is fixed.

## Role

You are the coordinator. You plan, write the briefs, dispatch workers and review their reports and renders. You do not write the HTML, run the image tool or edit copy files yourself. This keeps your context free for judgment.

Load these before briefing: `.agents/CONTEXT.md`, `.agents/DESIGN.md`, and the skills `social`, `copywriting`, `better-ui`, `emil-design-eng`.

## Where the work lives

Posts live in `~/code/freelance/shipperslab-posts/`. One folder per piece:

```
<piece>/
  BRIEF.md          concept, copy, plate specs, styles already used
  src/*.html + base.css
  render.mjs        puppeteer-core against local Chrome
  assets/plates/    AI plates from Codex, with NOTES.md (empty zones, object bounds)
  assets/stickers/  transparent PNGs, one object per file
  copy/copy.md      final copy, the source of truth for the HTML
  out/              rendered PNGs (gitignored)
```

Fonts, logos, CONTEXT.md and DESIGN.md are copied at that repo's root. Copy an existing piece such as `mkt-106-alcance-por-escrito/` as the starting point. Render with `npm run render`, or `node render.mjs concept-x` for one concept.

## Workflow

1. **Read the references.** Say in two lines what you take from them (structure, rhythm) and what you do not (tone, colors, fonts).
2. **Write BRIEF.md.** Three alternatives, each a different concept. Open the folders of earlier pieces and list their styles under "Estilos ya usados, no repetir". Every alternative must be new. Never reuse an earlier look for profile coherence.
3. **Dispatch workers in parallel** (Orca, `orchestration` skill). Pick the model by task:
   - `codex`: all AI images (plates, stickers, backgrounds).
   - `sonnet`: copy, copy review, mechanical edits.
   - `opus`: building the slides in HTML/CSS.
   - `haiku`: screenshots, contact sheets, file moves.
   - Fable only when taste or hard engineering is needed.
4. **Review.** Read the workers' short reports and open the contact sheet. Reject what breaks the rules below and send one fix round.
5. **Report** to the user: the three alternatives, the contact sheet path, and the asset folders.

## Separate assets for Figma

The user uploads pieces to Figma separately, so always export them as files, not only baked into the slide.

- **Stickers and objects**: PNG 1024x1024, transparent background, one object per file, in `assets/stickers/`. Generate with Codex on pure white, then cut out with flood-fill from the edges (core 40, fringe 120, 3 rounds, margin 8, no smoothing). Use `~/code/freelance/shipperslab-posts/highlights-servicios/assets/key-stickers.mjs` as the base. Verify each cutout on a dark and a white background. A first attempt once erased all the orange inside the object, so check interiors too.
- **Backgrounds and walls**: PNG at the full slide size, no text, in `assets/plates/`. Plates are 1024x1536.
- **Icons, tape, vector shapes**: SVG, one per file.
- **Text is never inside AI images.** Briefs to Codex say "no text, no logos, no brand marks". All text is HTML, and the same text is listed in `copy/copy.md` so it can be retyped in Figma.
- Name files by role (`bm-wall-grey.png`, `sticker-3-phone.png`) and write a short `assets/INDEX.md` listing each file, its size and where it is used.
- Remind the user that stickers carry empty margin inside the 1024 square, so size them in Figma by the layer, not by the object.

## Format

- **Carousel**: 1080x1350. Safe zone 60 px, side margins 72 px. Headlines 84 to 120 px, three lines max. Body Geist 34 to 40 px. Counter `01 / 06` in Geist Mono top left. Logo bottom right, about 110 px wide.
- **Story**: 1080x1920. Usable band y 250 to 1620, margins 80 px. Keep a 700x160 empty zone at y 1380 to 1540 when a link sticker is needed.
- **Highlight cover**: 1080x1080, or 1080x1920 with a 560 px safe circle and no text.
- Headlines: Geist Pixel Square, tracking -4%, line height 100%, ink. Labels: Geist Mono Medium, uppercase, 0.12em tracking.

## Brand rules

- Colors: accent `#FE5634`, ink `#0B0F1A`, paper `#EEEEF3`, muted `#5F6777`, border `#E0E3E9`. No other colors, not even in stickers or walls: a sand and terracotta wall with brown, green and blue stickers was rejected as off-brand. Stickers use ink, white and orange only.
- Text on orange is always white, never black.
- At most two orange elements per slide.
- Geist Pixel Square axis only. No circle axis.
- No abstract illustrations, no cats, mascots, emojis or faces. Tone is a professional studio talking to a pyme owner, not playful.
- No shadows on boxes. Radius follows DESIGN.md.
- Keep slides sparse. One idea per slide.

## Copy rules

- Spanish with voseo rioplatense. English only if asked.
- No em dash. No "no es X, es Y". No "no X, no Y, no Z". No hype words.
- No invented clients, metrics, prices or testimonials. Use "Proyecto 01" style placeholders.
- EventOps may be named as "en producción", never with user numbers. If you use a real EventOps screenshot, check the data does not undercut the claim (a finances screen once showed ingresos -69%).
- The free 30-minute call is confirmed and can be named in "Cómo trabajamos" pieces.
- Team: "un equipo chico de ingenieros y diseñadores de Argentina". Only Franco and Juani can be named.
- Closing lines must say ShippersLab builds the system. They must never read as if ShippersLab were the software.
- Each answer or proof point is visual when possible, not a block of text.
- If a service is the point of the piece, the service name is big and readable. A small service label with a big question made the user worry people would not know what is offered.
- Mark copy in the HTML with strings easy to find, because a later pass replaces it. Check accents ("cómo") and end punctuation consistency in headlines.

## Worker briefs must include

- Absolute paths. Claude workers started in the new posts repo die on the trust dialog, so launch them with `--worktree current` from the `shipperslab-landing` worktree and pass absolute paths into the posts repo. Codex workers start fine in the posts repo.
- Codex saves images to `~/.codex/generated_images/`. The worker must copy them into `assets/plates/` itself.
- A mid-run correction sent by inbox is not seen by a worker in a long poll. Use `orca terminal send`, or stop and redispatch.
- `orca check --wait` prints keepalive lines first. Parse from the first `{\n`.
- Worker checklist before reporting: open every PNG at real size, check the safe zone, check legibility at 390 px width, search for em dashes, confirm the copy matches `copy/copy.md`, and generate a contact sheet.

## Known limits

- Figma MCP can hit the Starter plan call limit. Do not depend on it. Real EventOps screenshots are in `~/Documents/ShippersLab.zip`.
- Linear and the Chrome extension may be disconnected. Take the issue text from the user or the Figma frame.
- Geist Pixel Square does not appear in Figma by default. It is installed as `~/Library/Fonts/GeistPixel-Square.ttf` and works in the Figma desktop app, searched as "Geist Pixel Square".
- Figma line height: type `140%`, not `140`. Rotation sign is the opposite of CSS.

## Commits

Conventional, one line, no body, no co-author: `feature(topic): short description`.
