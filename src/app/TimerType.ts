export enum TimerType {
  TOMATO,
  SHORT_BREAK,
  LONG_BREAK
}

export function isBreak(timerType: TimerType): boolean {
  return timerType === TimerType.SHORT_BREAK || timerType === TimerType.LONG_BREAK;
}
