import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // 这里定义您的配置信息，例如服务器的主机地址
  HOST = 'http://example.com';

  constructor() { }

}
