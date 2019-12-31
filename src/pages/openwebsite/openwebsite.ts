import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the OpenwebsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-openwebsite'
})
@Component({
  selector: 'page-openwebsite',
  templateUrl: 'openwebsite.html',
})
export class OpenwebsitePage {

  my_url: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitize: DomSanitizer) {
    this.my_url = navParams.get('website'); 
    if(this.my_url==null){
      this.my_url = 'https://jobee.pk/jobdetail/telesales-representative-d778392d94d9d648';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenwebsitePage');
  }

  urlpaste(){
    //this.my_url = "https://projects.anomoz.com/swift/addFace.php";
    return this.sanitize.bypassSecurityTrustResourceUrl(this.my_url);
  }

}
