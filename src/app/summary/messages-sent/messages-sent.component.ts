import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-messages-sent',
  templateUrl: './messages-sent.component.html',
  styleUrls: ['./messages-sent.component.scss']
})
export class MessagesSentComponent implements OnInit,AfterViewInit {

  constructor() { }
  
  options:any;

  @ViewChild("main", {static: true}) main: ElementRef ;
  dataStyle = {
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
  };
  placeHolderStyle = {
    normal : {
        color: 'rgba(0,0,0,0)',
        label: {show:false},
        labelLine: {show:false}
    },
    emphasis : {
        color: 'rgba(0,0,0,0)'
    }
  };

  ngAfterViewInit() {

  }

  ngOnInit() {
console.log(this.main.nativeElement.offsetWidth);


                  
                      
  }

  renderChart(messageData){
      console.log('======>message Data',messageData)
    this.options = {
        title: {
            text: 'Communication Info',
            subtext: '',
            x: 'top',
            y: 'top',
            itemGap: 20,
            textStyle : {
                color : 'rgba(30,144,255,0.8)',
                //fontFamily : '微软雅黑',
                fontSize : 20,
                fontWeight : 'bolder'
            }
        },
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 10,
            y : 400,
            itemGap:12,
            data:[messageData[0].email+'%EMAILS',messageData[0].sms+'% SMS',messageData[0].calls+'% CALLS',messageData[0].webhook+'% WEBHOOK']
        },
        series : [
            {
                name:'Emails',
                type:'pie',
                clockWise:false,
                radius : [125, 135],
                barWidth: '6%',
                itemStyle : this.dataStyle,
                data:[
                    {
                        value:messageData[0].email,
                        name:messageData[0].email+'%EMAILS',
                        itemStyle  : {color:'#2f51ae'}
                    },
                    {
                        value:100 - messageData[0].email,
                        // name:'invisible',
                        itemStyle : {color:'#f6fafc'}
                    }
                ]
            },
            {
                name:'SMS',
                type:'pie',
                clockWise:false,
                radius : [110, 120],
                itemStyle : this.dataStyle,
                data:[
                    {
                        value:29, 
                        name:messageData[0].sms+'% SMS',
                        itemStyle  : {color:'#1547e6'}
                    },
                    {
                        value:100 - messageData[0].sms,
                        // name:'invisible',
                        itemStyle  : {color:'#f6fafc'}
                    }
                ]
            },
            {
                name:'CALLS',
                type:'pie',
                clockWise:false,
                radius : [95, 105],
                itemStyle : this.dataStyle,
                data:[
                    {
                        value:messageData[0].calls, 
                        name:messageData[0].calls+'% CALLS',
                        itemStyle  : {color:'#3A98FC'}
      
                    },
                    {
                        value:100 - messageData[0].calls,
                        // name:'invisible',
                        itemStyle  : {color:'#f6fafc'}
                    }
                ]
            },
            {
                name:'WEBHOOK',
                type:'pie',
                clockWise:false,
                radius : [80, 90],
                itemStyle : this.dataStyle,
                data:[
                    {
                        value:messageData[0].webhook, 
                        name:messageData[0].webhook+'% WEBHOOK',
                        itemStyle  : {color:'#00C9E6'}
                    },
                    {
                        value:100 - messageData[0].webhook,
                        // name:'invisible',
                        itemStyle  : {color:'#f6fafc'}
                    }
                ]
            }
        ]
      };
  }

}
