import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { dashbordService } from "./dashbord.services";
import { dashbordRoutingModule } from "./dashbord-routing";
import { DashbordComponent } from "./dashbord/dashbord.component";
import { DashbordListComponent } from "./dashbord-list/dashbord-list.component";
import { GridsterModule } from 'angular-gridster2';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { ChartConfigComponent } from './chart-config/chart-config.component';
import { DragElemtsComponent } from './chart-config/drag-elemts/drag-elemts.component';
import { DropElementsComponent } from './chart-config/drop-elements/drop-elements.component';
import { SelectChartComponent } from './chart-config/select-chart/select-chart.component';
import { ElementListComponent } from './chart-config/element-list/element-list.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CKEditorModule } from 'ngx-ckeditor';
import { CkeditorConfigComponent } from './chart-config/ckeditor-config/ckeditor-config.component';
import { ViewchartComponent } from './viewchart/viewchart.component';
// import { ChartOptionsComponent } from './chart-config/chart-options/chart-options.component';


@NgModule({
  declarations: [DashbordComponent,
    DashbordListComponent,
     QueryBuilderComponent, 
     ChartConfigComponent, 
     DragElemtsComponent,
     ViewchartComponent,
      DropElementsComponent, SelectChartComponent, ElementListComponent, CkeditorConfigComponent],
  // ChartOptionsComponent
  imports: [
    CommonModule,
    SharedModule,
    dashbordRoutingModule,
    GridsterModule,
    NgxEchartsModule,
    CkeditorConfigComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports:[DashbordComponent],
  entryComponents: [QueryBuilderComponent,ChartConfigComponent,CkeditorConfigComponent,ViewchartComponent],
  providers: [dashbordService]
})
export class dashbordModule { }
