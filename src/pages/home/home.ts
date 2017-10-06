import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
  o2Val: number = 0.0;
  co2Val: number = 0.0;
  nh3Val: number = 0.0;
  danger:string = "NO";
  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private btCtrl: BluetoothSerial
  ) {
  }

  ngOnInit(){

  }

  ngAfterViewInit(){
    this.btCtrl.isEnabled().then(
      res => { },
      err => {
        this.btCtrl.enable().then(
          res => {  },
          err => { this.alertMessage('error','Unable to enable Bluetooth.');}
        );
      }
    );
    this.btCtrl.list().then(
      res =>{
        this.alertMessage('devices info',JSON.stringify(res));
      },
      err => { this.alertMessage('error', 'Unable to list Bluetooth devices.');}
    );
    this.btCtrl.connect("20:15:08:13:27:93")
      .subscribe(res => {
        this.alertMessage('info',JSON.stringify(res));
      });
  }


  //ToDo : Add exception for connection lost
  getData():void {
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("0");
      },
      err => {
        this.alertMessage('error', err);
      }
    );
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.read().then(
          res => {
            this.alertMessage('info',res);
          },
          err => {
            this.alertMessage('error',err);
          }
        );
      },
      err => {
        this.alertMessage('error', err);
      }
    );
  }

  goFront():void{
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("1");
      },
      err => {
        this.alertMessage('error',err);
      });
    console.log('movd');
  }

  goBack():void{
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("4");
      },
      err => {
        this.alertMessage('error',err);
      });
    console.log('movd');
  }

  turnLeft():void{
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("2");
      },
      err => {
        this.alertMessage('error',err);
      });
    console.log('movl');
  }

  turnRight():void{
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("3");
      },
      err => {
        this.alertMessage('error',err);
      });
    console.log('movr');
  }

  stopMove():void{
    this.btCtrl.isConnected().then(
      () => {
        this.btCtrl.write("5");
      },
      err => {
        this.alertMessage('error',err);
      });
    console.log('movu');
  }
  alertMessage(title: string, subtitle:string):void{
    this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    }).present();
  }
}
