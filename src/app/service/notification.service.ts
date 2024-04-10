import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccessNotification(message: string) {
    alert("Success: " + message); // 使用alert显示成功通知
  }

  showErrorNotification(message: string) {
    alert("Error: " + message); // 使用alert显示错误通知
  }
}
