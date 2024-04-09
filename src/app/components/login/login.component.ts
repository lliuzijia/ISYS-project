import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { NotificationService } from "../../service/notification.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private authservice: AuthService
    , private notificationservice: NotificationService) { }

  ngOnInit() { }

  //点击登录按钮触发的事件方法
  login() {
    this.authservice.login(this.username, this.password)
      .then((data: any) => {

        if (data.msg == 'ok') {
          this.notificationservice.showSuccessNotification('登录成功');
        }
        else {
          this.notificationservice.showErrorNotification('用户名或是密码错误，请重试');
          this.username = "";
          this.password = "";
        }

      })
  }

}