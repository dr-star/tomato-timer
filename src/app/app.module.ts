import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SettingsComponent } from './settings/settings.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimerComponent } from './timer/timer.component';
import { FaqComponent } from './faq/faq.component';
import { RecordHistoryComponent } from './record-history/record-history.component';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingsComponent,
    TimerComponent,
    FaqComponent,
    RecordHistoryComponent
  ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        NgbModule,
        NgxGoogleAnalyticsModule.forRoot(environment.GOOGLE_ANALYTICS_TRACKING_CODE),
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
