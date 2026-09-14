# Legacy printed material

Scans and exports of the printed curriculum SteamHead used before Living
Lessons existed. **Nothing here is canonical.** The live curriculum is
`skills/`, `hexagons/`, `protocols/` and `materials/`; these files are the
historical source those were authored from, kept so the provenance of a
hexagon can be traced back to the sheet a class actually held.

This is the archive answering the "import path for existing PowerPoints and
hexagon PDFs" open question in [../decisions.md](../decisions.md).

## Contents

| File | What it is |
|---|---|
| `skills-journal-hexagons-1-25.pdf` | The printed student skills journal, hexagons 1-25. Final version. Blank fill-in pages — no student work. |
| `skills-journal-hexagons-26-50-draft.pdf` | The same journal for hexagons 26-50. Draft, never finalised. |
| `skills-map-hexagons-1-25-letter.pdf` | One-page letter-size skills map for hexagons 1-25, the printed companion to the journal. |
| `hexagon-deck-2025-26.pdf` | The slide deck actually taught at Sunset Elementary in 2025-26, hexagons 1-25, week by week. |
| `unit-3d-printed-balance-games.pdf` | One-page recap of a seven-week unit: paper towers, empathy signs, paper boxes, TinkerCAD balance games, poster design. |

## Why binaries live here

SteamHead's standing rule is that binary files are not committed, because a
binary diffs as "something changed" and Claude cannot read it without
converting it first. That rule was written about generated deliverables — a
`.docx` exported from markdown, where the markdown is the real source and the
export is disposable.

These are the opposite case. They have no digital source: the artifact *is* the
PDF, and the page design carries information the text does not, because these
were built to be printed and handled. Re-exporting them is not possible.

The cost is real and it is handled rather than ignored: each PDF gets a
markdown sibling carrying its text, so a Claude session reading this directory
finds something it can actually use. **A PDF without its `.md` sibling is
incomplete**, and adding one is part of adding the other.

The exception is recorded in `SteamHead/steamhead-standards` →
`docs/claude-project-setup.md`, under *Generating documents to send*.

## Adding to this directory

Only material that was genuinely printed and used, and only with no digital
source to keep instead. Before adding anything, check it page by page for
faces, student names, and staff names — this repo is **public**, and a file
committed and later deleted still lives in the history and is still clonable.
The licensing standard is unambiguous that photographs of students and student
work never enter a repository. Adult names go to initials under D6.

## Transcription status

The markdown siblings are being written. Until a row here says otherwise,
assume a PDF has no transcription yet and that its contents are unread by
anything but a human.

| File | Transcription |
|---|---|
| `skills-journal-hexagons-1-25.pdf` | not yet |
| `skills-journal-hexagons-26-50-draft.pdf` | not yet |
| `skills-map-hexagons-1-25-letter.pdf` | not yet |
| `hexagon-deck-2025-26.pdf` | in progress |
| `unit-3d-printed-balance-games.pdf` | not yet |
