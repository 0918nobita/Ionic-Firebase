import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signup: {
    email: string;
    password: string;
    name: string;
  } = {
    email: '',
    password: '',
    name: ''
  };

  constructor(
      public navCtrl: NavController,
      private toastCtrl: ToastController,
      private afAuth: AngularFireAuth
  ) {}

  async signUp() {
    try {
      const user = (await this.afAuth.auth.createUserWithEmailAndPassword(
          this.signup.email, this.signup.password)).user;
      await user.updateProfile({ displayName: this.signup.name, photoURL: '' });
      this.toastCtrl.create({
        message: `${user.displayName} さんを登録しました`,
        duration: 3000
      }).present();
      this.goBack();
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }
}
