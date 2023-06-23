import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() data: any;
  label: any;
  option: any;
  constructor() { }

  ngOnInit() {

    let keys = Object.keys(this.data)
    this.label = keys[0];
    console.log('data in pie chart==>', this.data[this.label])
    let DataArray = [];
    let legends = Object.keys(this.data[this.label]);
    legends.forEach(d => {
      let Obj = { name: d, type: 'bar', data: [this.data[this.label][d].length] };
      DataArray.push(Obj)
    })

    this.option = {
      title: {
        text: this.label,
        subtext: this.label
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: legends
      },
      calculable: true,
      xAxis: [
        {
          type: 'value',
          boundaryGap: [0, 0.01],
          data: legends
        }
      ],
      yAxis: [
        {
          type: 'category',
          data: legends
        }
      ],
      series: DataArray
    };
  }




}
