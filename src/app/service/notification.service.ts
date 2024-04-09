import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccessNotification(message: string) {
    // 显示成功通知的逻辑，可以使用 Toast、Alert 等
    console.log("Success notification: " + message);
  }

  showErrorNotification(message: string) {
    // 显示错误通知的逻辑，可以使用 Toast、Alert 等
    console.error("Error notification: " + message);
  }
  // 可以添加其他通知方法，如 showErrorNotification、showInfoNotification 等
}
