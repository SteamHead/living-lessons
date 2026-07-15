# SteamHead Design Immersion Skills — Canonical Files (rev. 2026-07-12)

One markdown file per skill. **These files are the source of truth**; the Excel
review workbook is generated from them for easy reading. Intended to become an
Astro content collection validated by a zod schema.

## Directory layout

    skills/
      heart/    Inspire + Empathize (7 badges)
      head/     Define + Ideate (7 badges)
      hand/     Prototype + Testing (5 badges + 2 chart placeholders)
      tools/
        fabrication/   Hand Crafts, Power Tools, Automated Fabrication (12)
        digital/       Circuit Design, Media, Coding, Computer Foundations (15)

## Frontmatter schema

    id                 slug, unique across all skills
    name               canonical display name
    domain             heart | head | hand   (tool skills are all "hand")
    stage              core skills: inspire | empathize | define | ideate | prototype | test
    wing               tool skills: fabrication | digital
    group              tool skills: hand-crafts | power-tools | automated-fabrication |
                       circuit-design | media | coding | computer-foundations
    kind               core | tool | placeholder
    two_sided          Inspire badges only: the skill has an inbound (getting
                       inspired) and outbound (inspiring others) side; see the
                       "Two sides" section in those files
    order              position within its stage/group column (1 = top = easier;
                       bottom = harder)
    summary            one-line badge description
    levels_defined     which of the five depth levels have rubrics, e.g. [3,4,5]
    ai_drafted_levels  levels whose text is an AI draft awaiting James's review
    status             canonical | needs-review (needs-review = contains AI drafts
                       or an unresolved question)
    flags              provenance notes and open questions
    source             provenance

Stage definitions and placement rules live in `stages.md`.

## Depth levels

    1 Introductory · 2 Early · 3 Preparatory · 4 Intermediate · 5 Advanced

These ARE the "five dots" from the brief. Skills deliberately starting above
level 1 show "not introduced at this level" — by design, not missing data.
Rubrics target elementary students; level 5 may stretch toward middle school.
AI-drafted level text is marked "(AI draft — review)" in the body and listed in
`ai_drafted_levels`.

## Placeholders

`physical-prototype` and `digital-prototype` (kind: placeholder) are chart
slots, not badges: on the class chart they expand into the Fabrication Tools
wing and the Digital Tools wing respectively (Computer Foundations stands
apart from the Digital Prototype placeholder). Their visual treatment is an
open design question.

## Editing rules

- Source text preserved faithfully; typos normalized; no silent invention —
  every AI-drafted or reworded level is marked.
- The old progression sheet's Column B categories (Community Impact, Design
  Planning, Fabrication Tools, Digital Tools) are retired; the badge-sheet
  taxonomy in `domain`/`stage`/`wing`/`group` replaces them.
- Chinese names removed per 2026-07-12 decision.
- Text is deliberately short (chart heritage); a wording revamp may come later.
