# Getting into Claude Code — setup steps (macOS)

Do these once. One command at a time; read each result before the next.

## 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

If `npm` isn't found, install Node first: `brew install node`, then rerun.
Verify:

```bash
claude --version
```

## 2. Make sure both repos are cloned side by side

Living Lessons you already have. Clone the template repo next to it so Claude
Code can read it:

```bash
cd ~/projects
git clone https://github.com/SteamHead/steamhead-site-rebuild.git
```

You should now have `~/projects/living-lessons` and
`~/projects/steamhead-site-rebuild`.

## 3. Pull the handoff files into living-lessons

Push the handoff package (the zip from this session) the usual way first, so the
repo on disk has CLAUDE-CODE-HANDOFF.md and the updated CLAUDE.md / D25. Then:

```bash
cd ~/projects/living-lessons
git pull
```

## 4. Start Claude Code in the repo

```bash
cd ~/projects/living-lessons
claude
```

It authenticates through your browser the first time (same as gh did). Once it's
running, your opening message can be short — everything it needs is in the repo:

> Read CLAUDE-CODE-HANDOFF.md, then docs/decisions.md and CLAUDE.md. Also read
> the sibling repo at ../steamhead-site-rebuild to mirror its Astro + Cloudflare
> + zod setup. Then do Milestone 1 only: prove the content pipeline. Show me
> your plan before writing code.

## 5. How the loop works in Claude Code (different from here)

- Claude Code **edits files and runs commands directly** in the repo — no more
  zip-and-rsync. It writes code, runs `npm run dev`, sees errors, fixes them.
- It still commits and pushes through git; review its diffs the same way
  (`git diff --stat`, or let it open a PR for big changes).
- Your `git`, Obsidian, and GitHub muscle memory all still apply — Claude Code
  is just another thing editing the same `~/projects/living-lessons` folder.
- If it proposes scope beyond Milestone 1, point it back at the handoff. M1 is
  deliberately small.

## What to expect from Milestone 1

A local site you can open in a browser showing your real hexagons and skills,
validated by schemas, deployed to a Cloudflare preview URL. Not pretty yet —
that's the next milestone. The point is proving the content pipeline works end
to end before building the designed screens on top of it.
