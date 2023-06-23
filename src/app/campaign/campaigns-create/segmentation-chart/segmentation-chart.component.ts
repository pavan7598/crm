import { Component, OnInit, Input } from '@angular/core';
import * as echarts from 'echarts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-segmentation-chart',
  templateUrl: './segmentation-chart.component.html',
  styleUrls: ['./segmentation-chart.component.scss']
})
export class SegmentationChartComponent implements OnInit {

  constructor(private appservice:AppService) {

this.totalcustomers=this.appservice.total_players;
   }
  options:any
  theme: string;
   totalcustomers;
  @Input() noCustomer

  ngOnInit() {


    this.options = {
      title: {
        text: 'Segment Detailed',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: ['Total Customers', 'Selected Customers']
      },
      calculable: true,
      series: [
        {
          name: 'area',
          type: 'pie',
          radius: [30, 110],
          roseType: 'area',
          data: [
            { value: this.noCustomer.total, name: 'Total Customers' },
            { value: this.noCustomer.selected, name: 'Selected Customers' }
          ]
        }
      ]
    };
  }

}
