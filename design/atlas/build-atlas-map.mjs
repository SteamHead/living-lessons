/**
 * build-atlas-map.mjs — generates the Atlas world map SVG.
 *
 *   npm install && npm run build
 *
 * Inputs
 *   node_modules/world-atlas/countries-50m.json  Natural Earth 1:50m countries
 *   admin1-subset.geojson                        trimmed provinces (see fetch-admin1-subset.mjs)
 *   places.json                                  where SteamHead has taught
 *
 * Outputs (this folder)
 *   atlas-map-pacific.svg    central meridian 145°E — Pacific in the middle
 *   atlas-map-atlantic.svg   central meridian 10°W  — the familiar arrangement
 *   atlas-projection.json    the numbers a host page needs to place its own pins
 *
 * Design decisions worth knowing before you change anything:
 *
 *  - PROJECTION is Equal Earth (Šavrič/Patterson/Jenny 2019): equal-area, so
 *    Africa and China are honestly sized, unlike Mercator. Kids should not
 *    learn a lie about how big Greenland is.
 *  - ANTARCTICA is dropped and the frame is cropped to 58°S–84°N. Nothing in
 *    SteamHead's history is down there and it buys back real screen area for
 *    the inhabited world.
 *  - COUNTRY FILLS are a DSATUR 4-colouring computed from shared borders, so
 *    no two neighbours ever share a fill. The four fills differ in LIGHTNESS
 *    as much as hue, because hue is the first thing a washed-out screen loses.
 *  - HIGHLIGHTS (where we taught) are brand yellow and the only saturated
 *    colour on the land. Provinces are highlighted with NO border of their
 *    own — no admin-1 boundary is drawn anywhere on this map — so a
 *    highlighted state reads as a patch inside its country, not a new country.
 *  - SIMPLIFICATION is deliberate, not just thrift. 1:50m coastline detail is
 *    visual noise at 30 feet; the simplified outline reads as a poster.
 *  - EVERY COUNTRY IS DRAWN ONCE, into <defs>, and referenced by <use> for the
 *    fill, the border, and (for small countries) the highlight. That halves
 *    the file, and it keeps the borders honest: a micro-island dropped from
 *    the land layer cannot leave an orphaned coastline behind.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { geoEqualEarth, geoPath, geoGraticule10 } from "d3-geo";
import { feature, neighbors } from "topojson-client";
import { presimplify, simplify } from "topojson-simplify";

const here = (p) => new URL(p, import.meta.url);
const read = (p) => JSON.parse(readFileSync(here(p), "utf8"));

/* ---------------------------------------------------------------- palette */
/* Ordered light -> dark, and spread WIDE on lightness: hue is the first thing
   a washed-out projector or a sunlit classroom takes away, lightness is the
   last to go. Every pair also has a dark border drawn between it. */
const LAND = ["#F4EEE0", "#CDC4AC", "#9FB0A9", "#77878F", "#5E6E77"];
const OCEAN = "#1E5C6B";       /* darkened brand teal — dark water, light land */
const OCEAN_EDGE = "#15454F";
const INK = "#2E3A3E";         /* country borders */
const HL = "#F1D302";          /* SteamHead yellow — "we taught here" */
const HL_PLANNED = "#F2B705";  /* hollow outline — "coming soon" */
const DOT = "#EF7B44";         /* city dots — brand accent orange */

/* ------------------------------------------------------------------ frame */
const W = 1920;
const PAD = 24;
const LAT_TOP = 84;          /* keeps all of Greenland */
const LAT_BOTTOM = -58;      /* keeps Tierra del Fuego, drops Antarctica */
const SIMPLIFY = 8e-3;       /* spherical steradians; see the note above */
const MIN_LAND_AREA = 6;     /* px² — below this a landmass is pixel noise */
const MIN_HL_AREA = 90;      /* px² — below this, let the city dot speak instead */

const ANTARCTICA = "010";

