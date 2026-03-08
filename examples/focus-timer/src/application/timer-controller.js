import {
  defaultRemainingSeconds,
  nextPhase,
  Phase,
  phaseCopy,
  phaseLabel,
  validateSettings,
} from '../domain/timer-engine.js';

export class FocusTimerController {
  constructor({
    storage,
    now = () => Date.now(),
    scheduleTick = (callback) => window.setInterval(callback, 1000),
    clearScheduledTick = (id) => window.clearInterval(id),
  } = {}) {
    this.storage = storage;
    this.now = now;
    this.scheduleTick = scheduleTick;
    this.clearScheduledTick = clearScheduledTick;
    this.tickHandle = null;
    this.subscribers = new Set();

    const persisted = storage?.loadSettings?.();
    this.settings = {
      workMinutes: persisted?.workMinutes ?? 25,
      breakMinutes: persisted?.breakMinutes ?? 5,
    };

    this.phase = Phase.work;
    this.remainingSeconds = defaultRemainingSeconds(this.settings, this.phase);
    this.isRunning = false;
    this.startedAt = null;
    this.baseRemainingSeconds = this.remainingSeconds;
    this.validationMessage = '';
  }

  subscribe(listener) {
    this.subscribers.add(listener);
    listener(this.getViewModel());
    return () => this.subscribers.delete(listener);
  }

  getViewModel() {
    return {
      phase: this.phase,
      phaseLabel: phaseLabel(this.phase),
      phaseCopy: phaseCopy(this.phase),
      remainingSeconds: this.remainingSeconds,
      settings: { ...this.settings },
      isRunning: this.isRunning,
      canEditSettings: !this.isRunning,
      validationMessage: this.validationMessage,
    };
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.validationMessage = '';
    this.isRunning = true;
    this.startedAt = this.now();
    this.baseRemainingSeconds = this.remainingSeconds;
    this.tickHandle = this.scheduleTick(() => this.tick());
    this.notify();
  }

  pause() {
    if (!this.isRunning) {
      return;
    }
    this.tick();
    this.stopTicker();
    this.isRunning = false;
    this.startedAt = null;
    this.baseRemainingSeconds = this.remainingSeconds;
    this.notify();
  }

  resume() {
    if (this.isRunning) {
      return;
    }
    this.start();
  }

  reset() {
    this.stopTicker();
    this.isRunning = false;
    this.startedAt = null;
    this.remainingSeconds = defaultRemainingSeconds(this.settings, this.phase);
    this.baseRemainingSeconds = this.remainingSeconds;
    this.validationMessage = '';
    this.notify();
  }

  saveSettings({ workMinutes, breakMinutes }) {
    const settings = { workMinutes, breakMinutes };
    const validationMessage = validateSettings(settings);
    if (validationMessage) {
      this.validationMessage = validationMessage;
      this.notify();
      return false;
    }

    if (this.isRunning) {
      this.validationMessage = 'Pause or reset the timer before changing durations.';
      this.notify();
      return false;
    }

    this.settings = settings;
    this.remainingSeconds = defaultRemainingSeconds(this.settings, this.phase);
    this.baseRemainingSeconds = this.remainingSeconds;
    this.validationMessage = '';
    this.storage?.saveSettings?.(this.settings);
    this.notify();
    return true;
  }

  tick() {
    if (!this.isRunning || this.startedAt == null) {
      return;
    }

    const elapsedSeconds = Math.floor((this.now() - this.startedAt) / 1000);
    const nextRemaining = this.baseRemainingSeconds - elapsedSeconds;

    if (nextRemaining > 0) {
      this.remainingSeconds = nextRemaining;
      this.notify();
      return;
    }

    this.phase = nextPhase(this.phase);
    this.remainingSeconds = defaultRemainingSeconds(this.settings, this.phase);
    this.baseRemainingSeconds = this.remainingSeconds;
    this.startedAt = this.now();
    this.notify();
  }

  stopTicker() {
    if (this.tickHandle != null) {
      this.clearScheduledTick(this.tickHandle);
      this.tickHandle = null;
    }
  }

  notify() {
    const viewModel = this.getViewModel();
    for (const subscriber of this.subscribers) {
      subscriber(viewModel);
    }
  }
}
