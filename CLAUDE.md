# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Graphace is a SvelteKit-based UI for [Graphoenix](https://gp-doc.github.io/docs/ui/svelte), a GraphQL-driven backend. The repo is a **pnpm monorepo** managed with Turborepo.

## Common Commands

All commands run from the repo root unless noted.

```bash
# Install dependencies
pnpm install

# Dev (all packages + apps in parallel)
pnpm dev

# Build everything (respects Turbo dependency order)
pnpm build

# Build only packages (without apps)
pnpm build:packages

# Lint all
pnpm lint

# Format all
pnpm format

# Within apps/graphence only:
pnpm --filter graphence dev
pnpm --filter graphence build
pnpm --filter graphence check        # svelte-check type checking
pnpm --filter graphence check:watch

# GraphQL codegen (requires a running Graphoenix backend)
pnpm --filter graphence graphql:codegen

# i18n codegen
pnpm --filter graphence i18n

# Publish packages (uses yalc for local dev, npm publish for release)
pnpm yalc:publish   # local yalc publish all packages
pnpm yalc:push      # push to dependent projects
pnpm publish        # publish to npm registry
```

## Monorepo Structure

```
apps/
  graphence/          # Main SvelteKit app (auth UI, user/role/group/permission management)
  spectaql/           # API documentation (SpectaQL)
packages/
  commons/            # Shared TypeScript utilities and types (@graphace/commons)
  graphql/            # GraphQL utilities and types (@graphace/graphql)
  ui/                 # Base Svelte UI components (@graphace/ui) — Tailwind + DaisyUI + Melt UI
  ui-graphql/         # GraphQL-aware Svelte components (@graphace/ui-graphql)
  codegen/            # graphql-codegen plugin (graphace-codegen)
  codegen-commons/    # Shared codegen utilities (graphace-codegen-commons)
  codegen-preset/     # graphql-codegen preset (graphace-codegen-preset)
  eslint-config-custom/ # Shared ESLint config
```

## apps/graphence Architecture

### Routing

Routes follow `[lang]/(app)/...` and `[lang]/(main)/...` layout groups:
- `[lang]/(main)/` — unauthenticated pages: `login`, `logout`, `error`
- `[lang]/(app)/` — authenticated pages: `user`, `role`, `group`, `permission`, `realm`, `settings`, `file`

All URLs are prefixed with a locale slug (e.g. `/en/`, `/zh/`). The `hooks.server.ts` detects locale from the URL and falls back to the `Accept-Language` header, binds `locale` and `LL` (translation functions) to `event.locals`, and handles 401 → redirect to login.

### GraphQL Proxy

`src/routes/graphql/+server.ts` proxies all POST requests to `PUBLIC_GRAPHQL_URL`, forwarding the `Authorization` cookie as a header. Client-side code always posts to `/graphql` (relative), never directly to the backend.

### Environment Variables

Configured in `apps/graphence/.env`:
```
PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
PUBLIC_DOWNLOAD_URL=http://localhost:8080/download
AUTH_SCHEME=Basic
AUTH_TOKEN=root:root   # used by codegen only, not at runtime
```

### Code Generation

`codegen.ts` drives `graphql-codegen` using the `graphace-codegen-preset`. It:
1. Introspects the live GraphQL schema from `PUBLIC_GRAPHQL_URL`.
2. Generates `src/lib/types/schema.ts` (TypeScript types via `typescript` plugin).
3. Generates routes, components, stores, and queries under `src/` via the custom `graphace-codegen-preset`.

The preset config in `codegen.ts` controls which objects appear in list/detail views, which fields are selectable, and which are ignored or mutation-only.

### i18n

Uses `typesafe-i18n`. Translations live in `src/lib/i18n/`. Import/export scripts are at `src/lib/i18n/import.ts` and `src/lib/i18n/export.ts`. Supported locales: `en`, `zh`.

### UI Stack

- **SvelteKit 2** with `@sveltejs/adapter-node` (output to `build/`)
- **Tailwind CSS 3** + **DaisyUI 3** for styling
- **Melt UI** for accessible headless components (preprocessed with `@melt-ui/pp`)
- **Chart.js** + `svelte-chartjs` for charts
- **SheetJS** (`xlsx`) for spreadsheet export

### Path Aliases

Defined in `svelte.config.js`:
- `~` → `./src`
- `$i18n` → `src/lib/i18n`
