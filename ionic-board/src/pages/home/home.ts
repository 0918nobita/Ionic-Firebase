import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  post: {
    userName: string,
    message: string,
    createdDate: any
  } = {
    userName: 'Kodai Matsumoto',
    message: 'これはテストメッセージです',
    createdDate: '10分前'
  };

  constructor(public navCtrl: NavController) {}
}
