import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-addaccount'
})
@Component({
  selector: 'page-addaccount',
  templateUrl: 'addaccount.html',
})
export class AddaccountPage {
  // list of locations
  public locations: any;
  locationNameSearch: string;
  locationsCopy: any;
   
 constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
 }
 
 ionViewDidLoad() {
     // set sample data
     
     this.locations = [{
       name: "Karachi"
     }];
     this.locationNameSearch = ""
     this.locationsCopy = this.locations
      
  }
 
  
 
   resetChanges(){
     //console.log("reset", this.locations, this.locationsCopy)
     this.locations = this.locationsCopy
   }
   
   searchLocation(){
     this.resetChanges();
     console.log("this.locations", this.locations)
     this.locations = this.locations.filter((item)=>{
       return item.name.toLowerCase().indexOf(this.locationNameSearch.toLowerCase())>-1;
     })
   } 

   viewlocation(location){
     //console.log('location', location)
     document.getElementById('finalResultText').innerText = location.name;
     document.getElementById('finalResult').style.display = "block";
     this.storage.set('tution-city-2891236', location.name)
     //this.navCtrl.push('addLocation');
   }

   addReceiver(){
     this.navCtrl.popToRoot();
   }
   
}
