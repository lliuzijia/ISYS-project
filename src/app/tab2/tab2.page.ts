import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../user/user.service'; // 导入 UserService
import { UserInfo } from '../user/user-info.model'; // 导入 UserInfo 模型
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  userList: UserInfo[] = [];

  constructor(private userService: UserService,private navCtrl: NavController,private router: Router) {}

  ngOnInit() {
    this.userList = this.userService.getUsers(); // 获取用户列表
  }

  openChat(userId: number) {
  // 使用用户的 ID 导航到聊天页面
  this.navCtrl.navigateForward(['/chat', userId]);
}

}
