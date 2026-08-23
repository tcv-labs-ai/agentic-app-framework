---
name: tcv-labs-governance-skill
description: Apply TCV Labs repository boundaries, security safeguards, and documentation governance before modifying a TCV Labs repository.
---

# TCV Labs Governance Skill

Use this skill before modifying a TCV Labs repository. It enforces repository boundaries, security safeguards, drift control, and documentation expectations.

## Required Startup

Before editing files:

1. Identify the active repository and requested modification scope.
2. Locate the nearest `AGENTS.md`.
3. Locate the TCV Labs control-plane repository when available and read relevant governance guidance.
4. Report missing governance files and any conflict before proceeding.

## Boundaries

- Modify only the active repository unless the user explicitly authorizes work in another repository.
- Do not access secrets, `.env` files, private keys, seed phrases, wallets, browser profiles, SSH keys, or password stores.
- If a project-level rule conflicts with `tcv-labs-ops`, stop and report the conflict.

## Documentation

Update project documentation when behavior changes. Create an ADR for material architecture, security, storage, indexing, agent-access, sync, network-exposure, or data-model decisions.

In the final response, summarize files changed, assumptions, governance documents read, conflicts found, and the recommended next step.
