import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { DataHolderProvider } from '../../providers/data-holder/data-holder';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ApplyjobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-applyjob'
})
@Component({
  selector: 'page-applyjob',
  templateUrl: 'applyjob.html',
})
export class ApplyjobPage {
  job: any;
  message = ""
  public onLoginForm: FormGroup;

  constructor(private _fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private DataHolderProvider: DataHolderProvider, private storage: Storage) {
    this.job = navParams.get('job'); 
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      message: [this.DataHolderProvider.aboutMe, Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplyjobPage');
  }

  apply(message){
    console.log("message", message, this.DataHolderProvider.firstApply)
    this.storage.set('aboutme-7asdg7812d', message);
    this.DataHolderProvider.aboutMe = message;

    this.storage.get('firstApply-dhasdj123').then((val) => {
      if(val==null){
        this.navCtrl.push('page-applysuccess')
        this.storage.set('firstApply-dhasdj123', 'hello')
      }else{
        this.showToast();
      }
    });    
  }

  showToast(){
    
    let toast = this.toast.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Application Submitted',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
    this.navCtrl.popToRoot();
  }

  info(){
    this.navCtrl.push('page-openwebsite',{
      website: 'https://192.168.0.2/login.php?wlan=65549&token=4IfOqq2VvdGttRpxbdFwHA!!&dest=detectportal.firefox.com/success.txt'
    });
  }

}
