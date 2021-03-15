import {TimerType} from './TimerType';

export class Record {
  endDate: Date;
  timerType: TimerType;

  constructor(date: Date, timerType: TimerType) {
    this.endDate = date;
    this.timerType = timerType;
  }

}
