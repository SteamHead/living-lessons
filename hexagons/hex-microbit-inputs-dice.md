---
id: hex-microbit-inputs-dice
legacy_number: 37
title: micro:bit — Your Input, Your Output
badges:
  - id: electronic-sensors
    level: 3
skills_touched: [managing-digital-media, reflection, gather-feedback, brainstorm]
grades: ["3", "4", "5"]
audience: self
sessions: 1
build_time: "25-35 min"
sequence:
  before: [hex-microbit-flashing-heart]
  after: [hex-microbit-counter]
project_tags: [microbit, coding, electronics, inputs, dice, independence]
materials: [microbits, laptops, usb-cables, batteries]
reflection_default: tier2
status: draft
flags:
  [
    "AI draft consolidating deck Hexagons 37 (Control the Flash) and 38 (Random Numbers / Dice) — both are 'load your own code, one input drives one output,' which is a single Electronic Sensors L3 rung; merged rather than kept as two near-identical hexagons (per James: some existing ones get eliminated/consolidated).",
    "DEPENDS ON BATCH 1: Badge Evidence cites the merged Electronic Sensors ladder (L3), batch-1 branch only. Sequence batch-1 before batch-2.",
    "Badge Evidence echoes Electronic Sensors L3 (AI-draft post-merge) — re-check if revised.",
    "makecode tutorial names (Dice) are live web resources — flag gives a broken-link check a home.",
  ]
source: "SHTeam Labs Hexagon PPT 2025-26, Hexagons 37 & 38"
---

## Wonder Question

A dice, a light switch, a doorbell — each one waits for something to happen,
then does something back. What's the "something that happens" for each?

## Hook

Yesterday the micro:bit flashed on its own. Today it waits for YOU and responds
— that's the difference between a decoration and a tool. Frame the pattern the
whole class will use: an **input** (you do something) triggers an **output**
(it does something back). Button press, shake, tilt — those are inputs. A
picture, a number, a sound — those are outputs. Your job: wire one to the other.

## Mini-Lesson

Two minutes. Open the Dice tutorial on makecode and notice its shape: *on
shake* (input) → *show random number* (output). Then the hack that unlocks
everything — the input block is swappable. Drag out "on shake," drop in "on
button A pressed," and the same output now answers a different action. That one
move is the whole skill: you decide what triggers what.

## The Challenge

**Your goal:** Build a micro:bit that responds to you — complete the Dice
tutorial, then hack it so a *different* input triggers the roll. Then make one
more input→output pair of your own.

**Teacher goal:** See who experiments with swapping blocks instead of only
following steps, who troubleshoots a program that doesn't behave, and who
shares a discovery with the table.

**Requirements:**
- Dice tutorial working (micro:bit or simulator)
- You changed the input — button, tilt, or logo touch rolls the dice instead
  of shake
- One more pair you invented: some input you choose triggers some output you
  choose
- You can say your program out loud as "when I ___, it ___"
- Devices returned as found

**Constraints:**
- Tutorial and a peer before the teacher
- Blocks only (no text code today)

## Floor & Ceiling

*Floor:* completing the Dice tutorial as written, then swapping only the input
block, is a full input→output program — that alone earns the rung. *Ceiling:*
chain two conditions (button A shows one thing, button B another), or turn the
random number into something useful — a team picker, a "who goes first"
decider — and explain where a class could actually use it.

## Badge Evidence

- *Electronic Sensors L3:* student loads their own block-code program so a
  sensor input triggers an output, and completes a guided tutorial start to
  finish — here, the Dice tutorial plus at least one input swap and one
  self-made input→output pair, which shows the input→output relationship is
  understood, not just copied.

## Reflection Menu

- **Tier 1:** Thumbs — did swapping the input block work the first time?
  Raise your hand if you invented a pair nobody else at your table made.
- **Tier 2:** partner-share — show your partner your program and say it as
  "when I ___, it ___"; the partner tries to trigger it without being told how.
- **Tier 3:** Google Classroom video of your input triggering your output,
  plus one sentence: how could this be useful in a classroom — what could it
  decide or help with?
