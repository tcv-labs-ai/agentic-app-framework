# Focus Timer Example

A small example application that demonstrates how to use the Agentic App Framework in a real project.

This example shows:

- filled PRDs and TDDs
- a real `project-state/implementation-status.md`
- the `project-state/handoffs/` continuity convention
- one focused ADR
- a small app with clear domain, application, and presentation layers
- tests that align with the documented architecture

## Product Summary

Focus Timer is a browser-first timer for structured work and break sessions.

Users can:

- set work duration
- set break duration
- start, pause, resume, and reset a session
- see whether the current phase is work or break
- progress through repeating work and break cycles

## Tech Choice

The example is intentionally minimal:

- plain HTML/CSS/JavaScript
- no framework
- Node built-in test runner

This keeps the example easy to inspect while still demonstrating the framework’s documentation and architecture model.

## Run The Example

Run a local server:

```bash
cd examples/focus-timer
npm start
```

Then open the printed `http://localhost:4173` URL in a browser.

## Run Tests

```bash
cd examples/focus-timer
npm test
```
