import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent implements OnInit {
    chartdata:any;
    targetgroup:any;
    controlgroup:any;
    data2=[];
    data1=[];

    @Input() pData: any = {}

  constructor( @Inject(MAT_DIALOG_DATA) data: any) {
      debugger;
    this.chartdata=data.data;
    console.log('--------------pie',data);
    this.controlgroup=this.chartdata.campaignDetails.controlgroup.value;
this.targetgroup= this.chartdata.campaignDetails.targetgroup.value;
for(let i=0;i<this.controlgroup;i++)
{
    this.data2.push(i);
}
for(let i=0;i<this.targetgroup;i++)
{
    this.data1.push(i);
}
}
  ngOnInit() {


  }

  option = {
    title : {
        text: '',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['A','B','C']
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data:this.pData.data1
            // data : ['10','20','30','40','50','60','70','80','90',100]
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'A',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:this.data1,
        },
        {
            name:'B',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:this.data2,
        },
        // {
        //     name:'C',
        //     type:'line',
        //     smooth:true,
        //     itemStyle: {normal: {areaStyle: {type: 'default'}}},
        //     data:[1320, 1132, 601, 234, 120, 90, 20]
        // }
    ]
};
                    
}
