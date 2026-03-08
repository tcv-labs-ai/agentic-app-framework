export const Phase = {
  work: 'work',
  break: 'break',
};

export function minutesToSeconds(minutes) {
  return minutes * 60;
}

export function formatRemainingTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function phaseLabel(phase) {
  return phase === Phase.work ? 'Work session' : 'Break session';
}

export function phaseCopy(phase) {
  return phase === Phase.work
    ? 'Stay focused until the session completes.'
    : 'Step back and recharge before the next work block.';
}

export function nextPhase(phase) {
  return phase === Phase.work ? Phase.break : Phase.work;
}

export function defaultRemainingSeconds(settings, phase) {
  return phase === Phase.work
    ? minutesToSeconds(settings.workMinutes)
    : minutesToSeconds(settings.breakMinutes);
}

export function validateSettings({ workMinutes, breakMinutes }) {
  if (!Number.isInteger(workMinutes) || workMinutes < 1) {
    return 'Work minutes must be a whole number of at least 1.';
  }

  if (!Number.isInteger(breakMinutes) || breakMinutes < 1) {
    return 'Break minutes must be a whole number of at least 1.';
  }

  return null;
}
