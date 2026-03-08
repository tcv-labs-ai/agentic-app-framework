import test from 'node:test';
import assert from 'node:assert/strict';

import {
  defaultRemainingSeconds,
  formatRemainingTime,
  nextPhase,
  Phase,
  validateSettings,
} from '../src/domain/timer-engine.js';

test('formats remaining time as MM:SS', () => {
  assert.equal(formatRemainingTime(1500), '25:00');
  assert.equal(formatRemainingTime(65), '01:05');
});

test('returns the next phase in the cycle', () => {
  assert.equal(nextPhase(Phase.work), Phase.break);
  assert.equal(nextPhase(Phase.break), Phase.work);
});

test('derives default remaining seconds from settings and phase', () => {
  const settings = { workMinutes: 25, breakMinutes: 5 };
  assert.equal(defaultRemainingSeconds(settings, Phase.work), 1500);
  assert.equal(defaultRemainingSeconds(settings, Phase.break), 300);
});

test('validates whole-minute settings', () => {
  assert.equal(validateSettings({ workMinutes: 25, breakMinutes: 5 }), null);
  assert.match(
    validateSettings({ workMinutes: 0, breakMinutes: 5 }),
    /Work minutes/,
  );
  assert.match(
    validateSettings({ workMinutes: 25, breakMinutes: 1.5 }),
    /Break minutes/,
  );
});
