import { Component, OnInit, ViewChild } from '@angular/core';
import { RevenueOverviewComponent } from './revenue-overview/revenue-overview.component';
import { CampaignService } from './../campaign/campaign.service';
import {MessagesSentComponent} from './messages-sent/messages-sent.component';
import { AppService } from '../app.service';
import {CampaignListComponent} from './campaign-list/campaign-list.component';
import { ScheduleService } from '../schedule/schedule.service';
@Component({
  selector: 'app-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss']
})
export class CampaignSummaryComponent implements OnInit {
  targated_camapigns={
    num_of_players:null,
    total_ngr:null,
  }
  precent_targated
  total_palyer_count;
  emailSuccess:any=0;
  emailFailed:any=0;
  activelength:any=[];
  scheduledata:any=[];
inactivelength:any=[];
draftlength:any=[];
completedlength:any=[];
inprogresslength:any=[];
  constructor(private ss:ScheduleService,private campService: CampaignService,private as:AppService) {
      this.total_palyer_count = this.as.total_players;
      this.date=new Date();
   }
  

  @ViewChild(RevenueOverviewComponent, { static: true }) revenue: RevenueOverviewComponent;
  @ViewChild(MessagesSentComponent, { static: true }) message: MessagesSentComponent;
  @ViewChild(CampaignListComponent,{static:true}) campList:CampaignListComponent;
  data: any = {};
  date:any
  ngOnInit() {

    this.SelectType({ campaign_type: 'conversion' });
    this.revenueOverview('Active');
    this.targatedCmapigns({ campaign_type: 'conversion' })

  }
  targatedCmapigns(data)
  {
    this.campService.getTargatedCamapignCount(data).subscribe((data:any)=>{

      this.targated_camapigns=data.data[0];
      this.precent_targated = Math.round(parseInt(data.data[0].num_of_players)/parseInt(this.total_palyer_count)*100)
    })
  }
  revenueOverview(param) {

    let Obj = {campaign_type:this.campaignType,campaign_status:param}
    let Cost:any = [];
    let Roi:any = [];
    this.campService.getRevenueData(Obj).subscribe(d=>{
      let Data:any = d;
      Data.data.forEach(value=>{
        Cost.push(value.cost);
        Roi.push(value.roi);
      })
      let ChartValues = {data:Cost,data1:Roi}
      this.revenue.chartData(ChartValues);
    })

  }
  ShowCampaignList: Boolean = false;
  campaignDetails(type) {
    this.as.CampaignTableType = type;
    this.ShowCampaignList = true;
  }

  Summary() {
    this.ShowCampaignList = false;
  }
  campaignType:any;
  emailSent:any=[];
  messageSent:any;
  CampaignStatus=[];
  CampaignStatusmongo= [];
  active:any=0;
  inactive:any=0;
  completed:any=0;
  inprogress:any=0;
  SelectType(value) {
    this.active=0;
    this.inactive=0;
    this.completed=0;
    this.inprogress=0;
    this.inactivelength=[];
    this.CampaignStatus=[];
    this.scheduledata=[];
    this.CampaignStatusmongo=[];
this.draftlength=[];
this.completedlength=[];
this.inprogresslength=[];
this.activelength=[];
    this.as.CampaignType = value.campaign_type;
    this.campaignType = value.campaign_type;
    this.campService.getCampaignCount(value).subscribe((d:any) => {
      this.CampaignStatus=d.data;
   
      this.ss.getAllSchedules().subscribe((data:any)=>{
        let l=data.data.length;
        for(let i=0;i < l; i++) {
          this.scheduledata.push(data.data[i]);
          
        };
        

        if(this.scheduledata.length>0)
        {
       
  this.scheduledata.filter(element=>{
   if(element.campaignDetails.type==value.campaign_type)
   {
    this.CampaignStatusmongo.push(element);
   }
          
 });
 
 console.log(this.CampaignStatusmongo.length+"this.CampaignStatusmongothis.CampaignStatusmongothis.CampaignStatusmongo")
     this.CampaignStatusmongo.filter(element=>{
       console.log(element.campaignDetails.status+"element.campaignDetails.status")
      if( element.campaignDetails.status=="active" )
      {
        this.activelength .push(element);
        console.log(this.activelength.length+"this.activelength")
      };
    });
console.log( this.activelength+" this.activelength this.activelength this.activelength this.activelength this.activelength"+ this.activelength.length)
       this.CampaignStatusmongo.filter(element=>
        
        {
          if(element.campaignDetails.status=="completed" )
        
        {
          this.completedlength.push(element);
        }
      });
       this.CampaignStatusmongo.filter(element=>
        {if(element.campaignDetails.status=="draft")
        {
          this.draftlength.push(element);
        } });
           this.CampaignStatusmongo.filter(element=>{
             if(element.campaignDetails.status=="in progress"){
              this.inprogresslength.push(element);
             }
             } );
       this.CampaignStatusmongo.filter(element=>{
         if(element.campaignDetails.status=="in active" ){
          this.inactivelength.push(element);
         }
         });
 

} 
console.log(this.inactivelength.length+"........................")
console.log(this.completedlength.length);
console.log(this.inprogresslength.length)
        console.log(this.activelength.length+"........................")
      this.CampaignStatus.forEach((element:any) => {
        if(element.status=='draft'){
          this.active=this.active+parseInt(element.count)+this.draftlength.length;
        }else if(element.status=='active'){
          this.active=this.active+ parseInt(element.count)+this.activelength.length;
        }else if(element.status=='completed'){
          this.completed=this.completed+parseInt(element.count)+this.completedlength.length;
        }else if(element.status=='in progress'){
          this.inprogress=this.inprogress+parseInt(element.count)+this.inprogresslength.length;
        }else if(element.status=='in active'){
          this.inactive=this.inactive+parseInt(element.count)+this.inactivelength.length;
        }
      });
    });
  });
// =======Phani
//       let tmp={}
//     this.campService.getAllCampaigns().subscribe((data:any)=>{
      
//       for(const camp of data)
//       {
//         if(!tmp[camp.status]){
//           tmp[camp.status]=1;
//         }
//         else{
//           tmp[camp.status]=tmp[camp.status]+1
//         }
//       }
//       this.active = tmp['active'] | 0;
//       this.inactive =  tmp['in active'] | 0;
//       this.completed = tmp['completed'] | 0;
//       this.inprogress = tmp['inprogress'] |0;
//       // debugger;
//     })
// >>>>>>> 7e522d152b8304e12755077158a74fc41393411d
      // this.active=parseInt(this.CampaignStatus[0].count)+parseInt(this.CampaignStatus[1].count);
    
   
    this.campService.getMessageSent({campaign_type:this.campaignType}).subscribe(d=>{
      let Data:any = d;
      this.messageSent = Data.data;
      if(this.messageSent)
      this.message.renderChart(this.messageSent)
    })

    this.campService.emailCampaignStatus({campaign_type:this.campaignType}).subscribe(d=>{
      let Data:any = d;
      this.emailSent = Data.data;

      console.log("=============email===status=====",Data.data);
      this.emailSuccess=100 -this.emailSent[0].success;
      this.emailFailed=this.emailSent[0].success;
  
    })
    this.targatedCmapigns({campaign_type:this.campaignType})
//    debugger;
    this.campService.roiTrigger().next(this.campaignType)
  }
}
