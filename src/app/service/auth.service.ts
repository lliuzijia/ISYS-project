import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { Users } from "../user/user-info.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  // 添加或更新用户信息
  private addOrUpdateUserUrl = this.config.HOST + "/public/saveUser";
  addOrUpdateUser(users: Users) {
    return this.http.post(this.addOrUpdateUserUrl, users).toPromise();
  }

  // 用户登录
  private loginUrl = this.config.HOST + "/public/login";
  login(username: string, password: string) {
    let parm = {
      "username": username,
      "password": password
    };
    return this.http.post(this.loginUrl, parm).toPromise();
  }

}
