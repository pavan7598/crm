import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { OnceComponent } from './../once/once.component';
import { DailyComponent } from './../daily/daily.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ScheduleService } from '../schedule.service';
import { ToastrService, ToastRef } from 'ngx-toastr';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],

})
export class ScheduleComponent implements OnInit {
  ScheduleObj: any = {};
  @Output() hide = new EventEmitter<any>()
  id: any;
  @ViewChild('OnceComponent', { static: true }) once: OnceComponent;
  @ViewChild('DailyComponent', { static: true }) daily: DailyComponent;

  options = new FormGroup({
    daily: new FormGroup({}),
    weekly: new FormGroup({}),
    monthly: new FormGroup({})
  })
  constructor(private ss: ScheduleService, private ts: ToastrService) { }
  schedule_name = new FormControl('', [
    Validators.required,
  ]);
  CampaignName = new FormControl([],[
    Validators.required,
  ]);
  reciepients = new FormControl([], [
    Validators.required,
  ]);
  formArray = new FormArray([]);
  selectedRecipients;
  recipients: any[] = [];
  cities: any
  ngOnInit() {
    this.ScheduleObj = {};

    this.ss.getCampaignList().subscribe((data: any) => {
      // console.log("data------------->",data);
      this.cities = data.filter(d => {
        
        return (d.status == 'draft') || (d.status == 'completed') || (d.status == 'canceled');
      }).map(d => {
        return { name: d.campaignName, id: d._id }
      })
    });
  }
  RunCampaign() {
    this.ss.runSchedule(this.id).subscribe(data => {
      this.ts.success("schedule is running")
      this.back();
    })
  }


  addTagFn(name) {
    return { name: name, tag: true };
  }
  SaveCampaign() {
    if (this.ScheduleType != undefined && this.CampaignName.valid && this.reciepients.valid) {
      this.ScheduleObj.scheduleName = this.schedule_name.value;
      this.ScheduleObj.occurrence = this.ScheduleType;
      this.ScheduleObj.scheduleOptions = this.options.value[this.ScheduleType];
      this.ScheduleObj.campaign = this.CampaignName.value;
      this.ScheduleObj.steps = this.formArray.value;
      this.ScheduleObj.mail_options = {};

      this.ScheduleObj.startDate = this.ScheduleType == 'once' ? new Date() : this.options.value[this.ScheduleType].from_date;
      this.ScheduleObj.endDate = this.ScheduleType == 'once' ? new Date() : this.options.value[this.ScheduleType].to_date;
      this.ScheduleObj.mail_options.recipients = this.selectedRecipients;
      console.log('======>save', this.ScheduleObj)
      this.ss.saveSchedule(this.ScheduleObj).subscribe((data: any) => {
        console.log('schedule saved', data);
        this.ts.success("Schedule Saved Successfully");
        this.id = data.data._id;
      }, (err) => {
        this.ts.error("Schedule Failed to Save")
      })
    }else{
      this.ts.error("fill fields and select campaign type")
    }
  }
  ScheduleType: any;
  SelectedType(ev: any) {
    this.id = undefined;
    console.log('---------->selected type', ev)
    this.ScheduleType = ev.value;
    this.AddStep = ev.flag;
  }

  AddStep: Boolean = false
  add_step() {
    this.formArray.push(new FormGroup({}));
    this.AddStep = !this.AddStep;
  }
  stepEmit(ev: any) {
    this.AddStep = ev;
  }
  removeStep(event) {
    this.formArray.controls.splice(event, 1);
  }
  back() {

    this.hide.emit();
  }



}
