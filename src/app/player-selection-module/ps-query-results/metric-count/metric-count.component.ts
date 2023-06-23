import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-metric-count',
  templateUrl: './metric-count.component.html',
  styleUrls: ['./metric-count.component.scss']
})
export class MetricCountComponent implements OnInit {
  @Input() metricObject:any;
  metricList =  [];
  constructor() { }

  ngOnInit() {
    // debugger;
console.log("-------metric object-------",this.metricObject)
    this.metricList = this.metricObject.map((d) =>  {
      return Object.keys(d);
    });
  }

}
