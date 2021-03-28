import { Component, OnInit } from '@angular/core';
import {Record} from '../Record';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TimerType} from '../TimerType';

@Component({
  selector: 'app-log-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.css']
})
export class RecordHistoryComponent {
  public records: Record[] = [];
  constructor(private modalService: NgbModal) { }

  public open(content): void {
    this.records = (JSON.parse(localStorage.getItem('logs')) as Record[]);
    this.modalService.open(content, {size: 'lg'}).result.then().catch(() => {});
  }

  public getTimerName(timerType: TimerType): string {
    switch (timerType) {
      case TimerType.TOMATO:
        return 'Tomato';
      case TimerType.SHORT_BREAK:
        return 'Short Break';
      case TimerType.LONG_BREAK:
        return 'Long Break';
    }
  }

  public deleteAllRecords(): void {
    this.records = [];
    localStorage.removeItem('logs');
  }
}
