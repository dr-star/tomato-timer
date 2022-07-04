import {NotificationService} from './notification.service';
import {isBreak, TimerType} from './TimerType';

describe('NotificationService', () => {

  it('TimerType.TOMATO should not be recognized as a break', () => {
    expect(isBreak(TimerType.TOMATO)).toBeFalse();
  });
  it('TimerType.SHORT_BREAK should be recognized as a break', () => {
    expect(isBreak(TimerType.SHORT_BREAK)).toBeTrue();
  });
  it('TimerType.LONG_BREAK should be recognized as a break', () => {
    expect(isBreak(TimerType.LONG_BREAK)).toBeTrue();
  });
});
