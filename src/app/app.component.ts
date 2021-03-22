import {Component, OnInit, ViewChild} from '@angular/core';
import {TimerComponent} from './timer/timer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(TimerComponent) timer: TimerComponent;
  title = 'tomato-timer';

  public resetTimer(): void {
    this.timer.reset();
  }
}
