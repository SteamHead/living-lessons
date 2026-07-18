# Protocols

Reusable classroom **methods** — ways of doing a thing that repeat across many
lessons: sharing routines, feedback structures, grouping strategies, reflection
formats. A protocol is written once and referenced by id from any phase of any
hexagon, so improving the protocol improves every lesson that uses it (the same
library logic as `skills/` and `hexagons/`).

Protocols are **cross-phase**: a Gallery Walk is a Share method *and* a Test-phase
feedback method; a Partner Share works in Reflect and in Share. Don't file a
protocol under one phase — tag the phases it suits.

## Frontmatter

```yaml
id: pbl-carousel-walk          # stable slug
title: Carousel Walk
kind: sharing                  # sharing | feedback | grouping | reflection
phases: [share, reflect]       # phases this method suits (does not restrict use)
group_size: small-groups       # solo | pairs | small-groups | whole-class | stations
time: "10-15 min"
prep: low                      # none | low | medium
grades: ["K","1","2","3","4","5"]
noise: medium                  # quiet | medium | loud  (teachers plan around this)
source: "PBL sharing methods"
flags: []
```

## Body sections

1. **In a sentence** — what it is, plainly.
2. **Why use it** — when this method beats the alternatives.
3. **Steps** — numbered, teacher-facing, runnable as-is.
4. **Teacher moves** — what to model, watch for, or narrate.
5. **Make it smaller / bigger** — a floor version and an extension, mirroring
   the hexagon Floor & Ceiling idea.

## Referencing a protocol from a hexagon

In a phase, name the protocol by id; the Living Lessons app renders its steps
on that phase's slide:

```
Share: pbl-carousel-walk
```

## Rules

- No names of people anywhere (public repo, D6).
- Steps must be runnable by a teacher who has never seen the method before.
- Keep it to one screen — a protocol is a method, not a lesson.
