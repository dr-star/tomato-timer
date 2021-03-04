import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LONG_BREAK_DURATION, SHORT_BREAK_DURATION, Timer, TOMATO_DURATION} from '../Timer';
import * as timers from 'src/app/Timer';
import {retrieveTimersFromSessionStorage} from '../Utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() timerDurationChanged = new EventEmitter<void>();

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
  }

  public settings: FormGroup;

  ngOnInit(): void {
    const savedTimers = retrieveTimersFromSessionStorage();
    this.settings = this.fb.group({
      timers: this.fb.group({
        tomato: [savedTimers.tomato, [Validators.required, Validators.min(1), Validators.max(59)]],
        shortBreak: [savedTimers.shortBreak, [Validators.required, Validators.min(1), Validators.max(59)]],
        longBreak: [savedTimers.longBreak, [Validators.required, Validators.min(1), Validators.max(59)]],
      })
    });
  }

  public open(content): void {
    this.modalService.open(content, {size: 'lg'}).result.then();
  }

  public save(): void {
    if (this.settings.valid) {

      const timersForm = this.settings.get('timers');
      const timer = new Timer(+timersForm.get('tomato').value, +timersForm.get('shortBreak').value, +timersForm.get('longBreak').value);

      sessionStorage.setItem('timers', JSON.stringify(timer));
      this.timerDurationChanged.emit();
    }
  }
}
