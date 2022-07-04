import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})],
    }).compileComponents();
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
