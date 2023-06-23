import { Component, OnInit, Input } from '@angular/core';
import {Control} from './../../../../Interfaces/interfaces'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  @Input() campaignObj: FormControl
  @Input() sliders:any;
  ControlGroup: Control;
  constructor() {
  
  }
  
  ngOnInit() {
    this.campaignObj.setValue(this.sliders)
  }
  Max:any = 100;
  sliderTotal(obj,i){
    if(i==0){
      this.sliders[1].value=100-obj.value;
    }else{
      this.sliders[0].value=100-obj.value;
    }
    //console.log('-------->sliders',this.sliders);
  }

}
