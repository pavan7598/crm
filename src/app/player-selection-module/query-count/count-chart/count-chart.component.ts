import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { CountInfoComponent } from '../count-info/count-info.component';
@Component({
  selector: 'app-count-chart',
  templateUrl: './count-chart.component.html',
  styleUrls: ['./count-chart.component.scss']
})
export class CountChartComponent implements OnInit {
  @Input() countdata:any;

 
  constructor( private dialog:  MatDialog) {

   }
  openDialog() {
    this.dialog.open(CountInfoComponent, {
      // width:'80%',
      data: this.countdata
    });
}
options:any;
  ngOnInit() {
    this.options = {
      tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        }
    },
      xAxis: {
          type: 'category',
          data: []
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [],
          type: 'bar'
      }]
  };
    this.options.series[0].data = [];
    this.options.xAxis.data = [];
    for (let k of Object.keys(this.countdata))  {
      this.options.series[0].data.push(this.countdata[k].count);
      this.options.xAxis.data.push(`Condition ${k}`);
    }
  }

}
