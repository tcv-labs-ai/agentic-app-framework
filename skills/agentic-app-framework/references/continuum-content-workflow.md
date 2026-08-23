# Continuum Content Workflow

Use this reference when the user wants Codex to create content for Continuum and
have AI classify, review, and store it.

## Core Rules

- Markdown under `knowledge/` remains canonical.
- `knowledge/inbox/` is the draft and human-review queue.
- Canonical category folders under `knowledge/` are only written after explicit
  human approval.
- Reviews, indexes, embeddings, benchmark outputs, upload staging, and database
  records are derived unless a repo ADR says otherwise.
- LLM output is advisory and source-grounded. It must not silently mutate
  canonical Markdown.
- Do not ingest broad filesystem paths, browser profiles, secrets, wallet data,
  private keys, `.env` files, or unrelated repositories.

## Inbox Resolution

When the user asks to send content to Continuum from any working directory,
resolve the inbox before writing:

1. Determine the intended Continuum repo root.
   - If the current working directory is inside `apps/tcv-continuum`, use that
     repo root.
   - If the user provides a Continuum path, use that repo root.
   - Otherwise check the common local default:
     `/Users/sws/Development/tcv-labs/apps/tcv-continuum`.
2. Prefer an explicit configured knowledge root when available:
   - `CONTINUUM_KNOWLEDGE_ROOT`
   - documented local runtime/config files in the Continuum repo
   - `.env.example` only as documentation, not as a secret source
3. If no explicit root is configured, use `<continuum-repo-root>/knowledge`.
4. Use `<knowledge-root>/inbox` for drafts.
5. Verify the inbox exists and is inside the knowledge root before writing.
6. If the Continuum repo root or inbox cannot be resolved unambiguously, stop and
   ask the user for the target.

Never infer the inbox from the caller's current repository unless that repository
is itself the Continuum app or the user explicitly points to it.

## Content Creation Flow

1. Capture the user's source material and intent.
2. Resolve the Continuum inbox using the inbox resolution rules above.
3. Create or stage a draft note under the resolved inbox.
4. Preserve the original source reference in frontmatter or body content.
5. Generate a concise, source-grounded draft summary and tags only from supplied
   material.
6. Run the deterministic review/classification path.
7. Present the recommendation to the user:
   - approve and promote
   - review metadata first
   - reject or delete the draft
8. Promote only after the user explicitly approves.

## Classification Guidance

Classify based on the dominant durable value of the content, not only keywords.

Prefer stable destination paths such as:

- `knowledge/ai/tooling`
- `knowledge/architecture`
- `knowledge/engineering`
- `knowledge/research`
- `knowledge/business`
- `knowledge/operations`

If destination confidence is low, keep the item in `knowledge/inbox/` and mark it
as needing review.

## Summary Expectations

For generated notes:

- summarize what the content is actually about
- preserve the source URL or source file path
- include only claims supported by the source
- avoid generic placeholders such as `TBD`
- call out uncertainty when the source is sparse or link-only

For link-only or very sparse items:

- do not invent missing context
- use a short summary that says what is known
- recommend review before promotion

## App Workflow Expectations

When working in `apps/tcv-continuum`:

- Use the web Inbox flow for one-by-one human review.
- Use the bulk importer for multi-file source imports.
- Use delete actions only for draft cleanup in `knowledge/inbox/`.
- Delete canonical notes through explicit Git changes, not the draft cleanup UI.
- Rebuild derived indexes after canonical note deletion when relevant.

## Documentation Maintenance

After implementing or materially changing this workflow in a repo:

- update `docs/project-state/implementation-status.md`
- update relevant PRD/TDD docs if product behavior or technical direction changed
- add a concise handoff when future sessions need operational context
- add an ADR only if canonical storage, derived database behavior, or promotion
  policy changes
