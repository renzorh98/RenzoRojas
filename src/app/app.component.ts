import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "../shared/components/header/header.component";
import {CustomeNotificationComponent} from "../shared/components/custome-notification/custome-notification.component";
import {NotificationService} from "./core/services/notification/notification.service";
import {NotificationInterface, NotificationType} from "./core/interfaces/notification/notification.interface";
import {LoadingService} from "./core/services/loading/loading.service";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "../shared/components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CustomeNotificationComponent, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'RenzoRojas';
  notificationType: NotificationType = NotificationType.SUCCESS
  notificationMessage: string = ''
  showNotification: boolean = false
  isLoading: boolean = false

  constructor(
    private notificationS: NotificationService,
    private loadingS: LoadingService
  ) {
  }

  ngOnInit() {
    this.notificationS.notification$.subscribe((res: NotificationInterface) => {
      this.notificationType = res.type
      this.notificationMessage = res.message
      this.showNotification = true

      setTimeout(() => {
        this.showNotification = false
      }, res.time||5000)
    })

    this.loadingS.loader$.subscribe((res) => {
      this.isLoading = res
    })
  }


}
