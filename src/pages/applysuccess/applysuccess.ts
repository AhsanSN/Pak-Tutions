import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApplysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-applysuccess'
})
@Component({
  selector: 'page-applysuccess',
  templateUrl: 'applysuccess.html',
})
export class ApplysuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplysuccessPage');
  }

  okay(){
    this.navCtrl.popToRoot();
  }
  
}
