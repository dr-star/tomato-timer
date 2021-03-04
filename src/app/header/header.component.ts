import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() timerDurationChanged = new EventEmitter<void>();

  constructor() { }

  public ngOnInit(): void {
  }

  public resetTimer(): void {
    this.timerDurationChanged.emit();
  }
}
