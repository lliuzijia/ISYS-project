import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Users } from "../user/user-info.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  // 更新用户信息的URL
  private updateUserUrl = this.config.BASE_URL + "/api/updateUser";

  // 更新用户信息
  updateUser(user: Users) {
    return this.http.put(this.updateUserUrl, user).toPromise();
  }

  // 用户登录
  private loginUrl = this.config.BASE_URL + "/public/login";
  login(username: string, password: string) {
    let parm = {
      "username": username,
      "password": password
    };
    return this.http.post(this.loginUrl, parm).toPromise();
  }

  // 注册新用户
  registerUser(user: Users) {
    const registerUserUrl = this.config.getRegisterUserUrl();
    return this.http.post(registerUserUrl, user).toPromise();
  }
}