/* --------------------------------------------------------------- geometry */
const topo = simplify(presimplify(read("./node_modules/world-atlas/countries-50m.json")), SIMPLIFY);
const admin1 = read("./admin1-subset.geojson");
const places = read("./places.json");

const geoms = topo.objects.countries.geometries.filter((g) => g.id !== ANTARCTICA);
const countryFeatures = feature(topo, { type: "GeometryCollection", geometries: geoms }).features;

/* Map colouring from shared borders. topojson's neighbors() reads adjacency out
   of shared arcs, which is exact — no distance guessing.
   DSATUR (colour the most-constrained country next) finds a 4-colouring where
   plain greedy does not. Randomised restarts mop up the rest. Only if every
   attempt fails do we spend a fifth fill, and then we name the country that
   forced it, because that is a map-quality regression worth seeing. */
function colourMap(geometries) {
  const adj = neighbors(geometries);
  const n = geometries.length;

  function dsatur(limit, tieBreak) {
    const colour = new Array(n).fill(-1);
    const tally = new Array(limit).fill(0);
    const seen = Array.from({ length: n }, () => new Set());
    for (let step = 0; step < n; step++) {
      let best = -1, bestSat = -1, bestDeg = -1, bestTie = -1;
      for (let i = 0; i < n; i++) {
        if (colour[i] !== -1) continue;
        const sat = seen[i].size, deg = adj[i].length, tie = tieBreak(i);
        if (sat > bestSat || (sat === bestSat && deg > bestDeg) ||
            (sat === bestSat && deg === bestDeg && tie > bestTie)) {
          best = i; bestSat = sat; bestDeg = deg; bestTie = tie;
        }
      }
      /* Among the legal colours, take the one used least so far. Taking the
         lowest index instead lets one fill swallow half the world, and then
         the map stops looking coloured at all. */
      let pick = -1, pickCount = Infinity;
      for (let c = 0; c < limit; c++) {
        if (seen[best].has(c)) continue;
        if (tally[c] < pickCount) { pick = c; pickCount = tally[c]; }
      }
      if (pick === -1) return null;
      colour[best] = pick;
      tally[pick]++;
      for (const nb of adj[best]) seen[nb].add(pick);
    }
    return colour;
  }

  /* Deterministic first, so a clean build is reproducible byte for byte. */
  let colour = dsatur(4, (i) => i);
  if (!colour) {
    /* Seeded LCG, not Math.random — the SVG in git must not churn per run. */
    let seed = 20260902;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    for (let attempt = 0; attempt < 4000 && !colour; attempt++) {
      const jitter = Array.from({ length: n }, () => rnd());
      colour = dsatur(4, (i) => jitter[i]);
    }
  }
  if (colour) return { colour, used: 4 };

  const five = dsatur(5, (i) => i);
  if (!five) throw new Error("Even five land colours were not enough — check the adjacency graph.");
  const forced = geometries.filter((_, i) => five[i] === 4).map((g) => g.properties.name);
  return { colour: five, used: 5, forced };
}
const { colour: colourOf, used: coloursUsed, forced: forcedFifth } = colourMap(geoms);
const spread = LAND.map((_, i) => colourOf.filter((c) => c === i).length).filter(Boolean);
console.log(
  `Land colouring: ${coloursUsed} fills, ${spread.join("/")} countries each` +
    (forcedFifth?.length ? ` (5th forced by: ${forcedFifth.join(", ")})` : " — no two neighbours match")
);

/* ------------------------------------------------- path cleanup utilities */
/* d3.geoPath emits polygons as "M x,y L x,y ... Z", so subpaths can be split on
   M and measured with the shoelace formula. Dropping the small ones is the
   single biggest legibility win on a projected world map. */
