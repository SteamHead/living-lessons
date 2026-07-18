# Git Workflow

## The daily loop

```
cd ~/projects/living-lessons
git status                 # what changed?
git diff --stat            # how much, per file?
git add .
git commit -m "what and why, in one line"
git push
```

The prompt's `✗` means "uncommitted or untracked changes exist." A clean
prompt means everything is saved to GitHub.

## Rules that prevent every mishap we've had

1. **One command at a time** when anything might fail. In a pasted block,
   later commands run even after an earlier one errors.
2. **`git status` before every commit.** It would have caught the empty-rsync
   commit, the deleted docs, and the Obsidian noise.
3. **Read the error.** `No such file or directory` means stop, not continue.

## Receiving updates from Claude

Claude sends a zip of only the changed files. Safari auto-unzips to a folder;
copy contents over the repo with the **trailing slash**:

```
rsync -av ~/Downloads/<update-folder>/ ~/projects/living-lessons/
```

New files won't show in `git diff` until `git add -N <file>` (or just open
them). Review, then the daily loop.

## Fixing common situations

- **Stuck in a pager** (screen of `~` and `(END)`): press `q`.
- **Restore a deleted tracked file:** `git checkout -- path/to/file`
- **Undo edits to a file (careful — discards changes):** same command.
- **Stop tracking junk that got committed:** add it to `.gitignore`, then
  `git rm --cached path` (`-r` for folders). File stays on disk.
- **Committed the wrong thing?** Don't rewrite pushed history. Fix forward
  with a new commit and an honest message.
- **What did the last commit contain?** `git show --stat HEAD` (then `q`).
