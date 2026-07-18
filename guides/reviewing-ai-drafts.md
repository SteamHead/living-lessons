# Reviewing AI Drafts

AI-written text is always marked. Nothing AI-drafted is "done" until you have
read it and removed the markers — that is the review gate, applied to content.

## Where the markers live

- **Skill rubrics:** the level text carries `*(AI draft — review)*`, and the
  frontmatter lists it in `ai_drafted_levels`. Files with any drafts have
  `status: "needs-review"`.
- **Hexagons:** AI-authored files have `status: draft` and a flag naming what
  was guessed (grade ranges, time limits, merged legacy numbers).

## How to review

1. Read the level or section as a teacher: is it true of your classroom, in
   your voice, honest about supervision needs?
2. Edit freely in Obsidian — it's just text.
3. When a level passes, delete its `*(AI draft — review)*` tag and remove the
   number from `ai_drafted_levels`.
4. When a whole skill file is clean, set `status: "canonical"`. When a hexagon
   has been run as written, set `status: field-tested`.
5. Commit with a message like `Review: interviews L1-3 approved, L4 reworded`.

Or do it by exception: tell Claude "approve everything in <file> except…" and
review the returned diff. The Excel workbooks are generated views for reading;
the markdown is always the source of truth.

## What NOT to do

- Don't silently rewrite text that isn't yours to a new meaning without a
  commit message saying so — future-you audits this trail.
- Don't remove a marker you haven't actually read. The markers are only
  useful if they're honest.
