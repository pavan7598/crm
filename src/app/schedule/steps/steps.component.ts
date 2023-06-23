import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {FormGroup,Validators,FormControl} from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @Input() schedule:any;
  @Input() stepsInput:FormGroup;
  @Input() index:any;
  @Output() stepsSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeStep = new EventEmitter<any>();
  once:Boolean = true
  steps:any = [{}];
  
  StepsForm:FormGroup;
  selectedOption = 'every'
  option_display_values=['Define Duration after','Define a specific Date and Time']
  options =['every','ondate']
  womdata = [{ value: '1', name: 'First' }, { value: '2', name: 'Second' }, { value: '3', name: 'Third' }, { value: '4', name: 'Fourth' }, { value: '4-5', name: 'Last' }];
  email_recipients= [];
  return_elements=[];
  filters={};
  constructor(public sharedService:SharedService) { }

  ngOnInit() {
    // this.StepsForm = new FormGroup({
    //   step_name:new FormControl('',Validators.required),
    //   preceeding_step:new FormControl('',Validators.required),
    //   select_date: new FormControl('',Validators.required),
    // })
    this.sharedService.getElements().subscribe((d:any)=>{
      
      this.return_elements  = d.data;
    })
    console.log('=====steps===>',this.schedule)

    this.stepsInput.addControl('step_name',new FormControl('',Validators.required));
    this.stepsInput.addControl('wait',new FormControl('',Validators.required));
    
  }
  cancel()
  {
this.removeStep.emit(this.index)
  }
  changeVale(value){
    if(value == 'ondate'){
      this.stepsInput.removeControl('wait');
      this.stepsInput.addControl('select_date',new FormControl('',Validators.required))
    }else{
      this.stepsInput.addControl('wait',new FormControl('',Validators.required))
      this.stepsInput.removeControl('select_date');
    }
  }
  ShowSubmit:Boolean = false;
  Submit(){
    
    this.stepsInput.addControl('filters',new FormControl(this.filters));

    console.log('==========>stepForm',this.stepsInput);
    if(this.stepsInput.invalid){
      console.log('====>invalid fields')
    }else{
      this.ShowSubmit = true;
      this.stepsSubmit.emit(this.ShowSubmit)
    }
  }
}
