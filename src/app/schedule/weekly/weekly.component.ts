import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {
  week: any = {};
  @Input() schedule: FormGroup;
  @Output() weeklyEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() add_step=new EventEmitter<any>();
  weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  weekly: any = {}
  minDate = new Date();
  constructor() {
    for (let j of this.weekdays) {
      this.week[j] = false;
    }
  }

  ngOnInit() {
    this.schedule.addControl('every', new FormControl(1, Validators.required));
    this.schedule.addControl('from_date', new FormControl('', Validators.required));
    this.schedule.addControl('to_date', new FormControl('', Validators.required));
    this.schedule.addControl('week', new FormGroup({
      mon: new FormControl(''),
      tue: new FormControl(''),
      wed: new FormControl(''),
      thu: new FormControl(''),
      fri: new FormControl(''),
      sat: new FormControl(''),
      sun: new FormControl('')
    }))
  }



  value:any;
  weeklySelected() {
    //debugger
    if(this.value == undefined || this.value !='weekly' ){
      this.value = 'weekly'
    this.weeklyEmit.emit({value:this.value,flag:true})
    }else{
      this.value = undefined
      this.weeklyEmit.emit({value:this.value,flag:false})
    }
  }
  addStep($event:MouseEvent)
  {
    $event.stopPropagation();
this.add_step.emit()
  }
}
