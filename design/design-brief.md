# Design Brief: Living Lessons — projected teaching interface for SteamHead

## What this is

Living Lessons replaces PowerPoint in an elementary school makerspace. A teacher projects it on a classroom wall; kids ages 6–12 watch from their seats; the teacher drives with a keyboard/clicker while talking, demonstrating, and improvising. It shows lessons, and it shows each class the skills they're building across a school year. Design the visual system and key screens.

## Hard constraints (non-negotiable)

- **Projector-first**: 16:9 landscape, legible from the back of a classroom. Minimum body text roughly double normal web size; generous contrast; no thin-on-light type. Assume a mediocre projector that washes out subtle colors.
- **Teacher-driven**: navigation by arrow keys / clicker steps and big click targets. No hover-dependent UI.
- **Brand extension, not invention**: SteamHead yellow `#F1D302`, orange `#EDA83E`, teal `#5EB1BF`; accents `#F2B705` `#EF7B44` `#409FCD`; neutrals `#474747` `#D7D7D7` `#F4F4F4`. Headings: Varela Round. Body: Montserrat. Logo only on solid backgrounds, never recolored or skewed. The **hexagon** is an established motif (kids use hexagon activity journals) — use it.
- **Tone**: joyful, capable, workshop-warm. This is NOT a gradebook and must never read like an LMS or dashboard-for-adults. Progress is celebration ("look what our class can do"), never assessment of individual kids.

## The skill system you're visualizing

Three domains — **Heart** (Inspire, Empathize), **Head** (Define, Ideate), **Hand** (Prototype, Testing) — holding **18 core skill badges** (e.g. Workshop, Interviews, Mood Board, Mind Map, Brainstorm, Setup and Cleanup, Beta Test). Two Prototype slots are **placeholders that expand into tool wings**: Fabrication Tools (12 skills in 3 groups) and Digital Tools (12 skills in 3 groups), plus a standalone Computer Foundations group (3 skills). Every skill tracks two separate things:

- **Experience** — how many times the class has practiced it (a count that grows all year)
- **Depth** — highest level reached on a 5-step ladder: Introductory → Early → Preparatory → Intermediate → Advanced (think "five dots," but propose better)

## Screens to design (in priority order)

1. **Class Skill Chart** — the heart of the product and the hard problem. One class's 18 core badges organized by Heart/Head/Hand, each showing experience + depth at a glance, with the two tool wings collapsed until expanded. Must feel alive and rewarding to a 9-year-old, readable from 8 meters. **Give me 2–3 genuinely different directions for this screen before refining anything.**
2. **Skill Card** — one skill zoomed in: name, icon, plain-language description, experience count, 5-level depth ladder, photos from class, linked lessons.
3. **Lesson View** — a scrollable teaching page (photos, diagrams, discussion questions, a timed activity block with goal + safety reminder, grade-specific requirement callout, green completion check). Use a real example: an intro LED lesson (photos of LEDs, +/– lead diagram, battery diagram, 10-minute "make it light up" challenge).
4. **Class Select** — the landing screen: visual cards for choosing school year → class. Fun, fast, projected while kids walk in.
5. **Current Project Page** — a living record: driving question, phase, progress photos, connected skills.

## Watch out for

- 18+ badges is a lot: avoid a wall of identical widgets. Hierarchy through the six stages.
- Photos of students will always be face-blurred — design so blurred photos look intentional, not broken.
- Kids' names never appear on screen.

Deliver direction options for screen 1 first; we'll pick one, then apply it to the rest.

## How to use this brief with Claude Code

Ask Claude Code to build each direction as a standalone static HTML file in
`design/explorations/` (e.g. `chart-direction-a.html`), using only the tokens in
`design/tokens.css` and realistic content from `skills/`. Open them in a browser,
project them on the actual classroom projector if possible, pick a winner, then
iterate on that file before touching the other screens.
