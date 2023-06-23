import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-segment-chart',
  templateUrl: './segment-chart.component.html',
  styleUrls: ['./segment-chart.component.scss']
})
export class SegmentChartComponent implements OnInit {

  // @Input() data;

  options:any = {
   
  };

  ngOnInit() {
     
    let other_value = this.data.segment_value.map(d => 100 - d);
    //this.options.xAxis.data = this.data.xaxis;
    // console.log("data======>",this.data);
  
    this.options = {
      title: {
        text: 'Total Number of Customers '+this.data.totalCustomer,
        x: 'center'
    },
      tooltip: {
        trigger: 'axis',
        textStyle : {fontFamily: 'Lato-Regular',fontSize: 12},
        formatter:' Slab Name:{b} <br/>{a}: {c0}% <br/> {a1}: {c1}%',
        axisPointer: { 
            type: 'shadow' 
        }
    },
      grid: {
        top: '8%',
        left: '1%',
        right: '1%',
        bottom: '10%',
        containLabel: true
    },
      xAxis: [{
        // axisLine: { show: false},
        name: 'Segment Name',
        nameLocation: 'middle',
        nameTextStyle: {
            padding: [20, 0, 0, 0],
            color: '#282A33',
            fontFamily: 'Lato-Bold',
            fontSize: 14
        },
        splitLine: false,
        axisTick:  { show: false },
       // axisLabel:{textStyle:{color:'#6B7080',fontSize:14,fontFamily: 'Lato-Regular'},rotate: 45 },
        data: this.data.xaxis
    }],
    yAxis: [{
        axisLine: false,
        name: 'Total Percent of Customers',
        nameTextStyle: {
            color: '#282A33',
            fontSize: 14,
            fontFamily: 'Lato-Bold'
        },
        nameLocation: 'middle',
        splitLine: false

    }],
      series: [{data: this.data.segment_value, itemStyle: { normal: { color: "#282A33" } }, name: "Segment", type: "bar"}, { data: other_value, itemStyle: { normal: { color: "#159EDA" } }, name: "Others", type: "bar"}]
    };
  }




  constructor(
    public dialogRef: MatDialogRef<SegmentChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



}

