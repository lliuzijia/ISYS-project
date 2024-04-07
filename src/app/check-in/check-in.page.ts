import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Geolocation, Position, PositionOptions } from '@capacitor/geolocation';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {
  currentPosition: Position | undefined;
  currentTime: string | undefined;
  checkInRecords: { time: string, latitude: number, longitude: number, checkIn: boolean }[] = [];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private geolocation: Geolocation
  ) { }

  async checkIn() {
    await this.getCurrentPosition();
    const time = new Date().toLocaleString();
    this.checkInRecords.push({
      time: time,
      latitude: this.currentPosition?.coords.latitude || 0,
      longitude: this.currentPosition?.coords.longitude || 0,
      checkIn: true
    });
    const alert = await this.alertController.create({
      header: 'Check-In Successful',
      message: 'You have successfully checked in.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async checkOut() {
    await this.getCurrentPosition();
    const time = new Date().toLocaleString();
    this.checkInRecords.push({
      time: time,
      latitude: this.currentPosition?.coords.latitude || 0,
      longitude: this.currentPosition?.coords.longitude || 0,
      checkIn: false // 设置为签出
    });
    const alert = await this.alertController.create({
      header: 'Check-Out Successful',
      message: 'You have successfully checked Out.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getCurrentPosition() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.currentPosition = await Geolocation.getCurrentPosition(options);
      console.log('Current position:', this.currentPosition);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  getCurrentTime() {
    const date = new Date();
    this.currentTime = date.toLocaleString();
  }
}
