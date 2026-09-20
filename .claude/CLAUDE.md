# ShippersLab landing — agent rules

- [DESIGN.md](../DESIGN.md) is the source of truth for colors, typography, layout, and motion. Read it before touching any UI, component, or copy. If the Tailwind tokens in `src/styles/globals.css` and this document ever disagree, fix the CSS — don't invent a third answer.
- No file exceeds **300 lines**. When a file approaches the limit, split it into a folder instead of letting it keep growing.
- Agent configuration (this file, skills, commands) lives in subfolders (`.claude/`), never loose in the project root. The root `CLAUDE.md` only ever contains `@imports` pointing here.

## Commits

Conventional-style, one line, no body:

```
feature(topic): short description
```

- No body, no bullet list, no "Co-authored-by" line.
- `topic` is the area touched (`hero`, `pricing`, `i18n`, `design`, …).
