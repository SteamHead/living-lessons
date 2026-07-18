# Hexagon Library — Schema & Conventions

A **hexagon** is a reusable classroom activity that teaches toward 1–3 skill
badges (D2: hexagons are the activity library; `skills/` are the badges).
Hexagons appear inside **The Living Lessons** (the projected experience the
class sees together); their teacher-only details appear in **The Living
Studio** (the teacher's interface). Files live flat in `hexagons/`, sibling to
`skills/`, filtered by frontmatter. Keep the body to roughly one printed page —
teachable at a glance mid-session, not a report.

## Frontmatter

```yaml
id: hex-paper-tower            # stable slug; class completion records (D1/D3) reference it
legacy_number: 11              # optional: number from the printed 2025-26 hexagon sheets (D15)
title: Paper Tower Challenge
badges:                        # 1-3, shown to students; ids must exist in skills/
  - id: card-craft
    level: 1                   # the depth-ladder level this activity exercises
  - id: setup-and-cleanup
    level: 1
skills_touched: [learning-station, gather-feedback]  # teacher-only; see rules
grades: ["1", "2", "3", "4", "5"]   # strings; "K" allowed
audience: classmate            # self | classmate | younger-students | school-staff | community | family
sessions: 1
build_time: "12-15 min"        # active build block within the session
sequence:                      # suggested, never enforced
  before: []
  after: []
project_tags: [warm-up, structures]
materials: [paper]
reflection_default: tier1      # starting suggestion; the menu lives in the body
status: draft                  # draft | field-tested | reviewed | retired
flags: []                      # open questions / provenance notes, same habit as skills/
source: "SHTeam Labs Hexagon deck 2025-26"
```

Rules:
- `badges` max 3; if an activity needs more, split the hexagon.
- Every badge carries a `level` (1–5) matching the skill's depth ladder. This
  is the mechanism behind "repeats deepen": the class chart records experience
  on every completion, and depth advances when a hexagon at a higher level is
  completed (D8: experience and depth never merge).
- **`skills_touched` is teacher-only.** It appears in The Living Studio as a
  reflection aid — what skills the activity brushed against — and is never
  shown to the class. It has **no effect on the class chart**: badges are the
  only chart-driving mechanism, so everything on the chart traces to observed
  badge evidence.
- **Granting.** Completing a hexagon grants its badges to the **class
  profile**. The teacher confirms at lesson close using the Badge Evidence
  look-fors — a judgment call about whether the class demonstrated it, not a
  threshold. Version 1 keeps no per-student records; the student-focused
  language in rubrics and evidence is deliberate — students are verbally asked
  to strive for these goals and reflect on whether they performed at the class
  level. Student profiles are on the enhancement list, and this schema is
  written so they can attach later without restructuring.
- **Privacy: `source` and `flags` are public. No names of students, teachers,
  or volunteers anywhere in a hexagon file (D6).**
- Validation (zod): `badges` ids are refined against the `skills/` collection
  and **hard-fail** if unknown; `sequence` ids **soft-warn** only, so
  authoring order stays free; `grades` are strings.
- There is no collaboration/teamwork badge **by design** — classroom culture
  lives in the Teacher Goal and Reflection Menu, not on the chart.
- Badge evidence must never depend on Tier 3 reflection.

## Body sections (in order)

1. **Wonder Question** — one opening question for the rug.
2. **Hook** — video, story, demo, or client introduction. One short paragraph.
3. **Mini-Lesson** — the one skill or concept taught directly, including
   micro-tips (tape-on-tape, long leg / short leg).
4. **The Challenge** — the proven quad, verbatim format:
   - **Your goal:** (student-facing)
   - **Teacher goal:** (observational — "see how you…"; this is where
     culture, helping, and independence live)
   - **Requirements:** (bulleted, testable)
   - **Constraints:** (materials, tools, time)
5. **Floor & Ceiling** — guaranteed entry point for every learner; extension
   for fast/deep achievers (prefer extensions that help others or the shared
   build over "make more").
6. **Badge Evidence** — per badge, what the teacher must observe to grant it
   at the stated level. Written to echo the skill's rubric language. Look-fors,
   not tests. (When a skill's rubric is revised, check its hexagons' evidence
   sections — they go stale silently.)
7. **Reflection Menu** — three tiers; teacher picks in the moment; prompts may
   run mid-lesson. The tiers deliberately climb the Reflection badge's own
   ladder (Tier 1 ≈ L1 name-how-it-went … Tier 3 ≈ journal/evidence).
   - **Tier 1 — Whole-class pulse (2 min):** hand-raise / thumbs / popcorn.
   - **Tier 2 — Guided share (5 min):** pair-share, midpoint show, gallery or
     table walk.
   - **Tier 3 — Independent (when ready):** written or photo/video evidence
     (e.g., Google Classroom upload).
8. **Re-entry Prompt** — only if `sessions > 1`.

## Naming

`hex-<short-activity-slug>.md`. Grade-band siblings get suffixes and point at
each other in `sequence` (e.g., `hex-arcade-button-k2` / `hex-arcade-button-g35`).
Slugs supersede the running numbers from the printed sheets (D15 amended D2);
`legacy_number` preserves the mapping.
