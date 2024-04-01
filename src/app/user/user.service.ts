import { Injectable } from '@angular/core';
import { UserInfo } from './user-info.model';
//user是储存用户信息
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 假设您的用户列表和聊天消息都存储在该服务中

  private userList: UserInfo[] = [
    { id: 1, name: '张三', avatar: 'path-to-avatar-1', description: '我是张三，很高兴认识你' ,phone: '13812345671',email: 'zhangsan@example.com',address: '北京市朝阳区',company : 'ABC公司',department : '销售部',position: '主管',notes: '张三备注信息'},
    { id: 2, name: '李四', avatar: 'path-to-avatar-2', description: '我是李四，很高兴认识你', phone: '13812345672', email: 'lisi@example.com', address: '上海市浦东新区' ,company : 'DEF公司',department : '销售部',position: '主管',notes: '李四备注信息'},
    { id: 3, name: '王五', avatar: 'path-to-avatar-3', description: '我是王五，很高兴认识你', phone: '13812345673', email: 'wangwu@example.com', address: '广州市天河区',company : 'GHI公司',department : '销售部',position: '主管',notes: '王五备注信息' },
    { id: 4, name : '赵六', avatar: 'path-to-avatar-4', description: '我是赵六，很高兴认识你', phone: '13812345674', email: 'zhaoliu@example.com', address: '深圳市南山区',company : 'JKL公司',department : '销售部',position: '主管',notes: '赵六备注信息'}
    // 其他用户...
  ];

  private chatMessages: { [userId: number]: string[] } = {
    1: ['Message 1', 'Message 2', 'Message 3'],
    2: ['Message 4', 'Message 5', 'Message 6'],
    // 其他用户的聊天消息...
  };

  constructor() { }

  getUsers(): UserInfo[] {
    return this.userList;
  }

  getUserById(id: number): UserInfo | undefined {
    return this.userList.find(user => user.id === id);
  }

  getChatMessagesForUser(user: UserInfo): string[] {
    return this.chatMessages[user.id] || [];
  }
}
