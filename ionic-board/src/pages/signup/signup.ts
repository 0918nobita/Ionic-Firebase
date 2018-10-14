import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  goBack() {
    this.navCtrl.pop();
  }
}
