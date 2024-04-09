import { Component, OnInit } from '@angular/core';
import { Users } from '../../user/user-info.model';
import { AuthService } from "../../service/auth.service";
import { NotificationService } from "../../service/notification.service";

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
  user: Users;
  constructor(private authservice: AuthService
    , private notificationservice: NotificationService) {
    this.user = new Users();
  }

  ngOnInit() {
  }

  //保存方法
  save() {
    console.dir(this.user);

    this.authservice.addOrUpdateUser(this.user)
      .then((data: any) => {
        if (data.msg == 'ok') {
          this.notificationservice.showSuccessNotification('保存成功');
        }
        else {
          this.notificationservice.showErrorNotification('保存失败，请重试');
        }
      })
  }

}