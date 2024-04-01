import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service'; // 导入 UserService
import { UserInfo } from '../user/user-info.model'; // 导入 UserInfo 模型
// UserDetails是储存通讯录列表内容
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user: UserInfo;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = { id: -1, name: '', avatar: '', description: '', phone: '',email: '',address: '',company: '',department: '',position: '',notes: ''};
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      const user = this.userService.getUserById(userId);
      if (user) {
        this.user = user;
      } else {
        // 处理未找到用户的情况，例如显示错误消息或者重定向到其他页面
      }
    });
  }
}
