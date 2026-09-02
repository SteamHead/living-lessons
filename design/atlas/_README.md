# design/atlas — the Atlas base map

The generated world map behind **The Atlas**, the Living Lessons landing screen
where a teacher picks a class. It replaces the blobby placeholder art that
`nav-shell-v1`/`v2` used.

Built for one specific viewing situation: an **85-inch TV** at the front of a
classroom roughly **30 feet** long, watched by **grades 2–5** from tables
throughout the room.

## Files

| File | What it is |
| --- | --- |
| `places.json` | **The file you edit.** Every country and city SteamHead has taught in, what gets labelled, and what gets highlighted. |
| `build-atlas-map.mjs` | The generator. Reads the two data files below plus `places.json`, writes everything else here. |
| `fetch-admin1-subset.mjs` | Run only when `places.json` gains a new province/state. Downloads Natural Earth admin-1 and trims it. |
| `admin1-subset.geojson` | Committed output of the above — the 9 provinces we highlight. Keeps the build offline. |
| `atlas-map-pacific.svg` | The map, central meridian 145.5°E. **This is the one in use.** |
| `atlas-map-atlantic.svg` | The same map, central meridian 10°W. Kept only for the comparison in the preview page. |
| `atlas-projection.js` | Generated. The Equal Earth transform plus each variant's numbers, for placing pins. Load it and call `AtlasMap.project(lng, lat, variant)`. |
| `atlas-projection.json` | The same numbers as data, for any non-browser consumer. |

Geometry is Natural Earth 1:50m via the `world-atlas` npm package, and Natural
Earth 1:50m admin-1 for provinces. Both are public domain.

## Rebuilding

```sh
cd design/atlas
npm install
npm run build
```

The build prints what it did and **fails loudly** rather than shipping a broken
map: if two neighbouring countries would share a fill, if a province named in
`places.json` is not in the Natural Earth data, or if the pin transform in
`atlas-projection.js` disagrees with d3 by more than a hundredth of a pixel.
It also reports every highlight it decided was too small to draw and every
label it had to drop, so nothing disappears silently.

Adding a new place:

1. Add the city to `cities` in `places.json`, and its country to `countries` if
   it is not there yet.
2. If the country is large and you want only the state/province highlighted,
   set `highlight: "regions"`, list the region under `regions` using Natural
   Earth's exact spelling, then run `node fetch-admin1-subset.mjs` once.
3. `npm run build`, then look at `../explorations/atlas-map-preview.html`.

## The design decisions baked in

- **Equal Earth projection.** Equal-area, so Africa and China are honestly
  sized. Mercator would teach a nine-year-old that Greenland rivals Africa.
- **Antarctica dropped, frame cropped to 58°S–84°N.** Nothing in SteamHead's
  history is down there, and cropping gives the inhabited world real screen
  area back.
- **Dark ocean, light land.** The inversion is what lets the yellow highlights
  and the pins carry to the back of the room.
- **Four land fills, computed.** A DSATUR 4-colouring over the shared-border
  graph, so no two neighbours ever match. The fills are spread on *lightness*,
  not only hue, because hue is the first thing a washed-out screen throws away.
- **Provinces, not whole countries, for the big ones.** California and Texas
  are yellow; the rest of the USA is not. Small countries are filled whole.
  **No admin-1 boundary is drawn anywhere**, so a highlighted state reads as a
  patch inside its country instead of looking like a new country.
- **Labels only for countries we have taught in**, plus three ocean names.
  Ocean names are stacked over two lines because the Atlantic is far narrower
  than one line of 46px type.
- **Deliberate simplification.** 1:50m coastline detail is visual noise at 30
  feet, and micro-islands below a few square pixels are dropped entirely.
- **Type is tiered, honestly.** At 30 feet the country labels are *not*
  comfortably readable — they serve the teacher and the front of the room. What
  survives the back row is the yellow and the shapes. The squint test in
  `../explorations/atlas-map-preview.html` shows exactly what each row sees.

## Framing: Pacific-centred (decided 2026-09-02)

Central meridian **145.5°E**. San Francisco and Shenzhen face each other across
one ocean, which is the SteamHead story. Three consequences, accepted knowingly:

- The European cities sit in the left third of the map. Their labels are placed
  out in open water with leader lines and do not collide, but Europe is busier
  than it is on an Atlantic-centred map.
- **No Atlantic ocean label.** In this framing the Atlantic is split across
  both edges, and neither piece is wide enough for the type. The build says so
  rather than shipping half a word.
- **Greenland is drawn split**, most of it beside Canada and a wedge at the
  opposite edge. That is what a Pacific-centred world map does. It is reported,
  not fixed: trimming the small side would delete a third of Greenland, and the
  general "drop the smaller piece" rule that would do it automatically was
  tried and abandoned because it also deletes French Guiana and a quarter of
  New Zealand. Only genuine artifacts go in `DROPPED_COUNTRIES`, by hand.

Why 145.5 and not a round 145: a framing's seam is at `centralMeridian − 180`,
and land *east* of the seam wraps to the far side of the map. At 145°E the seam
lands at 35°W, which is 0.2° west of Brazil's easternmost point — so the
Brazilian nose was being clipped off to the opposite edge as a 3-pixel speck.
145.5°E puts the seam at 34.5°W, just clear of it.

`atlantic` is still generated so the preview page can show the two side by
side. If that comparison stops being useful, delete the variant's entry from
`VARIANTS` in the generator and the file it produces.

## Zooming: what this map can and cannot do

The Atlas zooms when you click a pin (see `docs/decisions.md` D27), and the
zoom is **capped at 6×**. That cap is a property of this map, so it belongs
here:

- Geometry is simplified for projection, so coastlines are straight lines below
  roughly 20 km. Past ~10× the outline is visibly polygonal.
- The country labels and city dots are **baked into the SVG** and therefore
  scale with it. By 8× the word "USA" fills the screen; by 20× a city dot is a
  blob covering its own state.

Rendered at 4×, 8×, 20× and 60× to check: it reads at 4–6× and is a flat field
of colour by 20×. So a request to "zoom to a 1 km area" cannot be satisfied by
this base map, and the Atlas separates close pins by grouping and listing them
instead. If deeper zoom is ever genuinely needed, the fix is a second SVG
variant with the `labels` and `cities` layers omitted, swapped in while zoomed.
