---
id: hex-microbit-counter
legacy_number: 39
title: micro:bit — Build a Counter
badges:
  - id: electronic-sensors
    level: 3
  - id: robotics-coding
    level: 3
skills_touched: [managing-digital-media, reflection, gather-feedback, brainstorm]
grades: ["4", "5"]
audience: self
sessions: 1
build_time: "30-40 min"
sequence:
  before: [hex-microbit-inputs-dice]
  after: [hex-campus-sensor-network]
project_tags: [microbit, coding, electronics, sensors, counter, data, independence]
materials: [microbits, laptops, usb-cables, batteries, alligator-clips]
reflection_default: tier2
status: draft
flags:
  [
    "AI draft consolidating deck Hexagons 39 (Step Counter) and 40 (Touch Sensor Counter) — both build a counter driven by a sensor input; #40 adds the pin-1 touch/alligator-clip input and drops the tutorial (independence stretch). Merged as one hexagon with the touch pin as the Ceiling.",
    "TWO badges by design (D8 allows up to three): Electronic Sensors L3 for the shake-sensor-and-data build; Robotics Coding L3 for motion input + install-it-in-a-game framing (its rubric wording: 'accept button or motion input... install it somewhere real — a game'). If a class only does the step counter and never games/installs it, drop Robotics Coding and keep Electronic Sensors L3 alone.",
    "DEPENDS ON BATCH 1: Electronic Sensors ladder is batch-1 branch only. Sequence batch-1 before batch-2. Robotics Coding is canonical in main already.",
    "makecode step-counter tutorial URL (makecode.microbit.org/projects/step-counter) is a live resource — flag gives a link check a home. Grade floor raised to 4 (accelerometer + data reasoning).",
  ]
source: "SHTeam Labs Hexagon PPT 2025-26, Hexagons 39 & 40"
---

## Wonder Question

A fitness watch counts your steps without you telling it each one. How do you
think it knows a step happened?

## Hook

The micro:bit has a motion sensor inside — an accelerometer — that feels
movement. Today you turn that feeling into a number that goes UP. Once you can
make a number climb on command, you've built the core of a scoreboard, a
pedometer, a game — anything that keeps count. And the stretch: making it count
from a touch you wire yourself, with no tutorial to lean on.

## Mini-Lesson

Two minutes. Open the step-counter project on makecode
(makecode.microbit.org/projects/step-counter). Notice the idea: a **variable**
is a box that holds a number; *on shake*, the code adds one to the box and
shows it. Name the moving parts — input (shake), the counting box, the output
(the number on the LEDs). Everything else you get from the tutorial.

## The Challenge

**Your goal:** Build a working counter that goes up when the micro:bit senses
movement — then test it by actually moving.

**Teacher goal:** See who reasons about *why* a count is off (double-counts, a
too-gentle shake), who adds a feature past the tutorial, and who helps without
taking over someone else's board.

**Requirements:**
- Step counter built and climbing — walk in place or move it and the number
  rises
- You tested it and can say whether it counts accurately, and why or why not
- Stretch reached OR attempted: a second way to add to the count (button A, or
  the pin-1 touch input) — say which and what happened
- You can name the input, the counting box, and the output
- Devices and clips returned — count the clips

**Constraints:**
- Tutorial + peer before teacher for the step-counter build; the touch-pin
  stretch has NO tutorial on purpose — figure it out from the blocks
- Blocks only

## Floor & Ceiling

*Floor:* the step-counter tutorial completed and counting, with the parts
named, is the full Electronic Sensors rung on its own. *Ceiling (the touch
counter):* find the pin-touch block under Advanced → Pins → More, wire an
alligator clip to pin 1, and count by touching the clip's end — then test the
limit: does it still count if you hold one end and a friend touches you? Design
where this counter would live in a real game and install it there (that install
is what earns the Robotics Coding rung).

## Badge Evidence

- *Electronic Sensors L3:* student loads their own block program where a
  sensor input (shake, or a wired touch on pin 1) drives an output (the rising
  count), completing the guided step-counter tutorial and reasoning about the
  count's accuracy.
- *Robotics Coding L3:* student uses the micro:bit to accept motion or touch
  input and complete a guided project, then puts it to real use — a counter
  installed in a game or scoreboard, not just run once. (Claim this only if the
  install/use step actually happens; see flags.)

## Reflection Menu

- **Tier 1:** Thumbs — did your counter count accurately? Raise your hand if
  you got a SECOND way to add to the count working.
- **Tier 2:** Table round — describe a game that could use a counter, and say
  which input you'd use to score it. Teacher check-in: anyone quietly stuck on
  the no-tutorial stretch? (Independent work can hide frustration — ask.)
- **Tier 3:** Google Classroom video of your counter climbing, plus one
  sentence: how could you learn the next micro:bit trick without a teacher?
