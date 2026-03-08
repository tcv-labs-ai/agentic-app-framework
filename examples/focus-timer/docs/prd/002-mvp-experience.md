# PRD 002: MVP Experience

## Core Flow

1. user lands on the timer screen
2. user sets work and break minutes
3. user starts a work session
4. timer counts down
5. when work completes, timer rolls into a break session

## Must

- show work or break phase explicitly
- update remaining time once per second in the interface
- allow pause, resume, and reset without ambiguity

## Should

- allow duration edits while idle
- keep the interface focused on the timer first and controls second

## Won't

- allow editing durations while a session is actively running

## Acceptance Criteria

- user can complete a visible work-to-break transition without reloading the page
