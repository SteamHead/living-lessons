# Living Lessons — Decision Log

Format: decision, rationale, status. Add newest at the bottom. Revisit anything marked PROVISIONAL.

## D1 — Content lives as markdown in a git repo (DECIDED, 2026-07-11)
The system must be maintainable by one teacher with AI assistance (Claude Code), with no company or income stream behind it. Markdown-in-git is the format AI tools edit most reliably, diffs are reviewable, and it doubles as the corpus for the separate SteamHead RAG project. Applies to curriculum and templates; NOT to class media or private records (see D3). Precedent: the steamhead-site-rebuild repo already works this way (markdown + zod-validated frontmatter).

## D2 — Two-system model: HHH skills + Hexagon activities (DECIDED, 2026-07-11, revised)
Heart/Head/Hand (Design Immersion Skill Badges) is the SKILL TAXONOMY: Heart (Inspire/Share, Empathize), Head (Define, Ideate), Hand (Prototype, Testing), plus Fabrication Tools and Digital Tools wings. The Skill Progression sheet's five levels (Introductory/Early/Preparatory/Intermediate/Advanced) with written rubrics ARE the "depth" dimension from the brief.
Hexagons are the ACTIVITY LIBRARY: numbered, CC BY 4.0 units assembled into lessons. Each hexagon tags the HHH skills it exercises. Running a lesson advances the class's skill chart.
TODO: canonicalize the badge spreadsheet (sheets disagree: Inspire vs Share, Digital Storytelling vs Digital Citizen Post, progression-sheet groupings differ from HHH columns) by converting it to one markdown file per skill.

## D3 — Split architecture: public repo + private store (DECIDED, 2026-07-11)
Public GitHub repo: app code, HHH skill definitions, hexagon curriculum, lesson templates (already CC BY 4.0), markdown with zod-validated frontmatter. Private store: class records, posts, rosters in a database; photos/media in object storage — never in git. The app joins public curriculum with private class data at render time.

## D4 — Ingest-time image pipeline (DECIDED, 2026-07-11)
On upload: optimize/resize → save as private "original" → generate a face-blurred derivative. Only blurred derivatives are ever reachable by the rendering layer (internal or public). Unblurred originals live exclusively in the restricted store. This makes the public toggle structurally incapable of leaking a face.

## D5 — Class access model (DECIDED, 2026-07-11)
All class content behind a password wall. User accounts scoped to their own classes. Per-class teacher-controlled toggle flips approved content (blurred images only) to public view.

## D6 — Names in public content (DECIDED, 2026-07-11)
Roles or first initials only — students, classroom teachers, and volunteers — unless explicitly cleared. Existing lesson records contain full names and are restricted-tier as-is.

## D7 — Visual identity extends the SteamHead brand guide (DECIDED, 2026-07-11)
Not a new identity. Extend: brand yellow #F1D302 / orange #EDA83E / teal #5EB1BF palette, Varela Round + Montserrat, logo usage rules. Application-specific additions needed: projection type scale, Heart/Head/Hand + skill badge visual language, experience/depth indicators, hexagon motif for the activity library. Design tokens should be shareable with the main site rebuild.

## D8 — Experience and depth are tracked separately (DECIDED, carried from brief)
Experience = times a skill was practiced. Depth = highest progression level reached (the five written rubric levels from D2). Never merged into one number.

## D9 — Reuse the site-rebuild stack and workflows (PROVISIONAL, 2026-07-11)
Living Lessons builds on the proven steamhead-site-rebuild stack: Astro on a Cloudflare Worker (NOT Pages), markdown content with strict zod schemas, Sveltia-style git-backed editing where it fits. Private tier lands on the same Cloudflare account: D1 for class records/posts, R2 for media (private bucket for originals, servable bucket for blurred derivatives), Cloudflare Access or app-level auth for the class wall.
Inherit the existing AI-review gate verbatim: AI-drafted content arrives as pull requests under a disclosed AI author; a human reviews and merges. This IS the brief's "never publish AI content without teacher review."
PROVISIONAL until the architecture memo confirms D1/R2 fit the media volume and auth needs.

## D10 — Sibling repo, shared tokens (PROVISIONAL, 2026-07-11)
Living Lessons is a separate repo/Worker from steamhead-site-rebuild, so the marketing site stays simple while Living Lessons carries auth, database, and the image pipeline. Design tokens and content conventions are shared between the two. To be confirmed in the architecture memo.

## D11 — Skill taxonomy canonicalized (DECIDED, 2026-07-12)
James resolved the spreadsheet drift: Heart stage is "Inspire"; "Digital Storytelling" over Digital Citizen Post; "Empowered Researcher" (Media Research ladder) with search mechanics split into a new "Search Engines" skill; new Computer Foundations group (Search Engines, Account Creation, Managing Digital Media); Mind Map and Mood Board are separate skills (Mood Board under Empathize); Work Plan and Setup and Cleanup are separate badges; Construction Kits was the old name for Block Circuits; Physical/Digital Prototype are chart placeholders, not badges; Stitch Craft = hand-needle only, Power Stitch Craft = machine; Hand Tools sits at the bottom of Hand Crafts (order = difficulty, top easy); Chinese names removed. Result: 18 core badges + 2 placeholders + 27 tool skills, every badge with a 5-level depth ladder. AI-drafted rubrics are marked and await James's review.

## D13 — Stage refinements from the d.school review (DECIDED, 2026-07-14)
Context added: Design Immersion adapts Stanford d.school's cycle, plus Inspire as a two-sided bookend (inbound: get inspired by others' work; outbound: inspire others) — documented in skills/stages.md, now the canonical stage reference. Changes: Inspire badges (Workshop, Service, Digital Storytelling) marked two_sided with both sides described (inbound rubrics remain open); new Driving Question badge under Define (AI-draft ladder), tying the chart to project pages; "Testing" stage renamed "Test"; Mind Map, Reflection, Roleplay summaries clarified to match their stage; Sketching keeps its rough-to-technical arc, summary updated; Work Plan ladder stage lists updated from the old cycle; Inspire column reordered easy-to-hard (Digital Storytelling, Workshop, Service). Chart stays COLUMNAR: circular layout rejected as confusing for young students. Service rename deferred (James deciding).

## Open questions (carried forward)
- How many HHH skills appear on a class chart at once — all badges, or domain view that zooms into badges.
- Which face-blur tool goes in the pipeline.
- How skill experience/depth get recorded per lesson (presumed v1: manual teacher confirmation at lesson close).
- Exact auth mechanism (Cloudflare Access vs app-level accounts) — depends on how families access class pages.
- Import path for existing PowerPoints and hexagon PDFs.
- Multilingual content (SteamHead operates internationally; Chinese names removed from skill files for now, revisit for i18n).
- Subdomain/URL for Living Lessons (e.g., labs.steamhead.space).

- Confirm group name: "Computer Foundations" vs "Computer Use".
- How the two placeholder slots visually expand into the tool wings on the class chart.

## D12 — Public GitHub repo now; design exploration via Claude Code (DECIDED, 2026-07-12)
Living Lessons gets its public GitHub repo immediately (curriculum is CC BY 4.0; private data stays out per D3). GitHub doubles as the reading/review interface for the skill files. Claude Design is unavailable (org token limits), so design exploration moves to Claude Code: 2-3 static HTML directions for the class skill chart in design/explorations/, built against design/tokens.css and real skills/ content, evaluated in a browser and ideally on the actual classroom projector.
- Inbound-side depth rubrics for the two-sided Inspire badges.
- Service rename (implementation-reach ladder vs 'community service' connotation).
