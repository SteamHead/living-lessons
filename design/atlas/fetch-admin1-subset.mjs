/**
 * fetch-admin1-subset.mjs — run this ONLY when places.json gains a new region.
 *
 * Downloads Natural Earth 1:50m admin-1 (states / provinces / prefectures),
 * keeps just the units named in places.json, and writes the trimmed result to
 * admin1-subset.geojson. That trimmed file is committed, so build-atlas-map.mjs
 * never needs the network.
 *
 * Usage: node fetch-admin1-subset.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/" +
  "ne_50m_admin_1_states_provinces_lakes.geojson";

const places = JSON.parse(readFileSync(new URL("./places.json", import.meta.url)));

// iso_n3 -> alpha-2, for the countries we pull regions from. Natural Earth's
// admin-1 file keys on alpha-2, places.json keys on numeric (to match TopoJSON ids).
const ALPHA2 = { "840": "US", "124": "CA", "156": "CN", "360": "ID" };

const wanted = new Map(); // "US|California" -> true
for (const c of places.countries) {
  if (c.highlight !== "regions") continue;
  const a2 = ALPHA2[c.iso_n3];
  if (!a2) throw new Error(`No alpha-2 mapping for iso_n3 ${c.iso_n3}; add it to ALPHA2.`);
  for (const r of c.regions ?? []) wanted.set(`${a2}|${r}`, c.iso_n3);
}

console.log(`Fetching ${SRC}`);
const res = await fetch(SRC);
if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
const all = JSON.parse(await res.text());
console.log(`  ${all.features.length} admin-1 features downloaded`);

const found = new Set();
const features = [];
for (const f of all.features) {
  const key = `${f.properties.iso_a2}|${f.properties.name}`;
  const iso_n3 = wanted.get(key);
  if (!iso_n3) continue;
  found.add(key);
  // Keep only the properties the build needs — this file goes into git.
  features.push({
    type: "Feature",
    properties: { name: f.properties.name, iso_a2: f.properties.iso_a2, iso_n3 },
    geometry: f.geometry,
  });
}

const missing = [...wanted.keys()].filter((k) => !found.has(k));
if (missing.length) {
  throw new Error(
    `Not found in Natural Earth 50m admin-1: ${missing.join(", ")}\n` +
      `Check the spelling against the dataset, or set highlight:"whole"/"none" for that country.`
  );
}

const out = new URL("./admin1-subset.geojson", import.meta.url);
writeFileSync(out, JSON.stringify({ type: "FeatureCollection", features }));
console.log(`Wrote ${features.length} regions -> admin1-subset.geojson`);
for (const f of features) console.log(`  ${f.properties.iso_a2} · ${f.properties.name}`);
