# Claude Code Handoff — Living Lessons, Implementation Phase

This is the brief for the first Claude Code sessions. The project spent months
in planning (see `docs/decisions.md`, D1–D25); that phase is over. You are now
building the app. Read this whole file, then `docs/decisions.md`, then `CLAUDE.md`,
before writing code.

## The one-paragraph picture

Living Lessons is a projected classroom teaching + skill-tracking system for
SteamHead makerspace classes. The curriculum already exists as validated
markdown in this repo (five content libraries). Your job is to build an Astro
app, in this same repo, that renders that content — starting with the thinnest
possible slice that proves the pipeline, then growing toward the designed
screens. The look and interactions are already prototyped in
`design/explorations/`.

## Milestone 1 — prove the content pipeline (do ONLY this first)

**Goal:** an Astro site on the Cloudflare Workers stack that reads the real
`skills/` and `hexagons/` markdown through zod-validated content collections and
renders them at `localhost`. That's it. No Stage Rail, no database, no auth, no
styling beyond legible.

**Acceptance criteria:**
1. `npm run dev` serves a local site.
2. A `/hexagons` route lists every hexagon by reading `hexagons/*.md` as a
   content collection, with a zod schema matching `hexagons/_README.md`
   frontmatter. The schema must **fail the build** on an unknown `badges` id and
   **soft-warn** on unknown `sequence` ids and `materials` ids (per D24) — mirror
   how `steamhead-site-rebuild` structures its collections and validation.
3. A `/skills` route does the same for `skills/**/*.md` against
   `skills/_README.md`.
4. A single hexagon detail route (`/hexagons/[id]`) renders one hexagon's body.
5. Builds clean and deploys to a Cloudflare Worker preview URL.

**Explicitly NOT in milestone 1:** Stage Rail, the Atlas, Class Pages, the
nav shell, protocols rendering, media handling, any database, any auth, the
badge-swap UI, the skill chart. Those are later milestones. Resist scope creep —
the point of M1 is to de-risk the stack, not to look finished.

## What to read before building

- `docs/decisions.md` — every architectural decision (D1–D25). Do not
  relitigate decided items; do flag genuinely new decisions for James.
- `CLAUDE.md` — working rules for this repo.
- The sibling repo **`steamhead-site-rebuild`** — the proven template. Mirror
  its Astro config, content-collection setup, zod patterns, and Worker/Wrangler
  config so the two stay consistent and James only learns one setup. Clone it
  locally alongside this repo. **You may recommend deviations** — James
  explicitly wants to follow the template but welcomes proposed improvements;
  surface them as suggestions, don't silently diverge.
- `design/explorations/*.html` — the visual + interaction reference. Later
  milestones rebuild these as proper components (D25); for M1 they're just
  context.

## Repo layout rule (important)

App code goes in its own top-level folder (**`app/`** or `src/` per the Astro
convention you choose) so the content libraries stay clean and independently
forkable (the curriculum is CC BY 4.0 and a teacher elsewhere should be able to
copy `hexagons/` etc. without dragging app code). Do NOT scatter app files among
the content folders. The content folders — `skills/`, `hexagons/`, `protocols/`,
`classes/`, `materials/` — are the source of truth and their structure is fixed
by the `_README.md` schema in each.

## The content libraries (all live, all schema'd)

| Folder | What | Schema |
|---|---|---|
| `skills/` | 50 skill files: 22 core badges, 2 placeholders, 26 tool skills; 5-level depth ladders | `skills/_README.md` |
| `hexagons/` | Reusable classroom activities granting 1–3 badges; body sections incl. Stretch Goal (D22) | `hexagons/_README.md` |
| `protocols/` | Reusable methods (sharing/feedback), referenced from phases by id | `protocols/_README.md` |
| `classes/` | One file per class per year; the identity card powering Atlas + Class Page | `classes/_README.md` |
| `materials/` | Canonical material ids; hexagons validate against these (soft-warn) | `materials/_README.md` |

## Hard rules (from the decision log — do not violate)

- **Public repo = public data only.** No student, teacher, or volunteer names
  anywhere in committed files (D6). Private class data (badge grants, posts,
  photos) lives in Cloudflare D1/R2 later, NOT in git (D3) — and is deferred
  past M1 entirely (D25).
- **Experience and depth never merge** (D8). A class practices a skill N times
  (experience) and reaches a highest level (depth); these are two numbers.
- **The skill chart is computed, never stored** (D21) — it aggregates badge
  grants. Not relevant until the database milestone, but design with it in mind.
- **Badge ids are stable forever; display names can change** (D15 — e.g. id
  `block-circuits` displays as "Craft Circuits"). Render the display name; key
  off the id.
- **Hexagon badges are suggestions;** the teacher overrides per-class at runtime
  (D18). That override is a private-tier write — deferred, but don't hardcode
  badges as immutable.
- **AI-drafted content is marked** (`ai_drafted_levels`, `status: draft`) and
  reviewed by a human before it's canonical. If you touch content, preserve the
  markers; don't silently rewrite.

## Design fidelity (later milestones)

When you build the real screens, match the prototypes in `design/explorations/`:
`hexscreen-stagerail-v2.vs.opushigh.html` (the Hexagon Activity screen, six
phases, slides, teacher-cue tray, badge swap) and `nav-shell-v2.vs.opushigh.html`
(Atlas → Class Page → Journal → Selector). Use `design/tokens.css` for brand
colors and type. Rebuild them as components reading live content (D25) — the HTML
files are the reference, not the source.

## Working conventions

- Same review discipline as the content phase: meaningful commits, clear
  messages, and when a change is substantial, a branch + PR James reviews.
- A second contributor (the "A4" account, also James) may be adding hexagons in
  parallel — stay out of the content folders except to read them.
- When you hit a real decision not covered by D1–D25, stop and ask James; he
  assigns the next D-number.
