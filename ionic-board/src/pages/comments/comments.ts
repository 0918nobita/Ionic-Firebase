import { Component } from '@angular/core';
import { ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Post } from '../../app/models/post';
import { Comment } from '../../app/models/comment';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  sourcePost: Post;
  message: string;
  comment: Comment;
  comments: Comment[];
  commentsCollection: AngularFirestoreCollection<Comment>;

  constructor(
      public navParams: NavParams,
      private toastCtrl: ToastController,
      private afAuth: AngularFireAuth,
      private afStore: AngularFirestore
  ) {
    this.sourcePost = navParams.get('post');
  }

  ionViewDidLoad() {
    this.getComments();
  }

  getComments() {
    this.commentsCollection = this.afStore.collection('comments',
        ref => ref.where('sourcePostId', '==', this.sourcePost.id)
                  .orderBy('created', 'desc'));
    this.commentsCollection.valueChanges().subscribe(data => {
      this.comments = data;
    });
  }

  async addComment() {
    try {
      const docRef = await this.afStore.collection('comments').add({
        userName: this.afAuth.auth.currentUser.displayName,
        message: this.message,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        sourcePostId: this.sourcePost.id
      });
      this.toastCtrl.create({
        message: 'コメントを投稿できました',
        duration: 3000
      }).present();
      this.message = '';
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }
}
