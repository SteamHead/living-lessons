# Changelog — 2026-09-02: The Atlas gets a real base map

The Atlas landing screen no longer uses placeholder art. Its world map is now
generated from Natural Earth data and designed for the room it is shown in: an
85-inch TV at the front of a ~30-foot classroom, audience grades 2–5.

- **`design/atlas/` (NEW)** — the map and the thing that builds it.
  - `places.json` — **the file to edit.** 14 countries and 26 cities SteamHead
    has taught in (or is about to), what gets labelled, and what gets
    highlighted. Public-safe by construction: cities and countries only.
    Knowingly incomplete — three Big Island towns and two UK cities are TODO.
  - `build-atlas-map.mjs` — the generator. Equal Earth projection, Antarctica
    dropped, a DSATUR 4-colouring of the shared-border graph so no two
    neighbours share a fill, subnational highlights, label de-collision with
    leader lines, deliberate simplification, micro-island removal.
  - `fetch-admin1-subset.mjs` + `admin1-subset.geojson` — the nine provinces we
    highlight, trimmed out of Natural Earth admin-1 and committed so the build
    needs no network.
  - `atlas-map-atlantic.svg` (default) and `atlas-map-pacific.svg` — 1920×867,
    ~380 KB each.
  - `atlas-projection.js` / `.json` — generated. The single copy of the Equal
    Earth pin transform, verified against d3 on every build.
  - `_README.md` — files, how to rebuild, how to add a place, and the design
    reasoning behind each choice.
- **`design/explorations/atlas-map-preview.html` (NEW)** — the rig for judging
  the map: framing comparison, a **squint test** that renders the map at the
  visual angle of the front, middle and back rows, and a pin-registration
  check using the four cities that have class records.
- **`design/explorations/nav-shell-v3.vs.opushigh.html` (NEW)** — nav-shell v2
  with the real map wired in. `proj()` now calls the generated Equal Earth
  transform instead of faking an equirectangular grid, the ocean is dark, and
  the map controls carry a framing switch while the framing is undecided.
  v2 is left untouched as the reference.
- **`decisions.md`** — D26: generated base map, Equal Earth, Atlantic-centred
  default, computed 4-colouring, subnational highlights with no admin-1
  borders drawn, labels only for countries we have taught in, tiered type, one
  copy of the pin transform.
- **`CLAUDE.md`** — `design/` description now mentions the generated map.
- **`.gitignore`** — `node_modules/` (the generator has dependencies).

## Two things need James

1. **Pick a framing.** `atlantic` (10°W) is the default and the
   recommendation. `pacific` (145°E) puts San Francisco and Shenzhen facing
   each other across one ocean, which is a lovely story, but it pushes London,
   Madrid, Lisbon, Prague, Brno and Istanbul into the compressed left margin
   and leaves the middle of the map as empty water. Flip between them in the
   preview page, then delete the loser and its `VARIANTS` entry.
2. **Fill the gaps in `places.json`** — the three Big Island towns, the two UK
   cities, and confirm Istanbul and Astana are still "planned" rather than
   taught.

## Known issue, deferred

San Francisco and San Marcos are 500 km apart, which is about 25 px on a world
map, so their hex pins overlap and the San Marcos count is hidden. The fix is
pin **clustering**, not nudging — separating two 54 px hexes would put the
lower pin in Mexico. That is pin behaviour rather than map, so it gets its own
round. Country labels sitting behind a pin resolve themselves once pins cluster.
