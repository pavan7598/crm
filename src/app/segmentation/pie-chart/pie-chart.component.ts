import { Component, OnInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
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
      console.log('---data in d', d)

      let Obj = { value: this.data[this.label][d].length, name: d };
      console.log('---pie value--', this.data[this.label][d].length)
      DataArray.push(Obj)
    })

    console.log('pie chart new Data====>', DataArray)
    this.option = {
      title: {
        text: this.label,
        subtext: this.label,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      label: {
        color: '#000',
        formatter: "{c} ({d}%)",
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: legends,
      },

      calculable: true,
      series: [
        {
          name: this.label,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: DataArray
        }
      ]
    };
  }


}
