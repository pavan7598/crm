import { Component, OnInit, Input } from '@angular/core';
import { Controlgroup } from './../../../Interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-group',
  templateUrl: './control-group.component.html',
  styleUrls: ['./control-group.component.scss']
})
export class ControlGroupComponent implements OnInit {
  @Input() campaignObj: FormGroup;
  @Input() segData: any;
  control_group: Controlgroup;
  Sliders: any = [
    { name: 'A1', title: 'Control group', value: 0,options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 } }, 
    { name: 'A2', title: 'Target group', value: 0,options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 } }
  ]
  constructor() {

  }

  ngOnInit() {
    //  this.campaignObj.control_group = this.control_group;
    this.campaignObj.addControl('channel', new FormControl({}, Validators.required));
    this.campaignObj.addControl('ControlValue', new FormControl({}, Validators.required));
  }



}
