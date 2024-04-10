import { Component, OnInit } from '@angular/core';
import { Users } from '../../user/user-info.model';
import { AuthService } from "../../service/auth.service";
import { NotificationService } from "../../service/notification.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
  user: Users;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {
    this.user = new Users();
  }

  ngOnInit() {
  }

  // 注册新用户的方法
  register() {
    // 根据是否管理员设置角色ID
    this.user.roleid = this.isAdmin ? '1' : '2';

    console.dir(this.user);

    // 调用 AuthService 中的 registerUser 方法进行注册
    this.authService.registerUser(this.user)
      .then((response: any) => {
        // 假设后端在注册成功时返回的对象中包含了一些标识（例如：{ insert: "success" }）
        if (response.insert === "success") {
          this.notificationService.showSuccessNotification('注册成功');
          this.router.navigate(['/tabs/tab1']);
        } else {
          // 如果后端返回的不是预期的成功标识，显示错误通知
          this.notificationService.showErrorNotification('注册失败，请重试');
        }
      })
      .catch((error) => {
        // 捕获到错误时显示错误通知
        console.error("注册错误：", error);
        this.notificationService.showErrorNotification('注册过程中出现错误');
      });
  }
}
