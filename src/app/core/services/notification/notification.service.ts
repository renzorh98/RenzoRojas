import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NotificationInterface} from "../../interfaces/notification/notification.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationSource = new Subject<NotificationInterface>()
  notification$ = this.notificationSource.asObservable();

  constructor() {
  }

  show(notification: NotificationInterface) {
     this.notificationSource.next(notification);
  }
}
