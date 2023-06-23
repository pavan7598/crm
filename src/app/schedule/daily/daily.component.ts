import { Component, OnInit,Input,Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  @Input() schedule:FormGroup;
  @Output() dailyEmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() add_step=new EventEmitter<any>();

  dailyForm:FormGroup = new FormGroup({
    every:new FormControl(1,Validators.required),
    from_date:new FormControl('',Validators.required),
    to_date:new FormControl('',Validators.required)
  })
  minDate = new Date();
  constructor() { }

  ngOnInit() {
    this.schedule.addControl('every',new FormControl('',Validators.required));
    this.schedule.addControl('from_date',new FormControl('',Validators.required));
    this.schedule.addControl('to_date',new FormControl('',Validators.required));
  }
  value:any;
  dailySelected(){
    if(this.value == undefined || this.value !='daily' ){
      this.value = 'daily'
    this.dailyEmit.emit({value:this.value,flag:true});

    }else{
      this.value = undefined
      this.dailyEmit.emit({value:this.value,flag:false});
    }
  }
  addStep($event:MouseEvent)
  {
$event.stopPropagation();
this.add_step.emit()
  }

}
