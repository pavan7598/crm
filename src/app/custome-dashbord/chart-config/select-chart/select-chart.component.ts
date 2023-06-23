import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as myGlobals from '../staticVariables';
@Component({
  selector: 'app-select-chart',
  templateUrl: './select-chart.component.html',
  styleUrls: ['./select-chart.component.scss']
})
export class SelectChartComponent implements OnInit {
  ChartList: any;
  key:any;
  @Output() chartType = new EventEmitter<string>();
  // @Input() conflist: any;
  // @Input() prevdata: any;
  gdroplist:any={};
  obj: any;
  constructor() { }

  ngOnInit() {
    this.ChartList = myGlobals.chartslist;
    //this.gdroplist=
    // console.log(this.ChartList)
  }
  chart(chartType: any) { 
    this.key = chartType;
    // this.obj={}   
    // console.log("------- myGlobals.chartslist-------", myGlobals.droplist[chartType])
      this.obj = {
        list: JSON.parse(JSON.stringify(myGlobals.droplist[chartType])),
        type: chartType
      }   
      console.log("-123----this.obj-----123---",this.obj) ;
    this.chartType.emit(this.obj)
     
  }

}
      // if (this.prevdata == undefined) {
      //   //new
      //   // debugger;
      //   let obj: any = {
      //     list: myGlobals.droplist[chartType],
      //     type: chartType
      //   };
      //   this.chartType.emit(obj)
      //   let value: any = {};
      //   value.obj = obj;
      //   value.empty = true;
      //   this.chartType.emit(value);
      //   // debugger;
      // } else {
      //   let obj: any = {
      //     list: myGlobals.droplist[chartType],
      //     type: chartType
      //   };
      //   let oldkeys = Object.keys(this.prevdata.list);
      //   let newkeys = Object.keys(obj.list);
  
      //   // console.log('====>new chart==>', obj, oldkeys, newkeys);
      //   if (JSON.stringify(oldkeys) == JSON.stringify(newkeys)) {
      //     //equal
      //     // debugger;
      //     oldkeys.map(d => {
      //       let innerKeys = Object.keys(obj.list[d]);
      //       // console.log('=====>object',innerKeys , obj.list[d]);
      //       innerKeys.map(e => {
      //         if (e == 'only') {
      //           // obj.list[d][e] = true;
      //         } else {
      //           // console.log('===>prev==>',this.prevdata.list[d][e])
      //           obj.list[d][e] = this.prevdata.list[d][e];
      //         }
      //       })
  
      //     })
      //     // console.log('====>oblect in equal', obj);
      //     let value: any = {};
      //     value.obj = obj;
      //     value.empty = false;
      //     this.chartType.emit(value);
  
      //   } else {
          // this.chartType.emit(obj)
  
      //   }
      // }
   
