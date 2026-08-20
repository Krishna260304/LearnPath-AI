# LearnPath AI

LearnPath AI is a frontend-only personalized learning platform that turns a learner's goal, current skills, and available time into an adaptive path they can follow with confidence.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/learnpath-ai/src/App.tsx` — complete frontend app, routes, local mock state, and reusable UI.
- `artifacts/learnpath-ai/src/index.css` — LearnPath AI visual tokens and global styles.
- `artifacts/api-server` — shared API scaffold retained for future backend integration; not used by the current frontend.

## Architecture decisions

- The first release is intentionally frontend-only and uses local mock state so the product flow can be evaluated before backend contracts are finalized.
- Route structure mirrors the intended future product surface so a FastAPI + MongoDB backend can be connected without redesigning the learner experience.
- The visual language emphasizes focus, progress, and explainable recommendations rather than marketplace browsing.

## Product

The app includes a public landing experience, multi-step learner onboarding, adaptive diagnostic assessment, learner dashboard, personalized roadmap, resource explorer, projects, skill intelligence, analytics, notifications, profile/settings, and a mock AI learning assistant. Interactive state covers onboarding selections, assessment progress, saved resources, assistant messages, and learner progress actions.

## User preferences

No persistent user preferences recorded.

## Gotchas

- The frontend is mounted at the root preview path and expects workflow-provided `PORT` and `BASE_PATH` values.
- Backend, authentication, database, and AI integrations are intentionally deferred until the frontend experience is approved.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
