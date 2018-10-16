import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFireCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { Post } from '../../app/models/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  message: string;

  posts: { userName: string, message: string, createdDate: any }[] =
      [
        { userName: 'ポプ子', message: 'えいえい、おこった？', createdDate: '10分前' },
        { userName: 'ピピ美', message: 'おこってないよ', createdDate: '5分前' }
      ];
  constructor(
      public navCtrl: NavController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private afStore: AngularFirestore,
      private afAuth: AngularFireAuth
  ) {}


  addPost() {
    this.posts.push({
      userName: 'Kodai Matsumoto',
      message: this.message,
      createdDate: '数秒前'
    });
    this.message = '';
  }

  presentPrompt(index: number) {
    console.log('Index: ' + index);
    const alert = this.alertCtrl.create({
      title: 'メッセージ編集',
      inputs: [ { name: 'message', placeholder: 'メッセージ', value: this.posts[index].message } ],
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => console.log('キャンセルが選択されました')
        },
        {
          text: '更新',
          handler: data => {
            console.log(data);
            this.posts[index].message = data.message;
          }
        }
      ]
    });
    alert.present();
  }

  delete(index: number) {
    this.posts.splice(index, 1);
  }
}
