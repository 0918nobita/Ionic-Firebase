import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController) {}

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
