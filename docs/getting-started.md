# Getting Started

## Purpose

This guide is the fastest path to using the framework in a real project.

Use it when you are starting a new repository or when you have just bootstrapped the framework into an existing one.

---

## First Decisions To Make

Before filling out the docs, decide these items:

1. product name
2. target user
3. primary platform
4. core problem the product solves
5. MVP scope
6. what is explicitly out of scope for MVP

You do not need perfect answers yet. You do need concrete first-pass answers.

---

## Recommended Setup Path

### If you are starting a brand-new repo

1. create a repo from the GitHub template
2. run:

```bash
./scripts/init-project.sh "Your Product" web
```

3. replace the remaining placeholders manually
4. read `docs/README.md`
5. fill the first-pass product docs listed below

### If you already have a repo

1. install the local companion skill:

```bash
cd /Users/sws/Development/tcv-labs/skills/tcv-labs-agentic-app-framework
./scripts/install-local-skill.sh
```

2. in Codex, use:

```text
Use $agentic-app-framework to bootstrap this repository with the framework.
```

3. review the copied docs and replace placeholders
4. fill the first-pass product docs listed below

---

## Fill These Documents First

Start in this order.

1. `docs/terminology.md`
2. `docs/product/prd/001-product-foundation.md`
3. `docs/product/prd/002-mvp-experience.md`
4. `docs/product/prd/003-domain-rules.md`
5. `docs/product/prd/004-platform-and-accessibility.md`
6. `docs/product/prd/006-user-flows.md`
7. `docs/product/prd/007-inputs-and-edge-cases.md`
8. `docs/engineering/tdd/001-architecture.md`
9. `docs/engineering/tdd/002-state-and-flow.md`
10. `docs/engineering/tdd/005-testing-strategy.md`
11. `docs/project-state/implementation-status.md`
12. `docs/project-state/roadmap.md`
13. `docs/project-state/handoffs/README.md`

Do not try to perfect every document before starting implementation.
The goal is to create enough structure to guide the first serious build pass.

---

## First Codex Prompts

### Product setup

```text
Use $agentic-app-framework. Read the framework docs and help me fill in terminology, first-pass PRDs, first-pass TDDs, project-state/implementation-status, and roadmap for this product.
```

### Start implementation safely

```text
Use $agentic-app-framework. Before coding, read project-state/implementation-status, recent handoffs, and the relevant PRDs/TDDs. After implementation, update any docs that meaningfully changed and add a handoff if future sessions need continuity context.
```

### UI work

```text
Use $agentic-app-framework. Read project-state/implementation-status, recent handoffs, design/ui-direction, design/design-system, and the relevant PRDs/TDDs before making UI changes. Update implementation-status if this work materially moves the UI milestone.
```

---

## When To Write The First ADR

Do not write an ADR immediately.

Write the first ADR only when you make a decision that will materially affect future engineering work, for example:

- architectural layering
- state-management direction
- persistence boundary design
- testing strategy that changes how code must be structured
- design-system implementation structure that future work depends on

Do not write ADRs for:

- first-pass product copy
- routine styling
- minor refactors
- small test additions

---

## Ongoing Rule

As implementation progresses:

- update `docs/project-state/implementation-status.md` when the code meaningfully moves
- update PRDs when product behavior changes
- update TDDs when technical direction changes
- update roadmap when milestone status changes
- add a handoff when future sessions need concise continuity context
- add ADRs only for real architectural decisions
