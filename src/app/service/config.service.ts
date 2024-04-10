import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // 定义服务器基本地址
  BASE_URL = 'http://localhost:3060';

  constructor() { }

  // 获取注册用户端点地址
  getRegisterUserUrl(): string {
    return `${this.BASE_URL}/api/regist`;
  }
}
