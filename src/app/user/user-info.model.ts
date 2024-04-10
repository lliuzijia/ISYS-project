export class Users {
  Usersid: string;
  email: string; // 已修改为小写
  password: string;
  roleid: string;
  username: string;
  phone: string;
  nickname: string;
  gender: string;

  constructor() {
    this.Usersid = "";
    this.email = ""; // 已修改为小写
    this.password = "";
    this.roleid = "";
    this.username = "";
    this.phone = "";
    this.nickname = "";
    this.gender = "";
  }
}
