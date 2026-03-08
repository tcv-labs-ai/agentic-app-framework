# TDD 001: Architecture

## Layering Direction

- `src/domain`: pure timer progression rules
- `src/application`: controller, persistence, and interval orchestration
- `src/presentation`: DOM rendering and event binding

## Rules

- timer progression math must remain testable outside the browser
- the controller should own state transitions
- presentation code should stay thin and event-driven

## Acceptance Criteria

- domain logic can be tested without the DOM
