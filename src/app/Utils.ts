import {Timer} from './Timer';
import {Setting} from './Setting';

export function retrieveTimersFromLocalStorage(): Timer {
  return retrieveSettingsFromLocalStorage().timer;
}

export function retrieveSettingsFromLocalStorage(): Setting {
  const settings = (JSON.parse(localStorage.getItem('settings')) as Setting);

  return settings === null ?
    new Setting() : settings;
}
