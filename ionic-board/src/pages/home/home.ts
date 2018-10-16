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
  posts: Post[];
  postsCollection: AngularFirestoreCollection<Post>;

  constructor(
      public navCtrl: NavController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private afStore: AngularFirestore,
      private afAuth: AngularFireAuth
  ) {}

  ionViewWillEnter() {
    this.getPosts();
  }

  async addPost() {
    try {
      const docRef = await this.afStore.collection('posts').add({
        id: '',
        userName: this.afAuth.auth.currentUser.displayName,
        message: this.message,
        created: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.postsCollection.doc(docRef.id).update({ id: docRef.id });
      this.message = '';
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }

  getPosts() {
    this.postsCollection = this.afStore.collection('posts', ref => ref.orderBy('created', 'desc'));
    this.postsCollection.valueChanges().subscribe(data => { this.posts = data; });
  }

  presentPrompt(index: number, post: Post) {
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
          handler: data => this.updatePost(post, data.message)
        }
      ]
    });
    alert.present();
  }

  async updatePost(post: Post, message: string) {
    try {
      await this.postsCollection.doc(post.id).update({ message });
      this.toastCtrl.create({
        message: '投稿が更新されました',
        duration: 3000
      }).present();
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }

  async delete(post: Post) {
    try {
      await this.postsCollection.doc(post.id).delete();
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }
}
