import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) {

   }
   getAllSchedules(){
    return this.http.get(environment.serverURL+'schedule/getAllSchedules')
   }
   getCampaignList(){
     return this.http.get(environment.serverURL+'campaign/getAllCampaign') 
   }
   saveSchedule(scheduleObject)
   {
    return this.http.post(environment.serverURL+'schedule/createSchedule',scheduleObject) 
   }
   runSchedule(id)
   {
    return this.http.get(environment.serverURL+'schedule/runSchedule/'+id) 
   }
   changeScheduleStatus(id,status)
   {
//     debugger;
    return this.http.post(environment.serverURL+'campaign/updateCmapign/'+id,{status}) 
   }
  //  resumeSchedule(id)
  //  {
  //   return this.http.get(environment.serverURL+'schedule/resumeSchedule/'+id) 
  //  }
  //  cancelSchedule(id)
  //  {
  //    return this.http.get(environment.serverURL+'schedule/cancelSchedule/'+id) 
  //  }
   getScheduleByStauts(stauts)
   {
    return this.http.get(environment.serverURL+`schedule/getScheduleByStatus/${stauts}`)
   }
   
}
