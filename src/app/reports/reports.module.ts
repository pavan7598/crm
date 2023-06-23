import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import {SharedModule} from './../shared/shared.module';
import { ChartPanelComponent } from './chart-panel/chart-panel.component';
export const routes = [
  {path:'',component:ReportsComponent ,pathMatch:'full'},
]
@NgModule({
  declarations: [ReportsComponent, ChartPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
