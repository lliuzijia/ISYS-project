import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  currentPosition: Position | undefined; // 当前位置信息
  currentTime: string | undefined; // 当前时间
  lastCheckInTime: Date | undefined; // 上次签到时间
  lastCheckOutTime: Date | undefined; // 上次签出时间
  checkInRecords: { time: string, companyName: string, checkIn: boolean, remark?: string }[] = []; // 签到记录
  companyLatitude: number = -27.9705699; // 公司纬度
  companyLongitude: number = 153.4134075; // 公司经度
  companyRange: number = 400; // 公司范围半径
  companyName: string = ''; // 公司名称
  isCheckingIn: boolean = false; // 是否正在签到

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private geolocation: Geolocation
  ) { }

  // 执行签到操作
  async checkIn() {
    this.isCheckingIn = true; // 设置正在签到标志为true
    await this.getCurrentPosition(); // 获取当前位置信息
    const time = new Date().toLocaleString(); // 获取当前时间

    // 检查是否在公司范围内
    if (!this.isWithinCompanyRange(this.currentPosition)) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You are not within company range. Cannot check in.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // 检查是否已经签到
    if (this.lastCheckInTime && (!this.lastCheckOutTime || this.lastCheckInTime > this.lastCheckOutTime)) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You have already checked in. Cannot check in again.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // 检查是否在签出前签到
    if (this.lastCheckInTime && (!this.lastCheckOutTime || this.lastCheckInTime.getTime() > this.lastCheckOutTime.getTime())) {
      const alert = await this.alertController.create({
        header: 'Check-In Error',
        message: 'You cannot check in before checking out.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // 记录签到时间
    this.lastCheckInTime = new Date();

    const alert = await this.alertController.create({
      header: 'Check-In Successful',
      message: 'You have successfully checked in.',
      buttons: ['OK']
    });

    await alert.present(); // 显示提示框
    await this.addRemark(); // 添加备注信息
  }

  // 执行签出操作
  async checkOut() {
    this.isCheckingIn = false; // 设置正在签到标志为false
    if (!this.isWithinCompanyRange(this.currentPosition)) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You are not within company range. Cannot check out.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.lastCheckInTime) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You have not checked in yet. Cannot check out before checking in.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.getCurrentPosition(); // 获取当前位置信息
    const time = new Date().toLocaleString(); // 获取当前时间

    // 检查是否已经签出
    if (this.lastCheckOutTime && this.lastCheckInTime && this.lastCheckOutTime.getTime() > this.lastCheckInTime.getTime()) {
      const alert = await this.alertController.create({
        header: 'Check-Out Error',
        message: 'You have already checked out. Cannot check out again.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.lastCheckOutTime = new Date(); // 记录签出时间

    const alert = await this.alertController.create({
      header: 'Check-Out Successful',
      message: 'You have successfully checked Out.',
      buttons: ['OK']
    });

    await this.addRemark(); // 添加备注信息
    await alert.present(); // 显示提示框
  }

  // 添加备注信息
  async addRemark() {
    const alert = await this.alertController.create({
      header: 'Add Remark',
      inputs: [
        {
          name: 'remark',
          type: 'text',
          placeholder: 'Enter your remark...'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (data) => {
            this.handleRemark(data.remark); // 处理备注信息
          }
        }
      ]
    });

    await alert.present(); // 显示添加备注的对话框
  }

  // 获取当前位置信息
  async getCurrentPosition() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.currentPosition = await Geolocation.getCurrentPosition(options); // 获取当前位置信息
      console.log('Current position:', this.currentPosition);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  // 获取当前时间
  getCurrentTime() {
    const date = new Date();
    this.currentTime = date.toLocaleString();
  }

  // 检查是否在公司范围内
  isWithinCompanyRange(position: Position | undefined): boolean {
    if (!position) return false;

    const employeeLatitude = position.coords.latitude;
    const employeeLongitude = position.coords.longitude;

    // 计算距离
    const earthRadius = 6371e3;
    const φ1 = this.companyLatitude * Math.PI / 180;
    const φ2 = employeeLatitude * Math.PI / 180;
    const Δφ = (employeeLatitude - this.companyLatitude) * Math.PI / 180;
    const Δλ = (employeeLongitude - this.companyLongitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    this.companyName = distance <= this.companyRange ? 'Company' : ''; // 设置公司名称

    return distance <= this.companyRange; // 返回是否在公司范围内的结果
  }

  // 处理备注信息
  async handleRemark(remark: string) {
    const time = new Date().toLocaleString(); // 获取当前时间
    await this.getCurrentPosition(); // 获取当前位置信息

    // 检查当前位置是否在公司范围内，设置公司名称
    const withinCompanyRange = this.isWithinCompanyRange(this.currentPosition);

    this.companyName = withinCompanyRange ? 'Company' : '';

    const record = {
      time: time,
      companyName: this.companyName,
      checkIn: this.isCheckingIn,
      remark: remark.trim() !== '' ? remark.trim() : 'No Remark', // 设置备注信息
    };
    this.checkInRecords.push(record); // 添加记录到签到记录数组
  }
}
