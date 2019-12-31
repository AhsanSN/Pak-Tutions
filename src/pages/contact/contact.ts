import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'page-contact'
})

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  job: any;
  title: string;
  city: string;
  description: string;
  pay: string;
  jobId: string;
  phone: string;
  address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.job = navParams.get('job'); 
    console.log("job", this.job)
    this.title = this.job.title;
    this.city = this.job.city;
    this.description = this.job.description;
    this.pay = this.job.pay;
    this.phone = this.job.phone;
    this.address = this.job.address;
    this.jobId = this.job.jobId;
  }

  apply(){
    
  } 

}
