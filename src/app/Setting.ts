import {Timer} from './Timer';

export const TOMATO_DURATION = 25;
export const SHORT_BREAK_DURATION = 5;
export const LONG_BREAK_DURATION = 10;

export class Setting {
  timer: Timer;
  showTimerInTitle: boolean;

  constructor() {
    this.timer = new Timer(TOMATO_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION);
  }

}
