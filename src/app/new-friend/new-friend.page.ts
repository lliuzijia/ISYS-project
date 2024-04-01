import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.page.html',
  styleUrls: ['./new-friend.page.scss'],
})
export class NewFriendPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner) { }


  ngOnInit() {
  }

  scan() {
  this.barcodeScanner.scan().then(barcodeData => {
    // 扫描成功
    console.log('Barcode data', barcodeData);
  }).catch(err => {
    // 扫描失败
    console.log('Error', err);
  });
}

}
