# CLAUDE.md — Living Lessons (draft)

Living Lessons is an interactive teaching, documentation, and reflection system
for SteamHead makerspace classes. **Current phase: IMPLEMENTATION.** Planning is
complete (D1–D25; later D-numbers are decisions taken during implementation).
App code is now being built in its own top-level folder (`app/` or `src/`) so the
content libraries stay clean and independently forkable. New contributors read
`CLAUDE-CODE-HANDOFF.md` first — it is the first-session brief.

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
  `design/atlas/` holds the generated Atlas base map: edit `places.json` and
  re-run the build, never hand-edit the SVG. See `design/atlas/_README.md`.

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

**Inherited from the template** — mirror these rather than rediscovering them:

- **Astro 6** with the **`@astrojs/cloudflare`** adapter, deployed as a
  **Cloudflare Worker, NOT Cloudflare Pages** — ignore any doc that says Pages.
- **Node >=22.12 is required** (Astro 6 refuses to build on anything older).
  Pin it with a `.nvmrc` containing `22`: Cloudflare Workers Builds does not
  read the `engines` field in `package.json`, so without `.nvmrc` a build can
  fail on whatever Node version Cloudflare happens to default to.
- **Zod schemas are strict** — a malformed or unknown field fails the build
  instead of publishing broken. The template's `src/content.config.ts` is the
  pattern to copy.
- **Cloudflare account ID `068bd0bae77f7c068677cd14996466fe`.** `wrangler login`
  can see two accounts — confirm the target account before any deploy.
- Design tokens for this repo come from **`design/tokens.css`**. (The template
  uses `src/styles/global.css`; that path does not apply here.)

## Working rules for AI assistants

- **Push back on requests that won't work.** James is a customer, not a spec:
  he does not always know what he wants, and a request that has a problem
  should not be built as literally asked. When you see the issue, either fix it
  and show the result with the reasoning, or ask first — your judgement which.
  What is NOT acceptable is implementing something you can see is wrong and
  staying quiet about it. (Standing example: "zoom to a 1 km x 1 km area" on a
  world base map, which has no detail below ~20 km — see D27.)
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
