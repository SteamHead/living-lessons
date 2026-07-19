# Changelog — 2026-07-18 (d): decision renumber + sensors merge (planning side)

Planning-side housekeeping landed BEFORE the A4 hexagon batch so counts and
decision numbers are correct when that batch merges.

- **decisions.md**: fixed the duplicate D17 — the Stage Rail entry is now **D18**
  (badge-override stays D17). Added **D19**: Microprocessors merged into
  Electronic Sensors.
- **skills/tools/digital/electronic-sensors.md**: merged ladder (from the A4
  draft) landed; **microprocessors.md deleted** (history preserves it).
- **Shared-file counts** corrected to the true totals (planning side owns these
  files): 50 skill files / 22 core / 26 tool. Root README, skills/_README.md,
  guides/glossary.md. (The 47/18 figures were stale from before Mood Board,
  Driving Question, Setup-and-Cleanup, and the three Get-Inspired badges.)
- **block-circuits.md**: confirmed already correct on main (Craft Circuits,
  coin-cell L1 / copper-tape L2 per D15) — A4's stale-file flag was from an
  outdated clone predating the D15 push. No change needed; A4 should re-clone.

Note for A4: pull/re-clone after this lands. The batch-1 hexagons are correct
and will merge cleanly on top; only the sensors file and shared counts overlap,
and those are resolved here.
