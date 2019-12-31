import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { DataHolderProvider } from '../../providers/data-holder/data-holder';

@IonicPage({
  name: 'page-about'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private DataHolderProvider: DataHolderProvider) {

  }


 



}
