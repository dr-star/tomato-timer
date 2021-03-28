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

export function playAudio(): void {
  const audio = new Audio();
  audio.src = '../assets/audio/audio.mp3';
  audio.load();
  audio.play();
}

export function isNullOrUndefined(object: any): boolean {
  return object === null || object === undefined;
}
