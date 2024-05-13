import {Component, Input} from '@angular/core';
import {NotificationType} from "../../../app/core/interfaces/notification/notification.interface";

@Component({
  selector: 'app-custome-notification',
  standalone: true,
  imports: [],
  templateUrl: './custome-notification.component.html',
  styleUrl: './custome-notification.component.scss'
})
export class CustomeNotificationComponent {
  @Input() message: string = ''
  @Input() type: NotificationType = NotificationType.SUCCESS

  constructor() {

  }
}
