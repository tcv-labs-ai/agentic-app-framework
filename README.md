# Agentic App Framework

A reusable documentation and agent-operations framework for building software products with AI coding agents.

This repository is intended to be used as a reusable starter for new application repositories.

It separates:

- product requirements
- technical design
- visual direction
- implementation status
- architectural decisions
- repo-level agent operating rules

## What This Gives You

- a layered PRD/TDD workflow
- an `AGENTS.md` file that routes agents to the right source-of-truth docs
- a `docs/implementation-status.md` file that tracks what is actually built
- an ADR process for real architectural decisions
- a roadmap layer for sequencing work without turning the roadmap into product spec

## Template Structure

- `AGENTS.md`: repo-level agent routing and documentation-discipline rules
- `docs/README.md`: index and source-of-truth map
- `docs/prd/`: product requirement templates
- `docs/tdd/`: technical design templates
- `docs/ui-direction.md`: UX and visual direction template
- `docs/design-system.md`: design-system and token template
- `docs/terminology.md`: canonical naming template
- `docs/implementation-status.md`: implementation tracking template
- `docs/roadmap.md`: milestone planning template
- `docs/adr/README.md`: ADR process and format

## How To Use This Repo

### Option 1: Use As A GitHub Template

1. Mark this repository as a GitHub template.
2. Create a new repository from it.
3. Replace placeholder values such as:
   - `[PRODUCT_NAME]`
   - `[TARGET_USER]`
   - `[PRIMARY_PLATFORM]`
   - `[CORE_DOMAIN_MODEL]`
   - `[MVP_SCOPE]`
4. Tailor the PRDs and TDDs to the actual product.

### Option 2: Copy Into An Existing Repo

1. Copy `AGENTS.md` and `docs/` into the target repository.
2. Replace template placeholders.
3. Remove any documents that are not useful for the product.
4. Add product-specific content.

### Option 3: Use The Init Script

A starter script is included:

```bash
./scripts/init-project.sh "My Product" web
```

That script performs a first-pass placeholder replacement for common top-level fields only.

## Operating Model

Use the docs in this order:

1. PRDs define what the product should do.
2. TDDs define how it should be implemented.
3. UI and design docs define how it should feel and look.
4. `implementation-status.md` defines what is already built.
5. ADRs explain why major technical decisions were made.

## Maintenance Rule

As work proceeds:

- update PRDs when product behavior changes
- update TDDs when implementation direction changes
- update `docs/implementation-status.md` when implementation meaningfully moves
- add ADRs only for real architectural or structural decisions

## License

This repository currently includes the existing `LICENSE` file from the repo.
Review or replace it if you want a different licensing model for the template repository.
