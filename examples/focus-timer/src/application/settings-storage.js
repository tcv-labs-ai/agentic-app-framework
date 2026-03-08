const storageKey = 'focus-timer-settings';

export class BrowserSettingsStorage {
  loadSettings() {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawValue);
      if (
        Number.isInteger(parsed?.workMinutes) &&
        Number.isInteger(parsed?.breakMinutes)
      ) {
        return parsed;
      }
    } catch {
      return null;
    }

    return null;
  }

  saveSettings(settings) {
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }
}
