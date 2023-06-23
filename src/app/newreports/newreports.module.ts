import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";

import { GridsterModule } from 'angular-gridster2';

import { NgxEchartsModule } from 'ngx-echarts';
import { CKEditorModule } from 'ngx-ckeditor';
import { NewreportsComponent } from './newreports.component';
import { newreportsRoutingModule } from './newreports-routing';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
// import { ChartOptionsComponent } from './chart-config/chart-options/chart-options.component';


@NgModule({
  declarations: [NewreportsComponent],
  // ChartOptionsComponent
  imports: [
    CommonModule,
    SharedModule,
    newreportsRoutingModule,
    GridsterModule,
    NgxEchartsModule,
    CKEditorModule,
    MatTabsModule,
    ChartsModule,
    HttpClientModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports:[NewreportsComponent],
  entryComponents: [],
  providers: [ThemeService]
})
export class newreportsModule { }
