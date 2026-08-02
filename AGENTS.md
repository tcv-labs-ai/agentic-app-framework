# AGENTS.md

## Purpose

This document defines how AI coding agents should operate within the `[PRODUCT_NAME]` repository.

It is a routing and constraint document, not the full product or technical specification.
Detailed product, design, and technical decisions live in `docs/`.

---

## Source of Truth

For meaningful work, agents should treat the repository documents in this order:

1. `docs/product/prd/`
2. `docs/engineering/tdd/README.md`
3. `docs/design/ui-direction.md`
4. `docs/design/design-system.md`
5. `docs/project-state/implementation-status.md`
6. recent handoffs in `docs/project-state/handoffs/` if they exist

If this file conflicts with the PRD/TDD documents, the more specific docs are the current source of truth and this file should be updated.

---

## Documentation Discipline

Agents must keep the documentation system aligned with implementation as work progresses.

Required rules:

- when implementation meaningfully changes, update `docs/project-state/implementation-status.md`
- when product behavior changes, update the relevant PRD
- when technical direction changes, update the relevant TDD
- when a meaningful session ends with non-obvious context, add a concise handoff under `docs/project-state/handoffs/`
- add an ADR only when a real architectural or structural decision is made
- do not create ADRs for routine polish, minor refactors, or small test additions

`docs/project-state/implementation-status.md` is the required status layer between the PRDs/TDDs and the actual codebase.
`docs/project-state/handoffs/` is the chronological continuity layer for session summaries, validation notes, open questions, and next suggested steps.

---

## Documentation Location

Project documentation belongs in this repository's `docs/` directory by
default. Use an explicit path from the user first, then follow a different
location required by repository-local instructions. Otherwise resolve the
active project root from the Git repository containing the current working
directory, or from the current project/workspace when Git is unavailable, and
write to `<active-project-root>/docs/`.

Do not write project documentation to a skill source or installed-skill
directory, the user's home directory, or another repository unless explicitly
directed. Deliberate storage exceptions, such as Continuum's `knowledge/`
workflow, remain governed by their own instructions.

## Project Overview

`[PRODUCT_NAME]` is a `[PROJECT_TYPE]` for `[TARGET_USER]`.

The MVP focuses on:

- `[MVP_CAPABILITY_1]`
- `[MVP_CAPABILITY_2]`
- `[MVP_CAPABILITY_3]`

Future phases may include:

- `[FUTURE_CAPABILITY_1]`
- `[FUTURE_CAPABILITY_2]`

---

## Target Platforms

The application must support:

- `[PRIMARY_PLATFORM]`
- `[SECONDARY_PLATFORM_1]`
- `[SECONDARY_PLATFORM_2]`

Preferred framework or stack:

- `[PRIMARY_STACK]`

Primary current product priority:

- `[PRIMARY_PLATFORM_PRIORITY]`

Primary reference width or target context if relevant:

- `[PRIMARY_REFERENCE_CONTEXT]`

---

## Required Reading By Task

### For any meaningful implementation task

Read:

1. `docs/engineering/tdd/README.md`
2. the relevant PRD documents
3. `docs/project-state/implementation-status.md`
4. recent handoffs in `docs/project-state/handoffs/` if they exist

### For UI or UX work

Also read:

- `docs/design/ui-direction.md`
- `docs/design/design-system.md`
- `docs/engineering/tdd/003-ui-system.md`

### For architecture, state, or validation work

Also read:

- relevant user-flow and edge-case PRDs
- `docs/engineering/tdd/001-architecture.md`
- `docs/engineering/tdd/002-state-and-flow.md`
- `docs/engineering/tdd/004-validation-and-persistence.md`

### For future platform expansion or domain expansion work

Also read:

- the relevant future-direction PRD
- related ADRs

---

## Architectural Rules

### 1. Separation of Concerns

Keep business logic out of UI components.

Use a layered direction such as:

- `domain`: core models and calculations
- `application`: controllers, orchestration, validation, state
- `presentation`: screens, widgets, formatting, theming

### 2. Deterministic Core Logic

Core domain behavior should be recomputed from source state rather than incrementally mutated in ways that can drift.

### 3. Prefer Simple State First

Start with the lightest state-management model that preserves clarity and testability.

Do not introduce heavier frameworks without a real need.

### 4. Incremental Evolution

Move the implementation toward the PRD/TDD structure incrementally.
Do not perform large rewrites unless necessary for correctness or a major product-direction change.

---

## Testing Requirements

The project must maintain a practical automated test base.

Required emphasis:

- unit tests for core business logic
- unit tests for controllers or application state
- validation tests where relevant
- widget or UI tests for core user flows

Tests should cover the highest-risk behavior first.

---

## Non-Goals

Agents must not implement out-of-scope features unless the PRDs are updated.

Out-of-scope items should be tracked in product docs rather than silently introduced into code.
