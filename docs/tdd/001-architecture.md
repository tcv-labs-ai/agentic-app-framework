# TDD 001: Architecture

## Purpose

Define the intended implementation architecture for `[PRODUCT_NAME]`.

## Layering Direction

- `domain`: pure core logic
- `application`: orchestration, validation, state
- `presentation`: UI, formatting, theming, layout

## Rules

- keep dependencies flowing inward
- keep domain logic testable in isolation
- keep UI logic thin where possible

## Acceptance Criteria

- `[ACCEPTANCE_CRITERION]`
