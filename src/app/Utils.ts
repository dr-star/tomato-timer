import {LONG_BREAK_DURATION, SHORT_BREAK_DURATION, Timer, TOMATO_DURATION} from './Timer';

export function retrieveTimersFromSessionStorage(): Timer {
  const timer = (JSON.parse(sessionStorage.getItem('timers')) as Timer);

  return timer === null ? new Timer(TOMATO_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION) : timer ;
}
