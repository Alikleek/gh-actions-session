# Workflow 3 — Test a microservices app in CI (exercise)

**Goal:** Write a workflow that installs dependencies and runs the full check suite —
**linting, unit tests, and format checking** — for a small microservices app with a
**Node backend** and a **React frontend**.

## The app

```
backend/    Express microservice (task API) + Node test-runner unit tests
frontend/   React app (Vite) + Vitest/Testing-Library component tests
```

Each service is independent and defines the same three npm scripts:

| Script                 | Tool                         |
| ---------------------- | ---------------------------- |
| `npm run lint`         | ESLint (flat config)         |
| `npm test`             | Backend: `node --test` · Frontend: `vitest run` |
| `npm run format:check` | Prettier (`--check`)         |

### Run it locally

```bash
cd backend  && npm install && npm run lint && npm test && npm run format:check
cd ../frontend && npm install && npm run lint && npm test && npm run format:check
```

Start the services (optional):

```bash
cd backend && npm start      # http://localhost:4000/api/tasks
cd frontend && npm run dev    # Vite dev server
```

## What you'll build

A workflow at `.github/workflows/third.yml` that runs on push / pull request and, for
**both** services, runs `npm ci` then the three checks. Hints:

- Use a **matrix** over `[backend, frontend]` so both services run in parallel.
- Use `actions/setup-node` with npm caching.
- Set a per-job `working-directory` (or `cd`) into the matrix service.
- Run `npm run lint`, `npm test`, and `npm run format:check` as separate steps so a
  failure clearly points at which check broke.

## Concepts covered

- `actions/checkout` + `actions/setup-node` with dependency caching
- Build **matrix** strategy
- Running lint / unit / format gates in CI
- Reproducible installs with `npm ci` (uses the committed `package-lock.json`)

## Reference

- [Building and testing Node.js](https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [Using a matrix for your jobs](https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs)
