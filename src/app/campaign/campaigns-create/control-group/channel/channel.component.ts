import { Component, OnInit, Input } from '@angular/core';
import { Channel } from './../../../../Interfaces/interfaces';
import { Options } from 'ng5-slider';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  @Input() campaignObj: FormControl;
  channel: Object;
  controlGroup: any = [
    { type: 'Email', value:false, percentage:0 ,options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 }},
    { type: 'SMS', value:false, percentage:0, options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 }},
    { type: 'CALL', value:false, percentage:0, options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 }},
    { type: 'MEDIA', value:false, percentage:0, options:{ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 }}]
  constructor() {
    this.channel = {}
  }
  value: number = 100;
 
  ngOnInit() {
  }

  recaluculateLimits(SlabArray) {
    //debugger;
    if (SlabArray && SlabArray.length > 0) {
      let maxlen = 0;
      for (let i = 0; i < SlabArray.length; i++) {
        maxlen = maxlen + (SlabArray[i].percentage);
      }
      maxlen = 100 - maxlen;
      //if(maxlen>0){
      for (let i = 0; i < SlabArray.length; i++) {
        SlabArray[i].options.maxLimit = SlabArray[i].percentage + maxlen;
      }

    }
    return SlabArray;
  }


  TotalPercentage = 100;
  selected(channel, index) {
      console.log('----------->channel',channel)
    this.controlGroup.forEach(element => {
      if(!element.value){
        element.percentage=0;
        element.options={ floor: 0, ceil: 100, step: 1, minLimit: 0, maxLimit: 100 }
      }
    });

    console.log('======>controlgroup',this.controlGroup)
  }
  sliderChange(value) {
    //console.log('--------->options====>', value);
    //this.TotalPercentage = this.TotalPercentage - value.percentage;
    let tmp = this.recaluculateLimits(this.controlGroup);
    this.controlGroup = [];


    for (let i = 0; i < tmp.length; i++) {
      this.controlGroup.push({
        type: tmp[i].type,
        options: tmp[i].options,
        percentage: tmp[i].percentage,
        value: tmp[i].value
      })
    }
    this.campaignObj.setValue(this.controlGroup);
  }

}
