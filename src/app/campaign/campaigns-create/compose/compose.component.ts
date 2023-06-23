import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{CampaignObject} from './../../../Interfaces/interfaces';
import {compose} from './../../../Interfaces/interfaces';
@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Input() campaignObj:FormGroup;
  // compose:compose;
  // Compose: FormGroup = new FormGroup({
  //   campaign_type: new FormControl('Conversion',[Validators.required]),
  //   campaign_name: new FormControl('',[Validators.required]),
  //   campaign_Desc: new FormControl('',[Validators.required]),

  // })
  


  campaignTypes = [
    { id: 'conversion', name: 'Conversion' },
    { id: 'reactivation', name: 'Reactivation' },
    { id: 'churn', name: 'Churn prediction' },
    { id: 'yield', name: 'Customer yield' }
  ];
  constructor() { }

  ngOnInit() {
    this.campaignObj.addControl('campaign_type',new FormControl('conversion',[Validators.required]));
    this.campaignObj.addControl('campaign_name',new FormControl('',[Validators.required]));
    this.campaignObj.addControl('campaign_Desc',new FormControl('',[Validators.required]));
  }
  submit(){
  }

}
