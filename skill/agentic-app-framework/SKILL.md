---
name: agentic-app-framework
description: Bootstrap and maintain a reusable PRD/TDD/ADR/project-state documentation system for software repositories. Use when Codex needs to initialize the agentic app framework in a repo, copy the framework docs and AGENTS.md into an existing project, replace template placeholders, or keep implementation documentation aligned with code changes by updating implementation status, PRDs, TDDs, roadmap, handoffs, and ADRs under the framework rules.
---

# Agentic App Framework

Use this skill to install or maintain the agentic documentation framework built around:

- `AGENTS.md`
- `docs/product/prd/`
- `docs/engineering/tdd/`
- `docs/design/ui-direction.md`
- `docs/design/design-system.md`
- `docs/project-state/implementation-status.md`
- `docs/project-state/roadmap.md`
- `docs/project-state/handoffs/`
- `docs/engineering/adr/`

## Bootstrapping Workflow

1. Determine whether the target repo is empty/new or already has product files.
2. If the repo is new and the user can start from the template repository directly, prefer the GitHub template flow instead of copying files manually.
3. If the repo already exists, run `scripts/bootstrap_framework.sh --target <repo-path>` from this skill.
4. After bootstrapping, replace top-level placeholders.
5. Ask the user for any still-missing product-specific information only if it cannot be inferred safely.

Default framework source repo:

- `/Users/sws/Development/tcv-labs/skills/tcv-labs-agentic-app-framework`

If the framework repo lives elsewhere, pass `--source <path>` to the bootstrap script.

## Documentation Destination

When this skill writes project documentation, use the `docs/` directory at the
root of the active project by default.

Resolve the destination in this order:

1. Use an explicit documentation path supplied by the user.
2. Follow a different location required by the active project's `AGENTS.md` or
   other repository-local instructions.
3. Otherwise use `<active-project-root>/docs/`, where the active project root is
   the Git repository containing the current working directory, or the current
   project/workspace root when Git is not available.

Do not write project documentation to the skill source repository, the installed
skill directory, the user's home directory, or another repository merely because
it is a TCV Labs default. Preserve deliberate storage exceptions, such as the
Continuum `knowledge/inbox/` workflow described below.

## Maintenance Workflow

Before meaningful implementation work:

1. Read `docs/project-state/implementation-status.md`.
2. Read the relevant PRDs and TDDs.
3. Read `docs/design/ui-direction.md` and `docs/design/design-system.md` for UI work.
4. Read recent handoffs under `docs/project-state/handoffs/` if they exist.

After meaningful implementation work:

1. Update `docs/project-state/implementation-status.md` if implementation status materially moved.
2. Update the relevant PRD if product behavior changed.
3. Update the relevant TDD if implementation direction changed.
4. Update `docs/project-state/roadmap.md` if milestone sequencing or current phase changed.
5. Add a concise handoff under `docs/project-state/handoffs/` when the session leaves useful continuity context.
6. Add an ADR only if a real architectural or structural decision was made.

Do not add ADRs for routine UI polish, minor refactors, or small test additions.

## Continuum Content Workflow

When the user asks to create durable content for Continuum, classify it, or store
it through the Continuum knowledge pipeline, read
`references/continuum-content-workflow.md` before acting.

## Required Discipline

Use `references/maintenance-checklist.md` as the final pass whenever the task includes implementation changes.

When maintaining docs:

- keep status docs factual, not aspirational
- distinguish implemented behavior from planned behavior
- prefer updating existing docs over creating new process docs
- keep handoffs factual, concise, and focused on session continuity
- include handoff closeout metadata: `Closed At` in `YYYY-MM-DD h:mm AM/PM [TIMEZONE]` format and `Closed By` for the user/operator who requested or performed closeout
- keep `AGENTS.md` as a router, not a second PRD

## Bundled Resources

- `scripts/bootstrap_framework.sh`: copy the framework into an existing repo safely
- `references/maintenance-checklist.md`: concise checklist for post-implementation doc maintenance
- `references/continuum-content-workflow.md`: guidance for source-grounded Continuum content creation, classification, inbox review, and promotion