function subpaths(d) {
  if (!d) return [];
  return d.split("M").slice(1).map((chunk) => {
    const pts = chunk
      .replace(/Z\s*$/, "")
      .split("L")
      .map((s) => s.split(",").map(Number))
      .filter((p) => p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
    let a = 0;
    for (let i = 0, n = pts.length; i < n; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % n];
      a += x1 * y2 - x2 * y1;
    }
    return { d: "M" + chunk, area: pts.length < 3 ? 0 : Math.abs(a) / 2 };
  });
}
const clean = (d, minArea) => subpaths(d).filter((s) => s.area >= minArea).map((s) => s.d).join("");
const totalArea = (d) => subpaths(d).reduce((n, s) => n + s.area, 0);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const n1 = (v) => Number(v.toFixed(1));

/* --------------------------------------------------------- label layout */
/* Type sizes, kept in one place because everything below measures against them. */
const OCEAN_SIZE = 46, OCEAN_TRACK = 0.22;
const COUNTRY_SIZE = 38;
/* Varela Round is fairly wide; 0.55em per character matches it closely enough
   for collision boxes. Being slightly generous here is the safe direction. */
const charWidth = (size, tracking = 0) => size * (0.55 + tracking);
const LINE_HEIGHT = 1.02;
/* Ocean names are set stacked — "ATLANTIC" over "OCEAN" — because the Atlantic
   is only about 60° wide at its widest and one line of 46px type is far wider
   than that. Stacked ocean names are ordinary atlas practice, and they keep the
   type big enough to read across the room. */
const boxFor = (lines, size, tracking, x, y) => {
  const rows = Array.isArray(lines) ? lines : [lines];
  return {
    w: Math.max(...rows.map((r) => r.length)) * charWidth(size, tracking),
    h: size * LINE_HEIGHT * rows.length,
    lines: rows,
    x, y,
  };
};
/* Renders a box's lines centred on its own y, so a two-line ocean name is
   vertically centred on the point places.json nominated. */
const textEl = (box, cls, size) => {
  const first = -((box.lines.length - 1) / 2) * size * LINE_HEIGHT;
  const spans = box.lines
    .map((line, i) =>
      `<tspan x="${n1(box.x)}" dy="${i === 0 ? n1(first + size * 0.34) : n1(size * LINE_HEIGHT)}">${esc(line)}</tspan>`
    )
    .join("");
  return `<text class="${cls}" x="${n1(box.x)}" y="${n1(box.y)}">${spans}</text>`;
};
const overlaps = (a, b, gap) =>
  Math.abs(a.x - b.x) * 2 < a.w + b.w + gap && Math.abs(a.y - b.y) * 2 < a.h + b.h + gap;

/* Nudge overlapping labels apart. Anchors in places.json are the intent; this
   only resolves what actually collides, so hand-placed labels stay put and a
   newly added country cannot silently land on top of an existing one.
   Ocean labels are immovable — they are the biggest type on the map and they
   sit in genuinely empty water, so the country labels are the ones that give. */
function relaxLabels(movable, fixed, frame, gap = 10) {
  for (let pass = 0; pass < 200; pass++) {
    let moved = false;
    for (let i = 0; i < movable.length; i++) {
      const a = movable[i];
      const others = [...movable.slice(0, i), ...movable.slice(i + 1), ...fixed];
      for (const b of others) {
        if (!overlaps(a, b, gap)) continue;
        const overlapY = (a.h + b.h + gap) / 2 - Math.abs(a.y - b.y);
        const overlapX = (a.w + b.w + gap) / 2 - Math.abs(a.x - b.x);
        /* Prefer vertical separation: horizontal room is what a world map is
           short of, and a column of labels reads better than a row anyway. */
        if (overlapY <= overlapX) {
          a.y += (a.y >= b.y ? 1 : -1) * Math.max(overlapY / 2, 0.5);
        } else {
          a.x += (a.x >= b.x ? 1 : -1) * Math.max(overlapX / 2, 0.5);
        }
        moved = true;
      }
      a.x = Math.min(Math.max(a.x, a.w / 2 + 6), frame.w - a.w / 2 - 6);
      a.y = Math.min(Math.max(a.y, a.h / 2 + 6), frame.h - a.h / 2 - 6);
    }
    if (!moved) break;
  }
  return movable;
}

