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

  posts: { userName: string, message: string, createdDate: any }[] =
      [
        { userName: 'ポプ子', message: 'えいえい、おこった？', createdDate: '10分前' },
        { userName: 'ピピ美', message: 'おこってないよ', createdDate: '5分前' }
      ];

  constructor(public navCtrl: NavController) {}
}
