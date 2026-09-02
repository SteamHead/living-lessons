# Changelog — 2026-09-02 (b): Pacific framing, click-to-zoom, year filtering

Follows changelog-2026-09-02.md. James's calls: Pacific framing, the missing
places, and a zoom interaction to replace overlapping pins.

## The map

- **Pacific-centred is now the framing** (`decisions.md` D26, resolved).
  Central meridian **145.5°E** — not a round 145 — because a framing's seam
  sits at `centralMeridian − 180` and land east of it wraps to the far edge:
  at 145°E the seam fell 0.2° west of Brazil's easternmost point and clipped
  the Brazilian nose off to the opposite side of the map as a stray speck.
- **`places.json` gaps filled.** The Big Island placeholder became
  Kailua-Kona, Holualoa and Honaunau-Napoopoo; the UK gained Hackney and
  Cambridge. 30 cities, 14 countries. Istanbul and Astana carry
  `"when": "2026-12"` and stay `planned` (hollow outline) until they happen.
  One thing to check: James wrote "hulua loa"; Holualoa is the town above
  Kailua-Kona and is flagged in the file in case that is the wrong place.
- **Iberian labels no longer collide.** Spain sits over the western
  Mediterranean, Portugal in open water to its south-west, both with leaders.
- **Seam splits are now reported, not silently repaired.** An automatic "drop
  the smaller piece" rule was written, tested, and removed: at this seam it
  also deletes French Guiana (13% of France's drawn area) and, in the
  Atlantic framing, a quarter of New Zealand. Greenland is drawn split, which
  is what a Pacific-centred map does, and the build says so. Real removals go
  in `DROPPED_COUNTRIES` by hand, with a reason.

## The Atlas interaction (nav-shell v3)

- **Two clicks reach a class.** Click a pin that overlaps others → the map
  zooms to open that group up. Click a lone pin → the map zooms to it. Either
  way the second click on a pin that is now clear opens the class list.
- **Pins group by screen distance** (~68 px, the width of a hex), so groups
  dissolve as you zoom — the same click both zooms and splits. A group pin
  shows the combined class count and reads "3 places".
- **Zoom is capped at 6×, and the "1 km × 1 km" request was not built as
  asked.** It cannot work on this base map: coastlines are straight lines
  below ~20 km, and the map's labels and city dots are baked into the SVG so
  they scale with it — by 8× "USA" fills the screen, by 20× a city dot covers
  its own state. Rendered at 4×, 8×, 20× and 60× to check. 6× is ample:
  San Francisco and San Marcos land ~110 px apart at 2.9×.
- **A group zooms only as far as it needs to** — the smallest zoom that pulls
  its closest pair apart, bounded by what still shows every member.
- **Groups that can never separate open a list instead.** Kona's three towns
  are within 60 km of each other and Hackney is 8 km from London; no sane zoom
  splits those, so the click zooms as far as it can and opens a combined list
  grouped by city, naming only the cities genuinely still stacked.
- **The 1×/2×/3× buttons are gone.** One control remains, "↺ Whole world",
  which appears only once the map has moved. Escape does the same.
- **Panning is a transform**, and pins live outside the transformed layer so
  they stay a constant size and crisp; positions are recomputed each frame of
  a hand-tweened glide.

## Class selection

- **School-year filtering with no filter menu.** Every row already shows its
  school year, so the year *is* the control: click "2018-19" and the list
  narrows to that year, with a pill at the top to clear it. Nothing new
  appears until it is used — Shenzhen and San Francisco carry 30+ classes each
  while most cities carry two or three, so a permanent filter bar would be
  clutter almost everywhere. A hint line appears only past 12 classes, and
  while a filter is on the per-row year badge steps aside.

## Also

- **`CLAUDE.md`** — new first working rule for AI assistants: James is a
  customer, not a spec. A request with a problem in it should not be built as
  literally asked; either fix it and show the reasoning, or ask first.
  Implementing something you can see is wrong and staying quiet is the one
  unacceptable option.
- **`decisions.md`** — D26 amended (framing resolved), D27 added.

## Known cosmetic limit

The base map's own city dots and country labels scale with the zoom, so at
3–6× the dots are chunky. Fixing it properly needs a second dots-free SVG
variant, or inlining the SVG so host CSS can reach its layers. Neither is
worth it in a prototype, and at these zooms the dots read as useful context.
