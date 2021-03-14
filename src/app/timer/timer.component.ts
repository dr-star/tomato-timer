import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {retrieveSettingsFromSessionStorage, retrieveTimersFromSessionStorage} from '../Utils';
import {TimerType} from '../TimerType';
import {Title} from '@angular/platform-browser';

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
  private selectedTimerType = TimerType.TOMATO;

  constructor(private titleService: Title) {
  }

  public ngOnInit(): void {
    this.remainingTime = this.calculateTimeDifference();
  }

  public start(): void {
    this.disableStartButton = true;
    this.disableStopButton = false;
    this.subscription = interval(ONE_SECOND).subscribe(n => {
      if (retrieveSettingsFromSessionStorage().showTimerInTitle) {
        this.titleService.setTitle('(' + this.remainingTime.getMinutes() + ':' + this.remainingTime.getSeconds() + ') ' + DEFAULT_TITLE);
      }

      this.remainingTime.setSeconds(this.remainingTime.getSeconds() - 1);
      this.remainingTime = new Date(this.remainingTime.getTime());

      if (this.remainingTime.getMinutes() === 0 && this.remainingTime.getSeconds() === 0) {
        this.disableStopButton = true;
        this.subscription.unsubscribe();
        this.playAudio();
      }
    });
  }

  private playAudio(): void {
    const audio = new Audio();
    audio.src = '../assets/audio/audio.mp3';
    audio.load();
    audio.play();
  }

  public pause(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;
  }

  public reset(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;
    this.disableStopButton = false;

    this.remainingTime = this.calculateTimeDifference();
    this.titleService.setTitle(DEFAULT_TITLE);
  }

  private calculateDateToReach(): Date {
    const result = new Date();
    result.setMinutes(result.getMinutes() + this.getSelectedDuration(this.selectedTimerType));
    return result;
  }

  private calculateTimeDifference(): Date {
    const dateToReach = this.calculateDateToReach();
    return new Date(dateToReach.getTime() - new Date().getTime());
  }

  public selectTomato(): void {
    this.selectedTimerType = TimerType.TOMATO;
    this.reset();
  }

  public selectShortBreak(): void {
    this.selectedTimerType = TimerType.SHORT_BREAK;
    this.reset();
  }

  public selectLongBreak(): void {
    this.selectedTimerType = TimerType.LONG_BREAK;
    this.reset();
  }

  private getSelectedDuration(timerType: TimerType): number {
    const timer = retrieveTimersFromSessionStorage();
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
