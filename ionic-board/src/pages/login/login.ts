import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: {
    email: string,
    password: string
  } = {
    email: '',
    password: ''
  };

  constructor(
      public navCtrl: NavController,
      private toastCtrl: ToastController,
      private afAuth: AngularFireAuth) {}

  async userLogin() {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(
          this.login.email, this.login.password);

      this.toastCtrl.create({
        message: 'ログイン成功',
        duration: 3000
      }).present();

      this.navCtrl.setRoot(HomePage);
    } catch (error) {
      this.toastCtrl.create({
        message: error,
        duration: 5000
      }).present();
    }
  }

  gotoSignup() {
    this.navCtrl.push(SignupPage);
  }
}
