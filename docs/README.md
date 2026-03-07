# Docs Index

## Purpose

This directory contains the product, design, and technical source-of-truth documents for `[PRODUCT_NAME]`.

Future sessions should use this index to understand where decisions live and which documents to read before making changes.

---

## Reading Order

For general orientation, read in this order:

1. `getting-started.md`
2. `terminology.md`
3. `prd/`
4. `tdd/README.md`
5. `ui-direction.md`
6. `design-system.md`
7. `implementation-status.md`
8. `roadmap.md`
9. `adr/README.md`

---

## Directory Guide

### `getting-started.md`

Fast path for first-time framework use.
Use this to stand up a new project without guessing document order or process.

### `terminology.md`

Canonical product language.
Use this to keep naming and copy consistent across code, docs, and UI.

### `prd/`

Product requirement documents.
These define what the product must do and what is in or out of scope.

### `tdd/`

Technical design documents.
These define how the product should be implemented in a way that stays testable and maintainable.

### `ui-direction.md`

Product visual and UX direction.
Use this for tone, interaction priorities, and emotional design guardrails.

### `design-system.md`

Reusable visual rules and future token guidance.

### `implementation-status.md`

Implementation tracking against the PRDs and TDDs.
Use this to understand what is already built versus what is still only specified.

### `roadmap.md`

Implementation-oriented milestone plan.
Use this to understand likely next work rather than guessing.

### `adr/`

Architecture decision records.
Use this when important technical or structural decisions are made so future sessions can understand why they were made.

---

## Source of Truth Rules

- Product behavior lives in `prd/`
- Technical implementation direction lives in `tdd/`
- Visual and UX direction lives in `ui-direction.md` and `design-system.md`
- Shared naming lives in `terminology.md`
- Implementation progress lives in `implementation-status.md`
- Technical decision history lives in `adr/`

If two documents conflict:

1. newer, more specific PRD/TDD documents win over older generic guidance
2. `AGENTS.md` should be updated if it lags behind the docs
3. stale documents should be corrected rather than ignored indefinitely

---

## Maintenance Rules

When making changes:

- if implementation meaningfully changes, update `implementation-status.md`
- if product behavior changes, update the relevant PRD
- if implementation architecture or technical constraints change, update the relevant TDD
- if visual direction changes, update `ui-direction.md` or `design-system.md`
- if naming changes, update `terminology.md`
- if a real architectural or structural decision is made, add or update an ADR
- do not add ADRs for routine polish or minor implementation details
- if milestone sequencing changes, update `roadmap.md`
