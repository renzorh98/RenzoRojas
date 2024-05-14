import {fakeAsync, TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {NotificationInterface, NotificationType} from "../../interfaces/notification/notification.interface";
import {first, Subject} from "rxjs";

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationSource: Subject<NotificationInterface>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    notificationSource = service['notificationSource'] as Subject<NotificationInterface>; // Access private member
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit notification when show is called', fakeAsync(() => {
    const testNotification: NotificationInterface = {
      message: 'Test notification message',
      type: NotificationType.INFO
    };

    service.show(testNotification);

    service.notification$.pipe(first()).subscribe(notification => {
      expect(notification).toEqual(testNotification);
    });
  }));
});
