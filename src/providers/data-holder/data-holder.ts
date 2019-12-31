import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataHolderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataHolderProvider {

  public isInternetWorking = true;
  public numbers: {
      jobId: number, 
      city: string, 
      title: string, 
      description: string,
      address: string, 
      pay: string,
      phone: string,
      status: string
    }[] = [];
  public nNumbers = this.numbers.length;
  public lastUpdated;
  public myCity: string;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello DataHolderProvider Provider');
    this.getNumbersFromStorageOnLogin();
  }

  getNumbersFromStorageOnLogin(){

    var a = [{
      jobId: 36693, 
      city: "Karachi", 
      title: "Tution for 3", 
      description: `We are looking for an <strong>Accountant</strong>\n\n<ul>\n\t<li>Should have knowledge of Bookkeeping and other account jobs&nbsp;</li>\n\t<li>Manage all accounting transactions</li>\n\t<li>Prepare budget forecasts</li>\n\t<li>Publish financial statements in time</li>\n\t<li>Handle monthly, quarterly and annual closings</li>\n\t<li>Reconcile accounts payable and receivable</li>\n</ul>\n`,
      address: "1 Year",
      pay: "20000 - 25000", 
      phone: "123123",
      status: "new"
     }]
     ;
    //this.storage.set('tution-numbers-19264124', a)
    this.storage.get('tution-numbers-19264124').then((val) => {

      if (val===null){
        console.log("no numbers found. Error!!!", val);
      }
      else{
        this.numbers = val;
        this.nNumbers = val.length;
        console.log("some numbers found", val);    
      }
    }); 

    this.storage.get('tution-city-2891236').then((val) => {

      if (val===null){
        console.log("no numbers found. Error!!!", val);
      }
      else{
        this.myCity = val;
        console.log("some numbers found", val);    
      }
    }); 

    this.storage.get('data').then((val) => {

      if (val===null){
        console.log("no last updated found. Error!!!", val);
        this.lastUpdated = Date.now()-1800000;
        this.updateLastUpdatedtoStorage();
      }
      else{
        this.lastUpdated = val;
        console.log("last updated found", val);    
      }
    }); 
  }

  getNumbers(){
   return this.numbers;
 }

  getNumbersFromServer(){
    var InitiateGetTransactions = function(textIdInp, callback) // How can I use this callback?
     {
         var request = new XMLHttpRequest();
         request.onreadystatechange = function()
         {
             if (request.readyState == 4 && request.status == 200)
             {
                 callback(request.responseText); // Another callback here
             }
             if (request.readyState == 4 && request.status == 0)
             {
                  _this.isInternetWorking = false;
                 console.log("no response for transactions") // Another callback here
             }
         };
         
         _this.storage.get('data').then((val) => {

          if (val===null){
            console.log("no last updated found. Error!!!", val);
            _this.lastUpdated = Date.now()-1800000;
          }
          else{
            _this.lastUpdated = val;
            console.log("last updated found", val); 
          }
          request.open("POST", "http://api.anomoz.com/api/pakTutions/post/read_tutions.php?city="+_this.myCity+"&lastId="+_this.nNumbers);
            request.send();
        }); 

         
     }
     
     var _this = this;
     var frameTransactions = function mycallback(data) {
       //_this.numbers = []
       console.log("transactions received from server," , data)
       var dataParsed
       if(Date.now() - _this.lastUpdated>1800000){//43200000 //1800000
          console.log("updating lastUpdated");
          dataParsed = JSON.parse(data);
          if(dataParsed.message=="none"){
            console.log("no transactions")
          }
          else{
            var sampleTrans = dataParsed
              console.log("in St",sampleTrans)
              for (var i=0; i<sampleTrans.length; i++){
                  var a = {
                    id: sampleTrans[i].id,
                    jobId: sampleTrans[i].jobId, 
                    city: sampleTrans[i].city, 
                    title: sampleTrans[i].title, 
                    description: sampleTrans[i].description,
                    phone: sampleTrans[i].phone, 
                    pay: sampleTrans[i].pay,
                    address: sampleTrans[i].address,
                    status: 'new'}
                  if(sampleTrans[i].id>_this.nNumbers){
                    _this.numbers.push(a);
                    _this.nNumbers +=1;
                  }
              }
              //add to local storage
              _this.lastUpdated = _this.lastUpdated + 1800000;
              _this.updateNumbertoStorage();
              _this.updateLastUpdatedtoStorage();
          }
       }
       
     }
     InitiateGetTransactions(1, frameTransactions); //passing mycallback as a method 
  }

  updateNumbertoStorage(){
    console.log("numbers storage updated", this.numbers)
    this.storage.set('tution-numbers-19264124', this.numbers);
  }

  updateLastUpdatedtoStorage(){
    console.log("lastupdated storage updated", this.lastUpdated)
    this.storage.set('data', this.lastUpdated);
  }



}
