# Changelog — 2026-07-19: navigation shell design round + classes collection

- **classes/ (NEW collection)**: one markdown file per class per year — the
  class "identity card" powering the Atlas and Class Page. Schema and the
  write-path rule in classes/_README.md. 68 SAMPLE files generated from real
  2017-2025 school history (San Francisco ×2 schools, San Marcos, Prague ×2,
  Shenzhen ×2); blurbs/nicknames are placeholders to edit.
- **design/explorations/nav-shell-v1.vs.opushigh.html (NEW)**: connected
  prototype of the front-of-house — The Atlas (illustrated map placeholder,
  city pins with school flyouts, 2017-2025 timeline scrubber) → Class Page
  (sample skill chart above the fold; Class Journal below: 3 sample completed
  entries then grey future sessions, default 16, +/- adjustable) → Hexagon
  Selector (big list of the 13 real hexagons, Stage Rail handoff stubbed).
  Rollback tags N1-N5 in the file header.
- **decisions.md**: D20 (Maker Mindsets stay physical — poster + journals,
  not system content) and D21 (write-path rule; navigation shell defined;
  city-pin clustering).

## v2 (same day) — nav shell iteration
- Atlas: lit pins layer above dim; map zoom (1×/1.8×/2.8×) + drag-pan.
- Journal: completed entries now clickable → freeform blog-style entry screen
  (no required fields) with a Living Studio composer preview containing a
  copyable transcription→journal prompt.
- Hexagon Selector: two filters — Grade (auto-set from the class) and Skill
  (parsed from badge frontmatter).

## planning-side schema round (D22-D24)
- **D22 Stretch Goal**: new optional hexagon section (early-finisher task,
  distinct from Ceiling, no badge evidence). Schema updated in hexagons/_README.md.
- **D23 audience single**: reaffirmed one audience per hexagon; batch-3 flagship
  set to `family`. (Note: apply this in the batch-3 file when it lands.)
- **D24 materials registry**: materials/_README.md seeded from inventory; live
  `leds-assorted-colors`→`leds` duplicate merged across existing hexagons.
