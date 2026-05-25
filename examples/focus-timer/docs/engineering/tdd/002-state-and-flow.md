# TDD 002: State and Flow

## Direction

- running state is derived from timestamps and phase metadata
- paused state stores remaining seconds
- resetting preserves configured durations and current phase type
- completed phases transition automatically into the next phase

## Acceptance Criteria

- start, pause, resume, reset, and phase transition behavior is controller-owned and testable
