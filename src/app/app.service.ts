import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public total_players;
  public elementList: any = [];
  public MeasureList: any = [];
  CampaignType: any;
  constructor(private http: HttpClient) {
    this.http.get(environment.serverURL + 'campaign/getTotalPlayerCount').subscribe((data: any) => {
      this.total_players = parseInt(data.data[0].count)
      //console.log("this.total_players======>", this.total_players);
    })

    this.http.get(environment.serverURL + 'segmentation/getElements/').subscribe((data: any) => {
      this.elementList = data.data;
      //console.log("this.elementList======>", this.elementList);
    })

    this.http.get(environment.serverURL + 'segmentation/getMeasure/').subscribe((data: any) => {
      this.MeasureList = data;
      //console.log("this.MeasureList======>", this.MeasureList);
    })

  }

  CampaignTableType:any;

  elementlist(){
    // this.http.get(environment.serverURL + 'segmentation/getElements/').subscribe((data: any) => {
    //   this.elementList = data.data;
    //   //console.log("this.elementList======>", this.elementList);
    // })
    return this.http.get(environment.serverURL + 'segmentation/getElements/')
  }


}
