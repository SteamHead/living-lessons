# Living Lessons

An interactive teaching, documentation, and reflection system for
[SteamHead](https://steamhead.space) makerspace classes — replacing linear
PowerPoint lessons with a projected, visual interface organized around the
Design Immersion skill badge system (Heart / Head / Hand), and recording what
each class learns over a school year.

**Status: implementation underway.** The curriculum data and planning documents
here are canonical and continue to grow. Application code began with the Claude
Code handoff (D25); the first milestone proves the content pipeline rather than
any visible UI. See [CLAUDE-CODE-HANDOFF.md](CLAUDE-CODE-HANDOFF.md).

## Contents

| Path | What it is |
|---|---|
| `materials/` | Canonical ids for physical materials referenced by hexagons. [Registry](materials/_README.md). |
| `protocols/` | Reusable classroom methods (sharing, feedback, grouping) referenced by lessons. [Schema](protocols/_README.md). |
| `guides/` | Human-facing how-tos: writing hexagons, the git workflow, reviewing AI drafts, Claude Code setup, glossary. |
| `hexagons/` | Hexagon Activity Library: reusable classroom activities that grant 1-3 skill badges each. [Schema](hexagons/_README.md). |
| `skills/` | 50 canonical skill files: 22 core badges, 2 chart placeholders, 26 tool skills — each with a 5-level depth ladder. [Start here](skills/_README.md). |
| `classes/` | Class identity: one file per class per year, authored by hand a few times a year. [Schema](classes/_README.md). Class *activity* lives in the database instead — the write-path rule is D21. |
| `design/design-brief.md` | Design brief for the projected interface |
| `design/tokens.css` | SteamHead brand tokens + provisional Living Lessons additions |
| `design/explorations/` | Static HTML prototypes, kept as visual reference rather than ported |
| `design/atlas/` | The generated world base map for the Atlas: build script, inputs, outputs. [Rationale](design/atlas/_README.md). |
| `docs/decisions.md` | Running architecture & taxonomy decision log |
| `docs/project-instructions.md` | Instructions for the Claude planning project |
| `CLAUDE-CODE-HANDOFF.md` | The implementation brief handed to Claude Code |
| `CLAUDE.md` | Standing instructions for Claude Code sessions in this repo |

## The skill system in one paragraph

**Heart** (Inspire, Empathize), **Head** (Define, Ideate), and **Hand**
(Prototype, Testing) hold 18 core skill badges. Two Prototype slots are
placeholders that expand into tool wings: **Fabrication Tools** and **Digital
Tools** (plus a standalone Computer Foundations group). Every skill tracks
**experience** (times a class practiced it) and **depth** (a 5-level rubric
ladder: Introductory → Early → Preparatory → Intermediate → Advanced) —
separately, never merged.

## Product names

**The Living Lessons** is the projected experience a class sees together on
the classroom display — hexagon activities plus screens like the Class
Journal. **The Living Studio** is the teacher's interface, where additional
detail is viewable and editable.

## License

This repository is split, and the boundary matters because a split license
surprises people who expect one.

- **Code, scripts, configuration** — MIT. See [LICENSE](LICENSE).
- **Curriculum and documentation** — CC BY-SA 4.0. See
  [LICENSE-DOCS](LICENSE-DOCS). This covers `skills/`, `hexagons/`,
  `protocols/`, `materials/`, `classes/`, `guides/`, `docs/` and the design
  brief.
- **The zod content schemas** are code by form and curriculum by substance.
  They go under the docs license, following the controlled-vocabulary ruling in
  the org standard.

Curriculum was previously published as CC BY 4.0 and moved to CC BY-SA 4.0 in
D28. Reasoning for the org-wide split, including what share-alike costs:
`SteamHead/steamhead-standards` → `licensing.md`.

Class recordings, photographs, student work and rosters are not licensed
because they never enter this repository at all (D3, D6).
