import test from 'node:test';
import assert from 'node:assert/strict';

import { FocusTimerController } from '../src/application/timer-controller.js';
import { Phase } from '../src/domain/timer-engine.js';

class FakeStorage {
  constructor(initial = null) {
    this.persisted = initial;
  }

  loadSettings() {
    return this.persisted;
  }

  saveSettings(settings) {
    this.persisted = settings;
  }
}

test('loads persisted settings when present', () => {
  const controller = new FocusTimerController({
    storage: new FakeStorage({ workMinutes: 30, breakMinutes: 10 }),
    scheduleTick: () => 1,
    clearScheduledTick: () => {},
  });

  assert.deepEqual(controller.getViewModel().settings, {
    workMinutes: 30,
    breakMinutes: 10,
  });
});

test('start pause and resume preserve timer state', () => {
  let nowValue = 0;
  let cleared = false;
  const controller = new FocusTimerController({
    storage: new FakeStorage(),
    now: () => nowValue,
    scheduleTick: () => 1,
    clearScheduledTick: () => {
      cleared = true;
    },
  });

  controller.start();
  nowValue = 10_000;
  controller.tick();
  controller.pause();

  assert.equal(controller.getViewModel().isRunning, false);
  assert.equal(controller.getViewModel().remainingSeconds, 1490);
  assert.equal(cleared, true);

  controller.resume();
  assert.equal(controller.getViewModel().isRunning, true);
});

test('transitions automatically from work to break', () => {
  let nowValue = 0;
  const controller = new FocusTimerController({
    storage: new FakeStorage({ workMinutes: 1, breakMinutes: 2 }),
    now: () => nowValue,
    scheduleTick: () => 1,
    clearScheduledTick: () => {},
  });

  controller.start();
  nowValue = 60_000;
  controller.tick();

  assert.equal(controller.getViewModel().phase, Phase.break);
  assert.equal(controller.getViewModel().remainingSeconds, 120);
});

test('valid settings save and invalid settings are rejected', () => {
  const storage = new FakeStorage();
  const controller = new FocusTimerController({
    storage,
    scheduleTick: () => 1,
    clearScheduledTick: () => {},
  });

  assert.equal(
    controller.saveSettings({ workMinutes: 45, breakMinutes: 15 }),
    true,
  );
  assert.deepEqual(storage.persisted, { workMinutes: 45, breakMinutes: 15 });

  assert.equal(
    controller.saveSettings({ workMinutes: 0, breakMinutes: 15 }),
    false,
  );
  assert.match(controller.getViewModel().validationMessage, /Work minutes/);
});
