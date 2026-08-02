# Agentic App Framework

A reusable framework for building software products with Codex and similar AI coding agents.

This repository packages two things together:

- a documentation operating system for product and engineering work
- a companion Codex skill that can bootstrap the framework into a repo and keep the docs aligned with implementation

The goal is simple: make it practical to build applications with AI while keeping product requirements, technical design, implementation status, and architectural decisions coherent over time.

## What The Framework Includes

### Documentation framework

- `AGENTS.md`: repo-level operating and routing rules for agents
- `docs/README.md`: source-of-truth map and maintenance rules
- `docs/product/prd/`: product requirement templates
- `docs/engineering/tdd/`: technical design templates
- `docs/design/ui-direction.md`: UX and interaction-direction template
- `docs/design/design-system.md`: design-system and token template
- `docs/terminology.md`: canonical naming template
- `docs/project-state/implementation-status.md`: implementation tracking layer
- `docs/project-state/roadmap.md`: milestone sequencing layer
- `docs/project-state/handoffs/README.md`: session handoff convention
- `docs/engineering/adr/README.md`: ADR process and format

### Companion Codex skill

- `skill/agentic-app-framework/`: versioned Codex skill for this framework
- `scripts/install-local-skill.sh`: installs or refreshes the local Codex copy of the skill
- skill responsibilities:
  - bootstrap the framework into an existing repo
  - enforce the maintenance discipline as implementation changes land
  - keep project-state docs, PRDs, TDDs, roadmap, handoffs, and ADR usage aligned with repo changes

## Core Model

This framework separates six concerns clearly:

1. PRDs define what the product should do.
2. TDDs define how it should be implemented.
3. UI and design docs define how it should feel and look.
4. `project-state/implementation-status.md` defines what is already built.
5. ADRs explain why major architectural decisions were made.
6. Handoffs preserve concise session continuity for future agents.

That separation is the core value of the framework. Do not collapse these layers back into one generic project doc.

## Use Cases

Use this framework when you want:

- a repeatable structure for AI-assisted application development
- clear separation of product requirements and technical design
- better continuity across Codex sessions
- a disciplined way to keep docs synchronized with code changes
- a place for factual session handoffs without bloating durable status docs
- a lightweight ADR process for real architectural decisions

## Included Example

This repository includes one example application:

- `examples/focus-timer/`: a small browser-first timer app that demonstrates a filled-out framework instance with real docs, code, tests, implementation-status tracking, project-state structure, and a focused ADR set

Use it when you want to see what the framework looks like after it has been instantiated for a real product.

## How To Start A New Project

You have three valid paths.

### Option 1: Use this repo as a GitHub template

This is the cleanest option for a new app.

1. Use GitHub's `Use this template` flow on this repository.
2. Create your new application repository.
3. Replace template placeholders such as:
   - `[PRODUCT_NAME]`
   - `[TARGET_USER]`
   - `[PRIMARY_PLATFORM]`
   - `[CORE_DOMAIN_MODEL]`
4. Tailor the PRDs, TDDs, and design docs to the product.

### Option 2: Bootstrap an existing repository with the companion skill

Use this when a repo already exists and you want to install the framework into it.

1. Install the local skill from this repository.
2. Ask Codex to use `$agentic-app-framework` in the target repo.
3. Let the skill copy in `AGENTS.md`, `docs/`, and the init script.
4. Replace placeholders and continue product setup.

### Option 3: Copy the framework manually

Use this if you do not want to rely on the skill.

1. Copy `AGENTS.md` and `docs/` into the target repository.
2. Copy `scripts/init-project.sh` if you want placeholder replacement help.
3. Replace placeholders manually.
4. Begin shaping the product-specific docs.

## Install The Companion Skill

The repository is the source of truth for the skill. Your local Codex installation should consume it from here.

Install or refresh the local skill with:

```bash
cd /Users/sws/Development/tcv-labs/skills/tcv-labs-agentic-app-framework
./scripts/install-local-skill.sh
```

That installs the skill to:

```bash
$HOME/.codex/skills/agentic-app-framework
```

## Update The Companion Skill

When the skill changes in this repository, refresh the local installed copy:

```bash
cd /Users/sws/Development/tcv-labs/skills/tcv-labs-agentic-app-framework
git pull
./scripts/install-local-skill.sh
```

