---
name: tcv-labs-ops-record
description: Write concise, non-secret TCV Labs work records to the control-plane repository.
---

# TCV Labs Ops Record

Use this skill when the user wants to preserve TCV Labs work, handoff notes, or governance changes in the control-plane repository.

## Canonical Target

- Repository: `/Users/sws/Development/tcv-labs/control-plane/tcv-labs-ops`
- Primary record: `docs/running-record.md`

## Writing Rules

- Write only in the canonical control-plane repository.
- Keep entries append-only and concise: context, changes, relevant files, decisions, open questions, and next step.
- Use inventories for non-secret inventory changes, decisions for material governance or architecture changes, and templates only for reusable starter content.
- Never record secrets, credentials, tokens, recovery material, `.env` contents, browser profiles, or private keys.

If the right record type is unclear, stop and ask before writing.
