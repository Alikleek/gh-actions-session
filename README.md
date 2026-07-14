# Workflow 1 — Manually triggered workflow with inputs

**Goal:** Build a workflow that you trigger by hand from the GitHub UI, that prints a
message based on the inputs you choose, and that **skips one of its jobs** depending on
an input.

## What you'll build

A workflow file at `.github/workflows/first.yml` that:

1. Is triggered **manually** (`workflow_dispatch`) — not on push.
2. Accepts **inputs**:
   - `environment` — a **choice** (`dev` / `staging` / `prod`)
   - `name` — a free-text **string** (who is running the deploy)
   - `run_extra` — a **boolean** that decides whether an extra job runs
3. Has a **`greet`** job that prints a message built from the inputs, e.g.
   `"Hello <name>, deploying to <environment>"`.
4. Has an **`extra`** job that only runs when `run_extra` is `true` (otherwise it is
   **skipped**) — use a job-level `if:` condition.

## Concepts covered

- `on: workflow_dispatch` and the `inputs:` block (`type: choice`, `string`, `boolean`)
- Reading inputs with the `${{ inputs.* }}` (or `${{ github.event.inputs.* }}`) context
- Conditional execution with a job-level `if:` to skip a job

## How to run it

1. Push your branch.
2. Go to the repo's **Actions** tab → select your workflow → **Run workflow**.
3. Pick the inputs and run it. Try it once with `run_extra = true` and once with
   `run_extra = false` and watch how the `extra` job is skipped the second time.

> **Note:** GitHub only shows/triggers a `workflow_dispatch` workflow once the
> workflow file exists on the repository's **default branch**. If you don't see a
> **Run workflow** button, make sure your workflow file has been merged/pushed to the
> default branch (or run it against your branch after the file is present there).

## Reference / cheatsheet

- [Manually running a workflow](https://docs.github.com/actions/using-workflows/manually-running-a-workflow)
- [`workflow_dispatch` inputs](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)
- [Using conditions to control job execution](https://docs.github.com/actions/using-jobs/using-conditions-to-control-job-execution)
