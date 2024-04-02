import { Injectable } from '@angular/core';
import { UserInfo } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Assume your user list and chat messages are stored in this service

  private userList: UserInfo[] = [
    { id: 1, name: 'Zhang San', avatar: 'path-to-avatar-1', description: 'I am Zhang San, nice to meet you.', phone: '13812345671', email: 'zhangsan@example.com', address: 'Chaoyang District, Beijing', company: 'ABC Company', department: 'Sales Department', position: 'Supervisor', notes: 'Notes for Zhang San' },
    { id: 2, name: 'Li Si', avatar: 'path-to-avatar-2', description: 'I am Li Si, nice to meet you.', phone: '13812345672', email: 'lisi@example.com', address: 'Pudong New Area, Shanghai', company: 'DEF Company', department: 'Sales Department', position: 'Supervisor', notes: 'Notes for Li Si' },
    { id: 3, name: 'Wang Wu', avatar: 'path-to-avatar-3', description: 'I am Wang Wu, nice to meet you.', phone: '13812345673', email: 'wangwu@example.com', address: 'Tianhe District, Guangzhou', company: 'GHI Company', department: 'Sales Department', position: 'Supervisor', notes: 'Notes for Wang Wu' },
    { id: 4, name: 'Zhao Liu', avatar: 'path-to-avatar-4', description: 'I am Zhao Liu, nice to meet you.', phone: '13812345674', email: 'zhaoliu@example.com', address: 'Nanshan District, Shenzhen', company: 'JKL Company', department: 'Sales Department', position: 'Supervisor', notes: 'Notes for Zhao Liu' }
    // Other users...
  ];

  private chatMessages: { [userId: number]: string[] } = {
    1: ['Message 1', 'Message 2', 'Message 3'],
    2: ['Message 4', 'Message 5', 'Message 6'],
    // Chat messages for other users...
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
