import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private http: HttpClient, private router: Router) { }

  // 处理用户登录
  login() {
    // 构建登录数据对象
    const loginData = {
      email: this.email,
      password: this.password
    };

    // 发起HTTP POST请求以进行登录验证
    this.http.post<{ login: string, user?: any, message?: string }>('http://localhost:3060/api/login', loginData)
      .subscribe(response => {
        // 处理登录成功的情况
        if (response.login === 'success') {
          // 导航到另一个页面，例如主页
          this.router.navigateByUrl('/tabs/tab1');
        } else {
          // 处理登录失败，显示错误消息
          alert(response.message || 'Login failed');
        }
      }, error => {
        // 处理登录请求错误
        console.error('Login error:', error);
        alert('An error occurred');
      });
  }

  // 导航到注册页面
  register() {
    // 导航到注册页面，确保路由配置正确
    this.router.navigate(['/regist']);
  }
}
