export const TOMATO_DURATION = 25;
export const SHORT_BREAK_DURATION = 5;
export const LONG_BREAK_DURATION = 10;

export class Timer {
  tomato: number;
  shortBreak: number;
  longBreak: number;

  constructor(tomato: number, shortBreak: number, longBreak: number) {
    this.tomato = tomato;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
  }

}
