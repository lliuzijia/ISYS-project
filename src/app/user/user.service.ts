import { Injectable } from '@angular/core';
import { Users } from './user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Assume your user list and chat messages are stored in this service

  private userList: Users[] = [
    
  ];

  private chatMessages: { [userId: number]: string[] } = {
    1: ['Message 1', 'Message 2', 'Message 3'],
    2: ['Message 4', 'Message 5', 'Message 6'],
    // Chat messages for other users...
  };

  constructor() { }

  getUsers(): Users[] {
    return this.userList;
  }


}
