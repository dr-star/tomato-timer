import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

const TOMATO_DURATION = 25;
const SHORT_BREAK_DURATION = 5;
const LONG_BREAK_DURATION = 10;
const ONE_SECOND = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tomato-timer';

  public remainingTime = new Date();
  private subscription = new Subscription();
  public disableStartButton: boolean;
  private selectedDuration = TOMATO_DURATION;

  public ngOnInit(): void {
    this.remainingTime = this.calculateTimeDifference();
  }

  public start(): void {
    this.disableStartButton = true;
    this.subscription = interval(ONE_SECOND).subscribe(n => {
      this.remainingTime.setSeconds(this.remainingTime.getSeconds() - 1);
      this.remainingTime = new Date(this.remainingTime.getTime());

      if (this.remainingTime.getMinutes() === 0 && this.remainingTime.getSeconds() === 0) {
        this.subscription.unsubscribe();
      }
    });
  }

  public pause(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;
  }

  public reset(): void {
    this.subscription.unsubscribe();
    this.disableStartButton = false;

    this.remainingTime = this.calculateTimeDifference();
  }

  private calculateDateToReach(): Date {
    const result = new Date();
    result.setMinutes(result.getMinutes() + this.selectedDuration);
    return result;
  }

  private calculateTimeDifference(): Date {
    const dateToReach = this.calculateDateToReach();
    return new Date(dateToReach.getTime() - new Date().getTime());
  }

  public selectTomato(): void {
    this.selectedDuration = TOMATO_DURATION;
    this.reset();

  }

  public selectShortBreak(): void {
    this.selectedDuration = SHORT_BREAK_DURATION;
    this.reset();
  }

  public selectLongBreak(): void {
    this.selectedDuration = LONG_BREAK_DURATION;
    this.reset();
  }
}
