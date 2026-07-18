# CLAUDE.md — Living Lessons (draft)

Living Lessons is an interactive teaching, documentation, and reflection system
for SteamHead makerspace classes. **Current phase: planning and design
exploration — no application code yet.**

## What lives here (public repo)

- `skills/` — canonical Design Immersion skill files (markdown + frontmatter).
  Source of truth. See `skills/_README.md` for the schema. AI-drafted rubric
  levels are marked and listed in `ai_drafted_levels`; do not silently rewrite
  canonical text.
- `hexagons/` — the Hexagon Activity Library (reusable activities granting 1-3
  badges each). Schema and rules in `hexagons/_README.md`; badge ids must exist
  in `skills/`; no names of people anywhere in hexagon files.
- `guides/` — human-facing how-tos (hexagon authoring, git workflow, AI-draft
  review, glossary). Keep these current when workflows change.
- `docs/` — project brief context: decisions log, project instructions, changelogs.
- `design/` — design brief, brand tokens, and static HTML design explorations.

Private data (class records, student media, rosters) NEVER goes in this repo —
it will live in Cloudflare D1/R2 behind auth. See `docs/decisions.md` D3–D6.

## Working rules for AI assistants

- Read `docs/decisions.md` before proposing architecture; don't relitigate
  decided items, do flag new implicit decisions.
- AI-generated content is reviewed by a human before merging — same PR
  convention as steamhead-site-rebuild.
- One teacher maintains this with AI assistance: prefer boring, durable choices.
- Design work: follow `design/design-brief.md`; use only `design/tokens.css`;
  use real content from `skills/`.

## Related

- github.com/SteamHead/steamhead-site-rebuild — the main site (Astro on
  Cloudflare Workers); Living Lessons inherits its stack and conventions.
