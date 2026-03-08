import { FocusTimerController } from '../application/timer-controller.js';
import { BrowserSettingsStorage } from '../application/settings-storage.js';
import { formatRemainingTime, Phase } from '../domain/timer-engine.js';

const controller = new FocusTimerController({
  storage: new BrowserSettingsStorage(),
});

const elements = {
  shell: document.getElementById('app-shell'),
  phaseLabel: document.getElementById('phase-label'),
  phaseCopy: document.getElementById('phase-copy'),
  timeDisplay: document.getElementById('time-display'),
  validationMessage: document.getElementById('validation-message'),
  statusLine: document.getElementById('status-line'),
  workMinutes: document.getElementById('work-minutes'),
  breakMinutes: document.getElementById('break-minutes'),
  settingsForm: document.getElementById('settings-form'),
  startButton: document.getElementById('start-button'),
  pauseButton: document.getElementById('pause-button'),
  resumeButton: document.getElementById('resume-button'),
  resetButton: document.getElementById('reset-button'),
};

controller.subscribe((viewModel) => {
  elements.phaseLabel.textContent = viewModel.phaseLabel;
  elements.phaseCopy.textContent = viewModel.phaseCopy;
  elements.timeDisplay.textContent = formatRemainingTime(viewModel.remainingSeconds);
  elements.validationMessage.textContent = viewModel.validationMessage;
  elements.statusLine.textContent = viewModel.isRunning ? 'Running' : 'Idle';
  elements.workMinutes.value = String(viewModel.settings.workMinutes);
  elements.breakMinutes.value = String(viewModel.settings.breakMinutes);
  elements.workMinutes.disabled = !viewModel.canEditSettings;
  elements.breakMinutes.disabled = !viewModel.canEditSettings;
  elements.startButton.disabled = viewModel.isRunning;
  elements.pauseButton.disabled = !viewModel.isRunning;
  elements.resumeButton.disabled = viewModel.isRunning || (viewModel.remainingSeconds === (viewModel.phase === Phase.work ? viewModel.settings.workMinutes * 60 : viewModel.settings.breakMinutes * 60));
  elements.shell.classList.toggle('work', viewModel.phase === Phase.work);
  elements.shell.classList.toggle('break', viewModel.phase === Phase.break);
});

elements.startButton.addEventListener('click', () => controller.start());
elements.pauseButton.addEventListener('click', () => controller.pause());
elements.resumeButton.addEventListener('click', () => controller.resume());
elements.resetButton.addEventListener('click', () => controller.reset());

elements.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  controller.saveSettings({
    workMinutes: Number.parseInt(elements.workMinutes.value, 10),
    breakMinutes: Number.parseInt(elements.breakMinutes.value, 10),
  });
});
