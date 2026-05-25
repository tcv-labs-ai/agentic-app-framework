# Docs Index

## Purpose

This directory contains the product, engineering, design, and project-state source-of-truth documents for `[PRODUCT_NAME]`.

Future sessions should use this index to understand where decisions live and which documents to read before making changes.

---

## Reading Order

For general orientation, read in this order:

1. `getting-started.md`
2. `terminology.md`
3. `product/prd/`
4. `engineering/tdd/README.md`
5. `engineering/adr/README.md`
6. `design/ui-direction.md`
7. `design/design-system.md`
8. `project-state/implementation-status.md`
9. `project-state/roadmap.md`
10. `project-state/handoffs/README.md`

---

## Directory Guide

### `getting-started.md`

Fast path for first-time framework use.
Use this to stand up a new project without guessing document order or process.

### `terminology.md`

Canonical product language.
Use this to keep naming and copy consistent across code, docs, and UI.

### `product/prd/`

Product requirement documents.
These define what the product must do and what is in or out of scope.

### `engineering/tdd/`

Technical design documents.
These define how the product should be implemented in a way that stays testable and maintainable.

### `design/ui-direction.md`

Product visual and UX direction.
Use this for tone, interaction priorities, and emotional design guardrails.

### `design/design-system.md`

Reusable visual rules and future token guidance.

### `engineering/adr/`

Architecture decision records.
Use this when important technical or structural decisions are made so future sessions can understand why they were made.

### `project-state/implementation-status.md`

Implementation tracking against the PRDs and TDDs.
Use this to understand what is already built versus what is still only specified.

### `project-state/roadmap.md`

Implementation-oriented milestone plan.
Use this to understand likely next work rather than guessing.

### `project-state/handoffs/`

Session handoff notes.
Use this when a session changes enough that the next agent needs a concise summary of what changed, what was validated, and what remains open.

---

## Source of Truth Rules

- Product behavior lives in `product/prd/`
- Technical implementation direction lives in `engineering/tdd/`
- Visual and UX direction lives in `design/ui-direction.md` and `design/design-system.md`
- Shared naming lives in `terminology.md`
- Implementation progress lives in `project-state/implementation-status.md`
- Technical decision history lives in `engineering/adr/`
- Agent session continuity lives in `project-state/handoffs/`

If two documents conflict:

1. newer, more specific PRD/TDD documents win over older generic guidance
2. `AGENTS.md` should be updated if it lags behind the docs
3. stale documents should be corrected rather than ignored indefinitely

---

## Maintenance Rules

When making changes:

- if implementation meaningfully changes, update `project-state/implementation-status.md`
- if product behavior changes, update the relevant PRD
- if implementation architecture or technical constraints change, update the relevant TDD
- if visual direction changes, update `design/ui-direction.md` or `design/design-system.md`
- if naming changes, update `terminology.md`
- if a real architectural or structural decision is made, add or update an ADR
- do not add ADRs for routine polish or minor implementation details
- if milestone sequencing changes, update `project-state/roadmap.md`
- if a meaningful session ends with non-obvious context, add a concise handoff under `project-state/handoffs/`
