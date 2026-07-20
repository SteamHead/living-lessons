# Living Lessons

An interactive teaching, documentation, and reflection system for
[SteamHead](https://steamhead.space) makerspace classes — replacing linear
PowerPoint lessons with a projected, visual interface organized around the
Design Immersion skill badge system (Heart / Head / Hand), and recording what
each class learns over a school year.

**Status: planning phase.** This repo currently holds the canonical curriculum
data and planning documents. Application code comes later.

## Contents

| Path | What it is |
|---|---|
| `materials/` | Canonical ids for physical materials referenced by hexagons. [Registry](materials/_README.md). |
| `protocols/` | Reusable classroom methods (sharing, feedback, grouping) referenced by lessons. [Schema](protocols/_README.md). |
| `guides/` | Human-facing how-tos: writing hexagons, the git workflow, reviewing AI drafts, glossary. |
| `hexagons/` | Hexagon Activity Library: reusable classroom activities that grant 1-3 skill badges each. [Schema](hexagons/_README.md). |
| `skills/` | 50 canonical skill files: 22 core badges, 2 chart placeholders, 26 tool skills — each with a 5-level depth ladder. [Start here](skills/_README.md). |
| `docs/decisions.md` | Running architecture & taxonomy decision log |
| `docs/project-instructions.md` | Instructions for the Claude planning project |
| `design/design-brief.md` | Design brief for the projected interface |
| `design/tokens.css` | SteamHead brand tokens + provisional Living Lessons additions |

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

Curriculum content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/),
matching SteamHead's existing hexagon materials. Code license TBD.