/* Where a leader line should meet its label: the point on the label's box edge
   facing the country, so the line never crosses the text. */
function boxEdgeToward(box, tx, ty) {
  const dx = tx - box.x, dy = ty - box.y;
  if (!dx && !dy) return [box.x, box.y];
  const sx = dx ? (box.w / 2 + 4) / Math.abs(dx) : Infinity;
  const sy = dy ? (box.h / 2 + 4) / Math.abs(dy) : Infinity;
  const t = Math.min(sx, sy, 1);
  return [box.x + dx * t, box.y + dy * t];
}

/* ------------------------------------------------------------------ build */
function buildMap({ centralMeridian }) {
  /* Fit the whole sphere to the width, then crop vertically to the latitude
     band we care about. clipExtent crops in screen space, which is also what
     gives the sphere outline its flat top and bottom. */
  const projection = geoEqualEarth()
    .rotate([-centralMeridian, 0])
    .fitWidth(W - PAD * 2, { type: "Sphere" });

  const yTop = projection([centralMeridian, LAT_TOP])[1];
  const yBottom = projection([centralMeridian, LAT_BOTTOM])[1];
  const [tx, ty] = projection.translate();
  projection.translate([tx, ty - yTop + PAD]);
  const H = Math.round(yBottom - yTop + PAD * 2);
  projection.clipExtent([[0, 0], [W, H]]);

  const path = geoPath(projection).digits(1);
  const inFrame = (p) => p && Number.isFinite(p[0]) && p[0] >= 0 && p[0] <= W && p[1] >= 0 && p[1] <= H;

  /* --- one definition per country --------------------------------------- */
  const defs = [];
  const drawn = new Map(); /* iso_n3 -> element id, for countries actually on the map */
  countryFeatures.forEach((f, i) => {
    const d = clean(path(f), MIN_LAND_AREA);
    if (!d) return;
    const id = `n${f.id}`;
    defs.push(`<path id="${id}" d="${d}"/>`);
    drawn.set(String(f.id), { id, feature: f, colour: colourOf[i] });
  });

  /* --- highlights ------------------------------------------------------- */
  const admin1ByKey = new Map(
    admin1.features.map((f) => [`${f.properties.iso_n3}|${f.properties.name}`, f])
  );
  const hl = { taught: [], planned: [] };
  const skipped = [];

  for (const c of places.countries) {
    const bucket = hl[c.status === "planned" ? "planned" : "taught"];

    if (c.highlight === "whole") {
      const entry = drawn.get(c.iso_n3);
      if (!entry) throw new Error(`No geometry on the map for ${c.label} (iso_n3 ${c.iso_n3})`);
      const area = totalArea(path(entry.feature));
      if (area < MIN_HL_AREA) { skipped.push(`${c.label} (${Math.round(area)}px² — dot only)`); continue; }
      bucket.push(`<use href="#${entry.id}"/>`);
    } else if (c.highlight === "regions") {
      for (const r of c.regions ?? []) {
        const f = admin1ByKey.get(`${c.iso_n3}|${r}`);
        if (!f) throw new Error(`Missing region "${r}" for ${c.label}. Re-run fetch-admin1-subset.mjs.`);
        const d = clean(path(f), MIN_LAND_AREA);
        if (!d) { skipped.push(`${c.label} · ${r} (outside the frame)`); continue; }
        const area = totalArea(d);
        if (area < MIN_HL_AREA) { skipped.push(`${c.label} · ${r} (${Math.round(area)}px² — dot only)`); continue; }
        bucket.push(`<path d="${d}"/>`);
      }
    }
  }

  /* --- labels ----------------------------------------------------------- */
  /* Ocean labels are placed first and never move; they are the anchors of the
     composition. One that lands in the compressed margin is dropped rather
     than shown half cut off — in a Pacific-centred frame the Atlantic really
     is at the edge, and a sliver of the word "ATLANTIC" is worse than none. */
  const EDGE = W * 0.06;
  const oceanBoxes = [];
  for (const o of places.oceans) {
    const p = projection(o.at);
    if (!inFrame(p)) { skipped.push(`ocean label "${o.label}" (outside the frame)`); continue; }
    const box = boxFor(o.label.split(/\s+/), OCEAN_SIZE, OCEAN_TRACK, p[0], p[1]);
    if (box.x - box.w / 2 < EDGE || box.x + box.w / 2 > W - EDGE) {
      skipped.push(`ocean label "${o.label}" (would be cut off at the frame edge)`);
      continue;
    }
    oceanBoxes.push(box);
  }

  const countryBoxes = [];
  for (const c of places.countries) {
    const entry = drawn.get(c.iso_n3);
    const anchor = c.label_at ? projection(c.label_at) : entry && path.centroid(entry.feature);
    if (!inFrame(anchor)) { skipped.push(`label "${c.label}" (anchor outside the frame)`); continue; }
    const target = entry && path.centroid(entry.feature);
    countryBoxes.push({
      ...boxFor([c.label], COUNTRY_SIZE, 0, anchor[0], anchor[1]),
      label: c.label,
      planned: c.status === "planned",
      target: inFrame(target) ? target : null,
    });
  }
  relaxLabels(countryBoxes, oceanBoxes, { w: W, h: H });

  const collisions = [];
  for (let i = 0; i < countryBoxes.length; i++) {
    for (let j = i + 1; j < countryBoxes.length; j++) {
      if (overlaps(countryBoxes[i], countryBoxes[j], 0)) {
        collisions.push(`${countryBoxes[i].label} / ${countryBoxes[j].label}`);
      }
    }
  }

  const oceanLabels = oceanBoxes.map((b) => textEl(b, "ocean-label", OCEAN_SIZE));

  /* A leader is drawn whenever the label ended up away from its country —
     either because places.json parked it in open water on purpose, or because
     the relax pass had to move it. Below that distance the label is sitting on
     its own country and a line would just be clutter. */
  const LEADER_MIN = 72;
  const leaders = [];
  /* A leader that spans a third of the map is not a leader, it is a mistake:
     it means the label's anchor longitude fell on the far side of this
     framing's seam. Say so rather than drawing a line across the Pacific. */
  const LEADER_MAX = W * 0.3;
  const countryLabels = countryBoxes.map((b) => {
    const reach = b.target ? Math.hypot(b.target[0] - b.x, b.target[1] - b.y) : 0;
    if (reach > LEADER_MAX) {
      skipped.push(`leader for "${b.label}" (${Math.round(reach)}px — label_at is on the far side of the seam for this framing)`);
    } else if (b.target && reach > LEADER_MIN) {
      const [ex, ey] = boxEdgeToward(b, b.target[0], b.target[1]);
      leaders.push(
        `<line x1="${n1(ex)}" y1="${n1(ey)}" x2="${n1(b.target[0])}" y2="${n1(b.target[1])}"/>` +
        `<circle cx="${n1(b.target[0])}" cy="${n1(b.target[1])}" r="4"/>`
      );
    }
    return textEl(b, `country-label${b.planned ? " planned" : ""}`, COUNTRY_SIZE);
  });

  /* --- city dots -------------------------------------------------------- */
  const dots = places.cities
    .map((ct) => {
      const p = projection([ct.lng, ct.lat]);
      if (!inFrame(p)) return null;
      return `<circle class="city${ct.status === "planned" ? " planned" : ""}" cx="${n1(p[0])}" cy="${n1(p[1])}" r="8"><title>${esc(ct.name)}</title></circle>`;
    })
    .filter(Boolean);

  /* --- assemble --------------------------------------------------------- */
  const hemisphere = `${Math.abs(centralMeridian)}°${centralMeridian < 0 ? "W" : "E"}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"
  role="img" aria-labelledby="atlas-title atlas-desc" class="atlas-map"
  data-central-meridian="${centralMeridian}" data-scale="${projection.scale()}"
  data-translate="${projection.translate().map(n1).join(",")}">
<title id="atlas-title">World map of everywhere SteamHead has taught</title>
<desc id="atlas-desc">Equal Earth projection centred on ${hemisphere}. Countries where SteamHead has run classes are labelled and filled in yellow; a dot marks each city. Antarctica is not shown.</desc>
<style>
  /* Type sizes live here on purpose. Retune for a given screen by editing this
     block, or override these classes from the host page — no rebuild needed.
     Sized for a 1920-wide render: at that size a 38px label is about 20mm tall
     on an 85" TV, comfortable to roughly the middle of a 30-foot room. The
     yellow highlights, not the labels, are what carry the map from the back. */
  .atlas-map text { font-family: 'Varela Round', system-ui, sans-serif; text-anchor: middle; }
  .atlas-map .ocean-label {
    font-size: ${OCEAN_SIZE}px; letter-spacing: ${OCEAN_TRACK}em; fill: #8FC5CE; fill-opacity: 0.85;
  }
  .atlas-map .country-label {
    font-size: ${COUNTRY_SIZE}px; fill: #1B2528;
    paint-order: stroke; stroke: #FFFFFF; stroke-width: 7px; stroke-linejoin: round;
  }
  .atlas-map .country-label.planned { fill: #46545A; }
  .atlas-map .leaders { stroke: #1B2528; stroke-opacity: 0.7; fill: #1B2528; fill-opacity: 0.7; }
  .atlas-map .leaders line { stroke-width: 3px; }
  .atlas-map .leaders circle { stroke: none; }
  .atlas-map .city { fill: ${DOT}; stroke: #FFFFFF; stroke-width: 3px; }
  .atlas-map .city.planned { fill: #FFFFFF; stroke: ${DOT}; stroke-width: 4px; }
</style>

<defs>
${defs.join("\n")}
</defs>

<g class="ocean">
  <path d="${path({ type: "Sphere" })}" fill="${OCEAN}" stroke="${OCEAN_EDGE}" stroke-width="3"/>
  <path d="${path(geoGraticule10())}" fill="none" stroke="#FFFFFF" stroke-opacity="0.09" stroke-width="1.5"/>
</g>

<g class="land">
${[...drawn.values()].map((e) => `<use href="#${e.id}" fill="${LAND[e.colour]}"/>`).join("\n")}
</g>

<g class="highlight-taught" fill="${HL}">
${hl.taught.join("\n")}
</g>

<g class="highlight-planned" fill="none" stroke="${HL_PLANNED}" stroke-width="5" stroke-dasharray="15 11">
${hl.planned.join("\n")}
</g>

<g class="borders" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round">
${[...drawn.values()].map((e) => `<use href="#${e.id}"/>`).join("\n")}
</g>

<g class="leaders">
${leaders.join("\n")}
</g>

<g class="labels">
${oceanLabels.join("\n")}
${countryLabels.join("\n")}
</g>

<g class="cities">
${dots.join("\n")}
</g>
</svg>
`;

  const params = {
    projection: "equalEarth",
    centralMeridian,
    scale: projection.scale(),
    translate: projection.translate(),
    viewBox: [0, 0, W, H],
    latitudeRange: [LAT_BOTTOM, LAT_TOP],
  };
  return { svg, params, H, skipped, collisions };
}

