# Writing a New Hexagon

## Setup (Obsidian)

1. Open the closest existing sibling — usually the hexagon yours points at in
   `sequence` — right-click its tab → **Split right**, and pin it.
2. Create the new file in `hexagons/`: `hex-<short-activity-slug>.md`.
3. Copy the sibling's frontmatter as a skeleton; keep `hexagons/_README.md`
   open in a third tab — it is the rulebook.

## Writing order (faster than top-to-bottom)

1. **Badges + levels first.** This is the only part constrained by what
   already exists. Open the skill file in `skills/` and pick the level whose
   rubric matches what students actually do in this activity. Max 3 badges;
   if you want more, split the hexagon.
2. **Badge Evidence next**, echoing the rubric's own words. Look-fors, not
   tests.
3. **The narrative shell** — Wonder Question, Hook, Mini-Lesson, Challenge
   quad. You are describing a lesson you ran, not inventing one.
4. **Floor & Ceiling** — guaranteed entry for every learner; extensions that
   help others or the shared build beat "make more."
5. **Reflection Menu last** — pick the default tier for how deep this one
   goes.

## The checklist (from the schema)

- 1–3 badges; every badge id exists in `skills/`; every level exists on that
  skill's ladder
- Grades are strings: `["K", "1", "2"]`
- **No names of people anywhere — including `source` and `flags`**
- Badge evidence never depends on Tier 3 reflection
- Challenge quad verbatim: Your goal / Teacher goal / Requirements / Constraints
- Teamwork has no badge by design — it lives in the Teacher goal
- `sessions > 1` needs a Re-entry Prompt
- `status: field-tested` if you've run it; `draft` if it's untested or
  AI-written

## Ship it

`git status` (confirm the file shows), then add/commit/push. Then ask Claude
for a consistency pass — badge ids, rubric echoes, sequence links, name scrub.
