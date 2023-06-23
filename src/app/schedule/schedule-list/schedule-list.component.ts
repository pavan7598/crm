import { Component, OnInit, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
  
})
export class ScheduleListComponent implements OnInit {
@Output() hide = new EventEmitter<any>();
@Output() refresh = new EventEmitter<any>();
dist_obj={};
dist_active={};
dist_progress={};
length =50;
pageEvent: PageEvent;
displayedColumns: string[] = ['CampaignName', 'staus', 'type', 'startDate','endDate','Action'];
dataset_array:Array<MatTableDataSource<any>>=[];
dataset_length_array=[];
missing_dataset_error=['No Active Campaigns','No Running Campaigns ','No Scheduled Campaigns',]
  dataSource= new MatTableDataSource<any>();
  dataSource1= new MatTableDataSource<any>();
  dataSource2= new MatTableDataSource<any>();
schedule_data:any;
hidden=false;
// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
// @ViewChild(MatPaginator, {static: true}) paginator1: MatPaginator;
// @ViewChild(MatPaginator, {static: true}) paginator2: MatPaginator;
@ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

list=['Active','Inprogress','All']
constructor(private ss:ScheduleService) {
 


 }
 
 getData(){
  this.ss.getAllSchedules().subscribe((data:any)=>{
    this.schedule_data = data.data.map(d=>{
  let return_data = {"CampaignName":d.campaignDetails.campaignName,
  "staus":d.campaignDetails.status,"type":d.campaignDetails.type,
  "startDate":d.startDate,"endDate":d.endDate,"Action":d._id,"campaignID":d.campaignDetails._id};
  if(d.scheduleOptions)
  {
   Object.assign(return_data,{"StartDate":d.scheduleOptions.start_date,"EndDate":d.scheduleOptions.end_date}) 
  }
  else{
    Object.assign(return_data,{"StartDate":null,"EndDate":null}) 
  }
return return_data
    }).filter(d=>{
      if(this.dist_obj[d['campaignID']])
      {
        return false
      }
      else
      {
        this.dist_obj[d['campaignID']]=d['campaignID'];
        return true;
      }
    })

    this.dataSource =  new MatTableDataSource<any>(this.schedule_data);

    this.dataSource.paginator = this.paginator.toArray()[0];
    // console.log(this.dataSource.paginator+"jjjjjjjjjjjjjj=======");
    // this.dataset_array[2]=this.dataSource
     this.dataset_length_array[0]=this.schedule_data.length;
    //  console.log("==============phani===========",data);
  });

  this.ss.getScheduleByStauts('active').subscribe((active_campaigns_list:any)=>{

    let schedule_data = active_campaigns_list.data.map(d=>{
  let return_data = {"CampaignName":d.campaignDetails.campaignName,"staus":d.campaignDetails.status,
  "type":d.campaignDetails.type,"startDate":d.startDate,"endDate":d.endDate,"Action":d._id,"campaignID":d.campaignDetails._id};
  if(d.scheduleOptions)
  {
   Object.assign(return_data,{"StartDate":d.scheduleOptions.start_date,"EndDate":d.scheduleOptions.end_date}) 
  }
  else{
    Object.assign(return_data,{"StartDate":null,"EndDate":null}) 
  }
return return_data
    }).filter(d=>{
      if(this.dist_active[d['campaignID']])
      {
        return false
      }
      else
      {
        this.dist_active[d['campaignID']]=d['campaignID'];
        return true;
      }
    })
    this.dataSource1 =  new MatTableDataSource<any>(schedule_data);

    this.dataSource1.paginator = this.paginator.toArray()[1];
    console.log(this.paginator+"uuuuuuuu"+this.dataSource1.paginator+"schedule_data"+schedule_data);

    // this.dataset_array[0]=this.dataSource1
     this.dataset_length_array[1]=schedule_data.length;

  })
  this.ss.getScheduleByStauts('in progress').subscribe((in_progress_campaigns_list:any)=>{
    let schedule_data = in_progress_campaigns_list.data.map(d=>{
      let return_data = {"CampaignName":d.campaignDetails.campaignName,"staus":d.campaignDetails.status,
      "type":d.campaignDetails.type,"startDate":d.startDate,"endDate":d.endDate,"Action":d._id,"campaignID":d.campaignDetails._id};
      if(d.scheduleOptions)
      {
       Object.assign(return_data,{"StartDate":d.scheduleOptions.start_date,"EndDate":d.scheduleOptions.end_date}) 
      }
      else{
        Object.assign(return_data,{"StartDate":null,"EndDate":null}) 
      }
    return return_data
        }).filter(d=>{
          if(this.dist_progress[d['campaignID']])
          {
            return false
          }
          else
          {
            this.dist_progress[d['campaignID']]=d['campaignID'];
            return true;
          }
        });
        this.dataSource2 =  new MatTableDataSource<any>(schedule_data);
    
        this.dataSource2.paginator = this.paginator.toArray()[2];;
        console.log(this.paginator+"uuuuuuuu"+this.dataSource2.paginator+"kkk"+schedule_data);
        this.dataset_array[2]=this.dataSource2
         this.dataset_length_array[2]=schedule_data.length;
  })
 }
 ngOnInit() {
this.getData();
// console.log("paginator",this.getData())
 }
 run(segment_id)
 {
this.ss.runSchedule(segment_id).subscribe(data=>{
  this.getData();
  this.refresh.emit();
})
 }
 changeStatus(segment_id,status)
 {
this.ss.changeScheduleStatus(segment_id,status).subscribe(d=>{
  this.getData();
  this.refresh.emit();
});   
 }

  createNewSchedule()
  {
    this.hide.emit();
  }

}
