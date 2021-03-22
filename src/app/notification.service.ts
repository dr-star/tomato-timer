import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly VAPID_PUBLIC_KEY = 'BKX5ZcBf0ETpYDVs-w0LrX27nFyjCmhilWx4oMrJDCmjk9RWTz7Q0qO4gXSv3xJGp_ckDe9c9d7ThCwiqa6FPOY';

  private sub;

  constructor(
    private swPush: SwPush,
  ) {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.sub = sub)
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  public sendNotification(title: string, options: NotificationOptions): void {
    new Notification(title, options);
  }

}