Important:

- the repo is versioned source of truth
- the local Codex skill is a deployed copy
- getting the latest skill requires running the install script again after repo updates

## Skill Usage

Once installed, you can invoke the skill in Codex with `$agentic-app-framework`.

Typical responsibilities:

- bootstrap the framework into an existing repo
- guide product-doc setup for a new application
- maintain documentation discipline while implementing features
- update `project-state/implementation-status.md` after meaningful implementation work
- update PRDs or TDDs when their source-of-truth layers change
- add concise handoffs when a session leaves useful continuity context
- include handoff closeout metadata with 12-hour local/project time and closing user/operator
- add ADRs only for real architectural or structural decisions
- guide Continuum content creation/classification/storage workflows from any
  working directory by resolving the Continuum inbox, routing durable knowledge
  through review, and requiring explicit promotion

## Bootstrap Prompts For Codex

Use prompts like these when starting work in a new or existing project.

### New project from template

```text
Use $agentic-app-framework. Read the framework docs, initialize this repository for a new product, replace the main placeholders, and tell me what product information you still need from me.
```

### Existing repo needing the framework

```text
Use $agentic-app-framework to bootstrap this existing repository with the framework, then review the docs structure and tell me which placeholders or product decisions still need to be filled in.
```

### Start product-definition work

```text
Use $agentic-app-framework. Read the framework docs and help me draft the first-pass PRDs, TDDs, terminology, and roadmap for this product.
```

### Continue implementation with maintenance discipline

```text
Use $agentic-app-framework. Before coding, read project-state/implementation-status, recent handoffs, and the relevant PRDs/TDDs. After implementation, update the docs that meaningfully changed, add a handoff if useful for continuity, and only add an ADR if a real architectural decision was made.
```

### UI work with documentation discipline

```text
Use $agentic-app-framework. Read project-state/implementation-status, recent handoffs, the relevant PRDs/TDDs, ui-direction, and design-system docs before changing the UI. After implementation, update documentation status if the milestone moved.
```

### Architecture or refactor work

```text
Use $agentic-app-framework. Review the current architecture docs, project-state/implementation-status, and recent handoffs first. If this refactor changes technical direction, update the TDDs. Add an ADR only if the change materially affects future engineering decisions.
```

## Optional Placeholder Initialization

A simple initializer is included:

```bash
./scripts/init-project.sh "My Product" web
```

This only performs a first-pass replacement for a few top-level placeholders.

You should still expect to manually fill in product-specific fields throughout the docs.

## Documentation Discipline Rules

As work proceeds:

- update PRDs when product behavior changes
- update TDDs when implementation direction changes
- update `docs/project-state/implementation-status.md` when implementation meaningfully moves
- update `docs/project-state/roadmap.md` when milestone sequencing or current phase changes
- add a handoff under `docs/project-state/handoffs/` when future sessions need concise continuity context
- when adding a handoff, include `Closed At` in `YYYY-MM-DD h:mm AM/PM [TIMEZONE]` format and `Closed By` for the user/operator who requested or performed closeout
- add ADRs only for real architectural or structural decisions

Do not add ADRs for:

- routine UI polish
- minor refactors
- small test additions
- wording-only documentation cleanup

## Recommended Working Pattern

For each meaningful feature or implementation pass:

1. read `docs/project-state/implementation-status.md`
2. read recent handoffs in `docs/project-state/handoffs/` if they exist
3. read the relevant PRDs and TDDs
4. implement code
5. run tests or checks
6. update `project-state/implementation-status.md`
7. update PRD/TDD/roadmap only where their source-of-truth layer changed
8. add a handoff if future sessions need continuity context
9. include closeout date/time and closing user/operator in the handoff
10. add an ADR only if the work changed architectural direction

## Repository Layout

```text
AGENTS.md
docs/
  README.md
  terminology.md
  product/
    prd/
  engineering/
    tdd/
    adr/
  design/
    ui-direction.md
    design-system.md
  project-state/
    implementation-status.md
    roadmap.md
    handoffs/
skill/
  agentic-app-framework/
scripts/
  init-project.sh
  install-local-skill.sh
```

## License

This repository currently includes the existing `LICENSE` file from the repo.
Review or replace it if you want a different licensing model for the template repository.
