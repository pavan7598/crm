import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChartConfigComponent } from 'src/app/custome-dashbord/chart-config/chart-config.component';

import { dashbordService } from "../../custome-dashbord/dashbord.services";

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss']
})
export class ChartPanelComponent implements OnInit {
  @Input() option: any;
  optionArray: any = [];
  conf: any;
  opt: any;
  @ViewChild('chart', { static: true }) chart: ElementRef;
  chartconfig: ChartConfigComponent;
  x: any;
  wiglistArray: any = [];
  returnElements: any = [];
  dataset: any;
  widget: any;
  constructor(private toastr: ToastrService,
    public dashbordService: dashbordService, ) {
    // this.chartconfig=new ChartConfigComponent(this.toastr,this.dashbordService,null,this.option);

  }
  ngOnInit() {

    window.sessionStorage.setItem('x1', JSON.stringify(this.option));
    this.x = this.option;
    this.widget = this.x.wigetList;
    this.conf = this.widget.chartConfig;
    this.chartconfig = new ChartConfigComponent(this.toastr, this.dashbordService, null, null);
    this.option = this.chartconfig.dragconfig(this.conf);
  
  }
  Show: Boolean;
  fullscreen(ev: any) {
    console.log(ev);
    this.Show = true;
    this.chart.nativeElement.requestFullscreen()
  }

  exit(ev: any) {
    document.exitFullscreen();
    this.Show = false

  }

}
