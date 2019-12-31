import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataHolderProvider } from '../../providers/data-holder/data-holder';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private DataHolderProvider: DataHolderProvider, private storage: Storage) {

  }

  numbers = [];
  nNumbers = 0;

  ionViewWillLoad(){
    console.log('ionViewWillEnter homepage');
    //this.storage.set('tution-city-2891236', null)
    this.storage.get('tution-city-2891236').then((val) => {

      if (val===null){
        console.log("no last updated found. Error!!!", val);
        this.navCtrl.push('page-addaccount')
      }
    }); 

    this.numbers = this.DataHolderProvider.getNumbers();
    console.log("this.DataHolderProvider.lastUpdated", this.DataHolderProvider.lastUpdated);
    this.DataHolderProvider.getNumbersFromServer();
  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad")
   }

  ionViewWillEnter(){

    var _this = this;
    setTimeout(function(){
      _this.updateData1_4()
    }, 200);

    setTimeout(function(){
      _this.updateData1_4()
    }, 500);

    setTimeout(function(){
      _this.updateData1_4()
    }, 900);

    setTimeout(function(){
      _this.updateData1_4()
    }, 1500);
  }

  updateData1_4(){
    this.numbers = this.DataHolderProvider.getNumbers();
    this.nNumbers = this.DataHolderProvider.getNumbers().length;
    //console.log("updated " , this.DataHolderProvider.numbers)
  }

  async openJob(job){
    
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.jobId==job.jobId){
        element.status="read";
        console.log("status changed")
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
    
    this.navCtrl.push('page-contact', {
      job: job
    })

  }

  favorite(phoneNumber){
    this.DataHolderProvider.numbers.forEach(element => {
      if(element.jobId==phoneNumber){
        element.status="favorite";
      }
    });
    this.DataHolderProvider.updateNumbertoStorage();
  }

  about(){
    this.navCtrl.push('page-about')
  }

 

}
