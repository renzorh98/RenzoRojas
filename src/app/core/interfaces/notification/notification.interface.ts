export interface NotificationInterface {
  type: NotificationType;
  message: string;
  time?: number;
}

export enum NotificationType{
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
