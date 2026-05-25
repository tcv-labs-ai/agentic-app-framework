# TDD 005: Testing Strategy

## Recommended Test Layers

- unit tests for timer progression rules
- unit tests for controller transitions and persistence interactions
- keep DOM logic thin enough that browser-specific testing can remain minimal in this example

## Priorities

- correctness of phase transitions
- correctness of pause/resume/reset
- validation and persistence behavior
