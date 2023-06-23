import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SgmentationMethodsService {
  private subject = new Subject<any>();
  private slab = new Subject<any>();
  noModel:any;
  public dataSource =  new BehaviorSubject<any>({});
  public currentData = this.dataSource.asObservable();



  constructor(public http: HttpClient) { }



  sendSlabData(data: Object) {
    this.slab.next(data);
  }

  getSlabData(): Observable<any> {
    return this.slab.asObservable();
  }


  set isDataSource(data: any) {
    this.dataSource.next(data);
  }

  get isDataSource() {
    return this.currentData;
  }

  getDimensions() {
    return this.http.get(environment.serverURL + `segmentation/getDimensions`)
  }
  getDistinctDimentions(data:any){
    return this.http.post(environment.serverURL + `segmentation/getDistinctDimentions`,data)
  }
  getFixedSlabs(slabData,filtercondition,common){
    //debugger;
    let paly_load = {filters:slabData,final_condition:filtercondition,common}
    return this.http.post(environment.serverURL + `segmentation/getFixedElements`,paly_load)
  }
  getPercentilelabs(filtercondition,Common,number_of_division){
    //debugger;
    let paly_load = {final_condition:filtercondition,number_of_divisions:number_of_division,common:Common}
    return this.http.post(environment.serverURL + `segmentation/getPercentileDistribution`,paly_load)
  }
  getNormalSlabs(filtercondition,common,type,meanDisvision){
   // debugger;
   console.log(filtercondition,common,meanDisvision);
    let paly_load = {final_condition:filtercondition,common:common,type:type,meanDisvision:meanDisvision}
    return this.http.post(environment.serverURL + `segmentation/getNormaleDistribution`,paly_load)
  }
  getTotalCustomerSummary(data:any) {
    return this.http.post(environment.serverURL + `segmentation/getTotalCustomerSummary`,data)
  }

  saveSegment(data:any){
    return this.http.post(environment.serverURL + `segmentation/createsegment`,data)
  }

  getAllSegments(){
    return this.http.get(environment.serverURL + `segmentation/getAllSegment`)
  }
  
}