/* --------------------------------- verify the portable pin projection ---- */
/* The host page places its own class pins with a hand-rolled Equal Earth
   forward transform (no d3 at runtime). If that ever drifts from d3, pins land
   in the sea — so check it here, at build time, against d3 itself. Keep this
   function and the copy in the host page identical. */
/* Deliberately self-contained — every constant is declared inside the body —
   because this function is serialised with toString() into
   atlas-projection.js. The host page and this verification therefore run the
   same characters, and there is no second copy to fall out of date. */
function portableProject(lng, lat, { centralMeridian, scale, translate }) {
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796;
  const M = Math.sqrt(3) / 2;
  const rel = (((lng - centralMeridian + 180) % 360) + 360) % 360 - 180;
  const lambda = (rel * Math.PI) / 180;
  const t = Math.asin(M * Math.sin((lat * Math.PI) / 180));
  const t2 = t * t, t6 = t2 * t2 * t2;
  const x = (lambda * Math.cos(t)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
  const y = t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
  return [translate[0] + scale * x, translate[1] - scale * y];
}

function verifyPins(params) {
  const d3proj = geoEqualEarth()
    .rotate([-params.centralMeridian, 0])
    .scale(params.scale)
    .translate(params.translate);
  let worst = 0, worstAt = null;
  const probes = [
    ...places.cities.map((c) => [c.lng, c.lat]),
    [0, 0], [-179.5, -57], [179.5, 83], [180, 0], [-180, 0],
  ];
  for (const [lng, lat] of probes) {
    const a = d3proj([lng, lat]);
    const b = portableProject(lng, lat, params);
    const err = Math.hypot(a[0] - b[0], a[1] - b[1]);
    if (err > worst) { worst = err; worstAt = [lng, lat]; }
  }
  return { worst, worstAt };
}

/* ------------------------------------------------------------------- main */
const VARIANTS = [
  { name: "pacific", centralMeridian: 145 },
  { name: "atlantic", centralMeridian: -10 },
];

const allParams = {};
for (const v of VARIANTS) {
  const { svg, params, H, skipped, collisions } = buildMap(v);
  writeFileSync(here(`./atlas-map-${v.name}.svg`), svg);
  allParams[v.name] = params;
  const { worst, worstAt } = verifyPins(params);
  console.log(`\natlas-map-${v.name}.svg  ${W}×${H}  centre ${v.centralMeridian}°  ${(svg.length / 1024).toFixed(0)} KB`);
  console.log(`  pin transform vs d3: max error ${worst.toFixed(4)} px${worst > 0.005 ? ` at ${JSON.stringify(worstAt)}` : ""}`);
  if (worst > 0.01) throw new Error("Portable Equal Earth transform disagrees with d3 — fix before shipping pins.");
  if (skipped.length) console.log(`  not drawn: ${skipped.join("; ")}`);
  if (collisions.length) {
    console.log(`  LABELS STILL OVERLAPPING — nudge label_at in places.json: ${collisions.join("; ")}`);
  }
}

writeFileSync(here("./atlas-projection.json"), JSON.stringify(allParams, null, 2) + "\n");

/* A host page needs two things to drop a pin: the projection numbers for the
   variant it is showing, and the forward transform. Emitting both as one plain
   script — no modules, no bundler, no fetch, so it works over file:// too —
   keeps the runtime honest: the transform below is the very function this
   build just checked against d3. Do not hand-edit; run npm run build. */
const runtime = `/* GENERATED by build-atlas-map.mjs — do not edit. */
(function (global) {
  var PARAMS = ${JSON.stringify(allParams, null, 2)};

  ${portableProject.toString().split("\n").join("\n  ")}

  global.AtlasMap = {
    params: PARAMS,
    /* Returns [x, y] in the SVG's own viewBox units. Multiply by
       (displayedWidth / viewBox width) to get CSS pixels. */
    project: function (lng, lat, variant) {
      var p = PARAMS[variant];
      if (!p) throw new Error('Unknown Atlas map variant: ' + variant);
      return portableProject(lng, lat, p);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
`;
writeFileSync(here("./atlas-projection.js"), runtime);
console.log("\natlas-projection.json + atlas-projection.js written");
