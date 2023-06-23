import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
declare const $:  any;
@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit, AfterViewInit {
@Input() data;
@Input() type;
testDAtA = [
  { 'name': 'MCEC',
  'values': [
    {'from': new Date(),
    'to': new Date(),
    'label': 'MCEC',
  'customClass': 'ganttGreen'
}]}
  ];
  constructor(private el: ElementRef) {
  }


  ngOnInit() {
  }
  ngAfterViewInit() {
    this.data;
    //
    $(this.el.nativeElement)
    .gantt({source: this.data,
    navigate: 'scroll',
    scale: 'days',
    itemsPerPage: 15,
     months: [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'],
    dow: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
maxScale: 'years', minScale: 'days'});

  }
}
