import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service'; // Import UserService
import { Users } from '../user/user-info.model'; // Import UserInfo model

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userId: number = -1;
  user: Users = {
    Usersid: '',
    password: '',
    roleid: '',
    username: '',
    phone: '',
    nickname: '',
    gender: '',
  };

  userName: string = '';

  chatMessages: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    
  }
}
