import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Label, SingleDataSet } from 'ng2-charts';
import { Data } from '../data';

@Component({
  selector: 'app-newreports',
  templateUrl: './newreports.component.html',
  styleUrls: ['./newreports.component.scss']
})
export class NewreportsComponent implements OnInit {
  data: Data[];
  url = 'http://localhost:4000/results';
  year = [];
  count = [];

  public lineChartData: Array<any> = [
    {data: this.count, label: 'Python Language'},
  ];
  public lineChartLabels: Array<any> = this.year;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';
  title = "Charts";
  charts: any;
  LessthanOrGreaterthan: any="lessthan";

  chartData: any={
    student1:[80, 71, 85, 75, 68, 82],
    student2: [77, 78, 85, 65, 81, 90],
  };
  chart1: any;
  LessthanOrGreaterthan1: any = "lessthan";
  chartData1: any = {
    student1: [80, 71, 85, 75, 68, 82],
    student2: [77, 30, 85, 65, 81, 95],
    student3: [77, 45, 89, 69, 72, 88],
  };

  // pie chart
  public pieChartLabels:string[] = ['Chrome', 'Safari', 'Firefox','Internet Explorer','Other'];
  public pieChartData:number[] = [40, 20, 20 , 10,10];
  public pieChartType:string = 'pie';
 
  //doughnut chart
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];

  //radar charts
  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
//line chart

daySelected: string;

public lineChartData1:Array<any> = [{
  data: [40, 80, 60, 50, 40, 30, 20], 
  label: 'Series A',
  lineTension: 0,
  pointRadius: [4, 4, 4, 4],
  borderWidth: 2,
  pointHoverBorderWidth: 8,
  
}];

public lineChartLabels1:Array<any> = [
  '20180430', 
  '20180501',
  '20180502',
  '20180503',
  '20180504',
  '20180505',
  '20180506'
];

public lineChartOptions1:any = {
  responsive: true,
  layout: {
    padding: {
        top: 10
    }
  },
  tooltips: {
    enabled: true
  },
  elements: {
    rectangle: {
        borderWidth: 0,
    }
  },
  scales: {
    xAxes: [{
      gridLines: {
          display: true,
          drawBorder: false,
          borderDash: [5, 2],
          zeroLineBorderDash: [5, 2],
          zeroLineColor: '#c5c0bc',
          color: '#c5c0bc'
      },
      ticks: {
        fontStyle: 'normal',
        callback: function(value, index, values) {
          const dayLetter = moment(value).format('dddd').charAt(0);
          const dayFormatted = moment(value).format('DD/MMM').toLowerCase();

          return [dayLetter, dayFormatted];
        }
      }
    }],
    yAxes: [{
      display: false,
      gridLines: {
          display: false,
          drawBorder: false,
          lineWidth: 0,
      },
      ticks: {          
        min: 0,
        max: 100
      }
    }]
  }
};

public lineChartColors1:Array<any> = [
  { 
    backgroundColor: 'transparent',
    borderColor: '#ec7404',
    pointBackgroundColor: ['#fff', '#fff', '#fff', '#fff'],
    pointBorderColor: '#ec7404',
    pointHoverBackgroundColor: '#ec7404',
    pointHoverBorderColor: '#ec7404'
  }
];

public lineChartLegend1:boolean = false;
public lineChartType1:string = 'line';


//bar chart2
public barChartOptions1: ChartOptions= {
  responsive: true
};
public barChartType1: ChartType = 'horizontalBar';
public barChartLegend1 = true;

public barChartData1: ChartDataSets[] = [
  { data: [1, 2, 3], label: 'Approved', stack: 'a' },
  { data: [1, 2, 3], label: 'Accepted', stack: 'a' },
  { data: [1, 2, 3], label: 'Open', stack: 'a' },
  { data: [1, 2, 3], label: 'In Progress', stack: 'a' },
];
public barChartLabels1: string[] = ['P', 'R', 'B'];


//scatter chart
public scatterChartOptions: ChartOptions = {
  responsive: true,
};

