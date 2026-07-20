# CLAUDE.md — Living Lessons (draft)

Living Lessons is an interactive teaching, documentation, and reflection system
for SteamHead makerspace classes. **Current phase: IMPLEMENTATION.** Planning is complete (D1-D25). App code is built in its own top-level folder; content libraries stay clean and forkable. New contributors read CLAUDE-CODE-HANDOFF.md first. Planning is complete (D1-D25). App code is now being built in `app/` (or `src/`). See CLAUDE-CODE-HANDOFF.md for the first-session brief.

## What lives here (public repo)

- `skills/` — canonical Design Immersion skill files (markdown + frontmatter).
  Source of truth. See `skills/_README.md` for the schema. AI-drafted rubric
  levels are marked and listed in `ai_drafted_levels`; do not silently rewrite
  canonical text.
- `hexagons/` — the Hexagon Activity Library (reusable activities granting 1-3
  badges each). Schema and rules in `hexagons/_README.md`; badge ids must exist
  in `skills/`; no names of people anywhere in hexagon files.
- `materials/` — canonical material ids; hexagon `materials:` validate against
  this (soft-warn). Registry in `materials/_README.md`.
- `protocols/` — reusable classroom methods (sharing/feedback/grouping),
  referenced from lesson phases by id. Schema in `protocols/_README.md`.
- `guides/` — human-facing how-tos (hexagon authoring, git workflow, AI-draft
  review, glossary). Keep these current when workflows change.
- `docs/` — project brief context: decisions log, project instructions, changelogs.
- `design/` — design brief, brand tokens, and static HTML design explorations.

Private data (class records, student media, rosters) NEVER goes in this repo —
it will live in Cloudflare D1/R2 behind auth. See `docs/decisions.md` D3–D6.

## Stack (implementation phase)

Astro on Cloudflare Workers, markdown content collections validated by zod —
mirroring the `steamhead-site-rebuild` repo (the proven template; clone it
alongside this one). App code lives in its own top-level folder (`app/` or
`src/`); the content folders (`skills/`, `hexagons/`, `protocols/`, `classes/`,
`materials/`) are the source of truth, their shapes fixed by each folder's
`_README.md`. Private/runtime data (badge grants, posts, media) will live in
Cloudflare D1/R2, never in git (D3) — and is deferred past the first milestones.

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
