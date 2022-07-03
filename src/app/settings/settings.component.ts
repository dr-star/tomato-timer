import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Timer} from '../Timer';
import * as timers from 'src/app/Timer';
import {retrieveSettingsFromLocalStorage} from '../Utils';
import {Setting} from '../Setting';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Output() timerDurationChanged = new EventEmitter<void>();

  public version: string = environment.APP_VERSION;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
  }

  public settings: FormGroup;

  ngOnInit(): void {
    const settings = retrieveSettingsFromLocalStorage();
    const timerSettings = settings.timer;
    this.settings = this.fb.group({
      showTimerInTitle: settings.showTimerInTitle,
      autostartBreaks: settings.autostartBreaks,
      timers: this.fb.group({
        tomato: [timerSettings.tomato, [Validators.required, Validators.min(1), Validators.max(59)]],
        shortBreak: [timerSettings.shortBreak, [Validators.required, Validators.min(1), Validators.max(59)]],
        longBreak: [timerSettings.longBreak, [Validators.required, Validators.min(1), Validators.max(59)]],
      })
    });
  }

  public open(content): void {
    this.modalService.open(content, {size: 'lg', backdrop: 'static'}).result.then().catch(() => {});
  }

  public save(): void {
    if (this.settings.valid) {

      const timersForm = this.settings.get('timers');
      const timer = new Timer(+timersForm.get('tomato').value, +timersForm.get('shortBreak').value, +timersForm.get('longBreak').value);

      const settings = new Setting();
      settings.timer = timer;
      settings.showTimerInTitle = this.settings.get('showTimerInTitle').value;
      settings.autostartBreaks = this.settings.get('autostartBreaks').value;

      localStorage.setItem('settings', JSON.stringify(settings));
      this.timerDurationChanged.emit();
    }
  }
}
