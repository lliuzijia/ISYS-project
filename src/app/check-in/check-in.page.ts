import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage {

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  async checkIn() {
    const alert = await this.alertController.create({
      header: 'Check-In Successful',
      message: 'You have successfully checked in.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
