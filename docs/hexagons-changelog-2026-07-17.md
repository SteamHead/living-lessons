# Changelog — 2026-07-17: Hexagon Library lands

- **hexagons/_README.md (NEW)**: schema and conventions, imported from the
  hexagon planning chat with additions: privacy rule (source/flags public, no
  names — D6), skills_touched is teacher-only with no chart effect, class-grant
  rule (teacher confirms at lesson close from Badge Evidence look-fors; v1 is
  class-profile only, student-facing language deliberate), zod behavior (badges
  hard-fail, sequence soft-warn, grades as strings). Stale needs-a-decision
  note replaced by D15 reference.
- **Three activities landed**: hex-paper-tower (legacy_number 11),
  hex-makeymakey-inputs, hex-space-station-modules. Edits on landing: teacher
  name scrubbed from one source field; "Block Circuits" prose updated to Craft
  Circuits; grades converted to strings; assumes-pending flags updated to
  landed (D15).
- **decisions.md**: D16 added (library, conventions, product names: The Living
  Lessons / The Living Studio); D15's soldering-safety question resolved —
  Electro Craft L4 stays clean.
- **README.md / CLAUDE.md**: hexagons/ documented; product names added.
- **Dangling sequence refs** (hex-simple-circuits, hex-space-wearables) left
  as-is by design — sequence ids soft-warn.
