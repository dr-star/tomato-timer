import {TimerType} from './TimerType';

export class Record {
  startDate: Date;
  endDate: Date;
  remainingTime: Date;
  timerType: TimerType;
  saveRequired: boolean;
}
