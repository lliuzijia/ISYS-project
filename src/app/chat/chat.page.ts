import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service'; // 导入 UserService
import { UserInfo } from '../user/user-info.model'; // 导入 UserInfo 模型

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userId: number= -1;
  user: UserInfo = { 
    id: -1, 
    name: '', 
    avatar: '', 
    description: '', 
    phone: '',
    email: '',
    address: '',
    company: '',
    department: '',
    position: '',
    notes: ''
};

  userName: string ='';

  chatMessages: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.user = this.userService.getUserById(this.userId)!;
      if (this.user) {
        // 如果找到了用户，则获取该用户的聊天消息
        this.chatMessages = this.userService.getChatMessagesForUser(this.user);
      }
      this.userName = this.user ? this.user.name : 'Unknown';
    });
  }
}
