import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'; // 导入 UserService
import { UserInfo } from '../user/user-info.model'; // 导入 UserInfo 模型
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  // 用户列表
  userList: UserInfo[] = [];
  // 构造函数中注入 UserService
  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    // 从 UserService 中获取用户列表
    this.userList = this.userService.getUsers();
  }
  
  // 打开用户详情页面
  openUserDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
  // 添加新朋友
  goToNewFriendPage() {
    this.router.navigate(['/new-friend']);
  }
}
