import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(public http:HttpClient) { }

  register(data:any){
    return this.http.post(environment.serverURL+`user/register`,data);
  }

  login(data:any){
//    debugger;
    return this.http.post(environment.serverURL+`/user/login`,data);
  }

  currentUsr(){
    let details = JSON.parse(window.sessionStorage.getItem('currentuser'));
    return details;
  }


  getData(data:any) {
    return this.http.post(environment.serverURL + '/message_camapign/addCampaign',data);
  }

  addemailcampaign(data:any){
    return this.http.post(environment.serverURL +'/message_camapign/addCampaignEmails',data)
  }

camapaignDetails()
{
return this.http.post(environment.serverURL +'/message_camapign/campaignDetails', {})
}

addContext(data:any){
return this.http.post(environment.serverURL +'/message_camapign/addContext', data)
}
addContacts(data:any){
return this.http.post(environment.serverURL +'/message_camapign/addContacts', data)
}
getAllCampaignContacts(data:any){
return this.http.post(environment.serverURL +'/message_camapign/getAllCampaignContacts', data)
}
whatsappCampaign(data:any){
return this.http.post(environment.serverURL +'/message_camapign/startWhatsappCampaign', data)
}
smsCampaign(data:any){
  return  this.http.post(environment.serverURL +'/message_camapign/startSMSCampaign', data)
}
getAllTemplates(){
  return  this.http.get(environment.serverURL +'/message_camapign/getAllTemplates')
}

}



