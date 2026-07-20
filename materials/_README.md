# Materials

Canonical ids for the physical materials hexagons reference. Every `materials:`
entry in a hexagon should use an id from this list. Validation is **soft-warn**
(a typo or new material warns but doesn't block authoring) — when you add a new
material, add its id here too.

Why a registry: materials are referenced by every hexagon, so a canonical list
prevents drift (we had `leds` and `leds-assorted-colors` as two ids for one
thing). Later, each id can carry a prep note or a printable-PDF link (e.g.
constraint cards).

## The list

| id | what it is |
|---|---|
| paper | plain paper |
| cardboard | corrugated cardboard |
| card-stock | heavier card / foam core |
| scissors | scissors |
| cardboard-cutters | safety cardboard knives |
| tape | general tape |
| blue-tape | painter's / masking tape |
| copper-tape | conductive copper tape |
| hot-glue-guns | hot glue guns |
| hot-glue | glue sticks for the gun |
| glue-sticks | school glue sticks |
| rulers | rulers |
| meterstick | meter stick |
| crayons | crayons |
| string | string / yarn |
| popsicle-sticks | craft sticks |
| foil | aluminum foil |
| weights | cans or weights for load tests |
| timer | visible timer |
| coin-batteries | CR2032 coin cells |
| leds | LEDs (single color or assorted — one id) |
| alligator-clips | alligator-clip leads |
| makeymakey-kits | MakeyMakey kits |
| laptops | student laptops |
| control-worksheets | printed control-practice worksheets |
| metal-objects | assorted conductive test objects |
| black-fabric | black fabric (backdrop / craft) |
| constraint-cards | printed design-constraint cards (James-owned; printable PDF TBD) |

New materials: add a row, keep ids lowercase-hyphenated, prefer the shortest
clear name. Merge synonyms rather than adding near-duplicates.
