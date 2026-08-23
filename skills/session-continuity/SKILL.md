---
name: session-continuity
description: Keep durable project context, session handoffs, and next-session prompts current across agent or human handoffs.
---

# Session Continuity

Use this skill when a user wants work to remain easy to resume across coding sessions, agents, or human handoffs.

## Destination

Write continuity artifacts to the first applicable location:

1. A documentation path explicitly supplied by the user.
2. A repository-local instruction that specifies a different continuity location.
3. `<active-project-root>/docs/agent-workspace/`.

Use the templates in `assets/agent-workspace/` only when the destination does not already have an equivalent, maintained convention.

## Before Work

- Locate and follow the active repository's `AGENTS.md`.
- Read the current continuity state and the most recent relevant handoff when they exist.
- Read authoritative project documents that describe product, technical, or operational truth. Do not treat a handoff as a replacement for them.

## During and After Work

- Keep `current-state.md` factual: completed work, verified constraints, known blockers, and the active work boundary.
- Write a dated handoff when a meaningful session leaves non-obvious context for another person or agent.
- Update `next-session.md` with a ready-to-run continuation prompt, concrete first action, and required reading.
- Create a structured session dump only when the user asks for one or the work is complex enough that the concise handoff cannot preserve the necessary context.
- Record validation actually performed and distinguish it from checks that remain to be run.

## Boundaries

- Keep durable product requirements, technical direction, and architecture decisions in their canonical PRD, TDD, ADR, status, or operational records; link to them rather than duplicating them here.
- Do not include secrets, credentials, tokens, private keys, `.env` values, browser-profile data, or private recovery material.
- Do not copy a raw conversation transcript by default. Prefer concise, decision-oriented summaries that a new agent can act on.
- Preserve existing work and continuity conventions. Do not overwrite an existing handoff or current-state file without a user-authorized reason.
