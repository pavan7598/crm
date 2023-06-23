import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private $roi_change_trigger=new Subject<any>()
  constructor(public http: HttpClient) { }
  private subject = new Subject<any>();
  sendChartData(data:Object) {
    this.subject.next(data);
  }

  getChartData(): Observable<any> {
    return this.subject.asObservable();
  }
  getAllCampaigns() {
    console.log('==========>get campaign')
    return this.http.get(environment.serverURL + `campaign/getAllCampaign`);
  }

  getCampaign(data: any) {
    return this.http.post(environment.serverURL + `campaign/getCampaign/` + data, {})
  }

  deleteCmapign(data: any) {
    return this.http.get(environment.serverURL + `campaign/deleteCmapign/` + data)
  }

  updateCmapign(data: any) {
    return this.http.post(environment.serverURL + `campaign/deleteCmapign/` + data, {})
  }

  createCampaign(data: any) {
    console.log('========>creating campaign===>',data);
    return this.http.post(environment.serverURL + `campaign/createCampaign`, data)
  }

  changeStatus(data: any) {
    return this.http.post(environment.serverURL + `campaign/changeStatus/` + data, {})
  }

  saveSegment(data:any){
    return this.http.post(environment.serverURL + `segmentation/createsegment`, data)
  }

  getAllSegment(){
    return this.http.get(environment.serverURL + `segmentation/getAllSegment`)
  }

  getCampaignCount(data:any){
    console.log('======>data',data);
    return this.http.post(environment.serverURL + `campaign/getCampaignCount`,data)
  }

  getRevenueData(data:any){
    return this.http.post(environment.serverURL + `campaign/getCampaignRevinue`,data)
  }

  emailCampaignStatus(data:any){
    return this.http.post(environment.serverURL + `campaign/emailCampaignStatus`,data)
  }

  getMessageSent(data:any){
    return this.http.post(environment.serverURL + `campaign/getMessageSent`,data)
  }

  execute(data:any){
  
    return this.http.post(environment.serverURL + `segmentation/execute`,data)
  }
getTargatedCamapignCount(data){
 
  return this.http.post(environment.serverURL + `campaign/getTargatedCampaignCount`,data)
}

getExecuteDistinct(data){
 
  return this.http.post(environment.serverURL + `segmentation/executeDistinct`,data)
}
getCampaignROI(filter){
 
  return this.http.get(environment.serverURL + `campaign/getCampaignROI/${filter}`)
}

getMockCampaign(){
  return this.http.get(environment.serverURL + `campaign/mockscampaigns`)
}
roiTrigger()
{
  return this.$roi_change_trigger;
}
  
}
