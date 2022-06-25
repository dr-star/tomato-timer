import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {isNullOrUndefined, playAudio, retrieveSettingsFromLocalStorage, retrieveTimersFromLocalStorage} from '../Utils';
import {TimerType} from '../TimerType';
import {Title} from '@angular/platform-browser';
import {Record} from '../Record';
import {NotificationService} from '../notification.service';

const ONE_SECOND = 1000;
const DEFAULT_TITLE = 'Tomato Timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public remainingTime = new Date();
  private subscription = new Subscription();
  public disableStartButton: boolean;
  public disableStopButton: boolean;
  public selectedTimerType = TimerType.TOMATO;

  public records = (JSON.parse(localStorage.getItem('logs')) as Record[]) || [];
  public currentRecord = new Record();

  constructor(private titleService: Title,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.remainingTime = this.calculateDateToReach();
  }

  public start(): void {

    if (isNullOrUndefined(this.currentRecord.startDate)) {
      this.currentRecord.startDate = new Date();
      this.currentRecord.timerType = this.selectedTimerType;
      this.currentRecord.saveRequired = true;
    }

    this.disableStartButton = true;
    this.disableStopButton = false;
    this.subscription = interval(ONE_SECOND).subscribe(n => {
      this.remainingTime.setSeconds(this.remainingTime.getSeconds() - 1);
      this.remainingTime = new Date(this.remainingTime.getTime());

      if (retrieveSettingsFromLocalStorage().showTimerInTitle) {
        this.titleService.setTitle('(' + this.remainingTime.getMinutes() + ':' + this.remainingTime.getSeconds() + ') ' + DEFAULT_TITLE);
      }

      if (this.remainingTime.getMinutes() === 0 && this.remainingTime.getSeconds() === 0) {
        this.disableStopButton = true;
        this.subscription.unsubscribe();
        playAudio();
        this.saveCurrentRecord();
        this.notificationService.sendNotification('No more time', {body: 'Ehi! The timer is over!'});
      }
    });
  }

  private saveCurrentRecord(): void {
    this.currentRecord.saveRequired = false;
    this.currentRecord.endDate = new Date();
    this.currentRecord.remainingTime = this.remainingTime;

    this.records.push(this.currentRecord);
    localStorage.setItem('logs', JSON.stringify(this.records));
  }

  public pause(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;
  }

  public reset(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;
    this.disableStopButton = false;

    if (this.currentRecord.saveRequired) {
      this.saveCurrentRecord();
    }

    this.currentRecord = new Record();

    this.remainingTime = this.calculateDateToReach();
    this.titleService.setTitle(DEFAULT_TITLE);
  }

  private calculateDateToReach(): Date {
    const selectedDuration = this.getSelectedDuration(this.selectedTimerType);

    const dateToReach = new Date();
    const result = new Date(dateToReach);

    dateToReach.setMinutes(result.getMinutes() + selectedDuration);

    return new Date(dateToReach.getTime() - result.getTime());
  }

  public onChangeSelection(): void {
    this.reset();
  }

  private getSelectedDuration(timerType: TimerType): number {
    const timer = retrieveTimersFromLocalStorage();
    let result: number;
    switch (timerType) {
      case TimerType.TOMATO:
        result = timer.tomato;
        break;
      case TimerType.SHORT_BREAK:
        result = timer.shortBreak;
        break;
      case TimerType.LONG_BREAK:
        result = timer.longBreak;
    }
    return result;
  }

}
