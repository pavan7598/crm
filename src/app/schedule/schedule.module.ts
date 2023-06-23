import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OnceComponent } from './once/once.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { DailyComponent } from './daily/daily.component';
import { MonthlyComponent } from './monthly/monthly.component';
import {StepsComponent} from './steps/steps.component';
import { ScheduleMainComponent } from './schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';



export const routes = [
  {path:'',component:ScheduleMainComponent ,pathMatch:'full'},
]

 
@NgModule({
  declarations: [ScheduleComponent,
    ScheduleMainComponent,
    OnceComponent,
  WeeklyComponent,DailyComponent,MonthlyComponent,StepsComponent, ScheduleListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
