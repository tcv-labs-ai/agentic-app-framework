# PRD 003: Domain Rules

## Domain Model

Focus Timer alternates between two repeating phases:

- work
- break

## Current Rules

- work and break durations are stored in whole minutes
- the timer counts down in seconds
- when remaining time reaches zero, the next phase starts automatically
- reset returns to the start of the current phase

## Deferred Rules

- custom multi-phase routines
- daily usage statistics
- notifications and alarms

## Acceptance Criteria

- the timer completes a work phase and transitions into a break phase automatically