public scatterChartData: ChartDataSets[] = [
  {
    data: [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
    {x:3,y:2},
    {x:1.5,y:-2},
      { x: 3, y: -2 },
      { x: 3.5, y: 0 },
      { x: 2.5, y: -1 },
      { x: 4, y: 4 },
      { x: 4.5, y: 2 },
      { x: 5, y: -3, r: 20 },
    ],
    label: 'Series A',
    pointRadius: 10,
  },
];
public scatterChartType: ChartType = 'scatter';

//pie
  // Pie
  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels1: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData1: SingleDataSet = [300, 500, 100];
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;




  constructor(private elementRef: ElementRef,private httpClient: HttpClient) { }

  ngOnInit() {
    //server
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      this.data = res.filter(r => {
        return r.name === 'Python';
      });
      this.data.forEach(y => {
        this.year.push(y.year);
        this.count.push(y.count);
      });
    });
  
  

















    let htmlRef=this.elementRef.nativeElement.querySelector(`#canvas`);
    let htmlRef1=this.elementRef.nativeElement.querySelector(`#canvas1`);
    this.charts = new Chart(htmlRef, {
      type: "line",
      data: {
        labels: ["Telugu", "Hindi", "English", "Maths", "Social", "Science"],
        datasets: [
          {
            type: "line",
            label: "Student 1",
            data: this.chartData.student1,
            backgroundColor: "rgba(455,0,255,0.4)",
          },
          {
            type: "line",
            label: "Student 2",
            data: this.chartData.student2,
            backgroundColor: "rgb(60, 179, 113)",
            borderColor: "rgb(60, 179, 113)",
            
          }
        ],
      },
    });
    this.chart1 = new Chart(htmlRef1, {
      type: "bar",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Exam Marks of three students",
        },
      },
      data: {
        labels: ["English", "Hindi", "Telugu", "Maths", "Social", "Science"],
        datasets: [
          {
            type: "bar",
            label: "Student 1",
            data: this.chartData1.student1,
            backgroundColor: "rgba(255,0,255,0.4)",
          },
          {
            type: "line",
            label: "Student 2",
            data: this.chartData1.student2,
            borderColor: "rgb(60, 179, 113)",
            fill: "false",
          },
          {
            type: "bar",
            label: "Student 3",
            data: this.chartData1.student3,
            backgroundColor: "rgba(255,255,0,0.4)",
          },
        ],
      },
    });
  }


  applyFilter(value) {
    this.charts.data.datasets[0].data=this.chartData.student1;
    this.charts.data.datasets[1].data=this.chartData.student2;

    this.charts.data.datasets.forEach((data, i) => {
      console.log(this.LessthanOrGreaterthan)
      if (this.LessthanOrGreaterthan === 'greaterthan') {
        this.charts.data.datasets[i].data = data.data.map(v => {
          if (v >= value) return v;
          else return 0;
        });
        console.log(">>>>>>>>", this.charts.data.datasets[i].data);
      } else {
        this.charts.data.datasets[i].data = data.data.map(v => {
          if (v <= value) return v;
          else return 0;
        });
        console.log("????????", this.charts.data.datasets[i].data);
      }
    });
    this.charts.update();
  }


  applyFilter1(value) {
    this.chart1.data.datasets[0].data = this.chartData1.student1;
    this.chart1.data.datasets[1].data = this.chartData1.student2;
    this.chart1.data.datasets[2].data = this.chartData1.student3;

    this.chart1.data.datasets.forEach((data, i) => {
      console.log(this.LessthanOrGreaterthan1);
      if (this.LessthanOrGreaterthan1 === "greaterthan") {
        this.chart1.data.datasets[i].data = data.data.map((v) => {
          if (v >= value) return v;
          else return 0;
        });
        console.log(">>>>>>>>", this.chart1.data.datasets[i].data);
      } else {
        this.chart1.data.datasets[i].data = data.data.map((v) => {
          if (v <= value) return v;
          else return 0;
        });
        console.log("????????", this.chart1.data.datasets[i].data);
      }
    });
    this.chart1.update();
  }

}

