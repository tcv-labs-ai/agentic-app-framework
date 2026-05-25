# Maintenance Checklist

Use this checklist after meaningful implementation work.

## Always Check

- Does `docs/project-state/implementation-status.md` still match the code?
- Did product behavior change in a way that requires a PRD update?
- Did technical direction change in a way that requires a TDD update?
- Did milestone status or sequencing change enough to update `docs/project-state/roadmap.md`?
- Did this session leave non-obvious context that should be captured in `docs/project-state/handoffs/`?
- Was there a real architectural or structural decision that justifies a new ADR?

## Do Not Add An ADR For

- routine UI polish
- styling refinements
- small refactors
- test additions that do not change architecture
- doc wording cleanup

## Good Update Pattern

1. implement code
2. run tests or checks
3. update `project-state/implementation-status.md`
4. update PRD/TDD only where the source of truth changed
5. add a handoff only when future sessions need concise continuity context
6. add ADR only if the decision changes how future engineering should proceed
