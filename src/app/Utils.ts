import {Timer} from './Timer';
import {Setting} from './Setting';

export function retrieveTimersFromSessionStorage(): Timer {
  return retrieveSettingsFromSessionStorage().timer;
}

export function retrieveSettingsFromSessionStorage(): Setting {
  const settings = (JSON.parse(sessionStorage.getItem('settings')) as Setting);

  return settings === null ?
    new Setting() : settings;
}
