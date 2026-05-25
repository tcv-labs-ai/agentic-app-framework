# AGENTS.md

## Purpose

This document defines how AI coding agents should operate within the Focus Timer example repository.

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

---

## Project Overview

Focus Timer is a browser-first timer for users who want a lightweight structured work and break rhythm.

The MVP focuses on:

- configurable work and break durations
- a clear running, paused, and resettable timer
- alternating work and break phases
- simple browser persistence for the configured durations

Future phases may include:

- sound notifications
- daily session history
- keyboard shortcuts and richer desktop interactions

---

## Target Platforms

The application must support:

- Web

Preferred stack:

- vanilla HTML, CSS, and JavaScript

Primary current product priority:

- browser-first experience

Primary reference width:

- `1440 px`

---

## Architectural Rules

- keep timer math in `src/domain`
- keep orchestration and persistence in `src/application`
- keep DOM rendering and event wiring in `src/presentation`
- derive remaining time from timestamps rather than mutating countdown state in a drifting loop

---

## Testing Requirements

Required emphasis:

- unit tests for timer progression rules
- unit tests for controller state transitions
- keep browser-only DOM logic thin enough that most correctness lives below the UI layer
