# Title

Controller Owns Timer State

## Status

Accepted

## Context

The example needs to demonstrate a clean separation between domain rules, orchestration, and browser UI.

A timer implemented directly inside DOM event handlers would be shorter, but it would weaken the example by hiding state transitions inside the UI layer.

## Decision

Timer state transitions live in an application controller.

The domain layer provides phase and timing calculations.
The presentation layer renders state and forwards user actions.

## Consequences

Positive consequences:

- timer behavior is testable without the DOM
- the example demonstrates the framework’s architectural intent clearly
- persistence and validation can be coordinated in one place

Tradeoffs:

- more files than a minimal single-script example

## Alternatives Considered

### Put all timer logic in the browser UI file

Rejected because it would undercut the framework example’s architectural guidance.
