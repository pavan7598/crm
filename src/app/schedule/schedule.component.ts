import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule-main',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleMainComponent implements OnInit {
  show_list=true;
schedule_data:any;
refresh = true;
  constructor(private ss:ScheduleService) {
    this.ss.getAllSchedules().subscribe(data=>{
      this.schedule_data = data;
    });
   }
   hideScheduleList()
   {
     
    this.show_list=false;
   }
   hideschedule(){
     
    this.show_list=true;
   }
   refreshDiv()
   {
     this.refresh = false;
     setTimeout(d=>{
       this.refresh=true;
     })
   }
   ngOnInit(){}
}
