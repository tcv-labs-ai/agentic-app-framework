# Agent Workspace

This directory preserves operational context between coding sessions and agent or human handoffs.

It complements, but never replaces, canonical project documentation such as PRDs, TDDs, ADRs, implementation status, and operational records.

## Contents

- `current-state.md`: factual snapshot of the active work boundary.
- `next-session.md`: ready-to-run continuation prompt and first action.
- `handoffs/`: concise, dated handoffs for meaningful session boundaries.
- `session-dumps/`: fuller structured summaries only when concise handoffs are insufficient.

Do not store secrets, credentials, private keys, `.env` values, or raw chat transcripts here.
