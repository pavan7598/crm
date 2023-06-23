import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewcampaignComponent } from './viewcampaign.component';
import { GridsterModule } from 'angular-gridster2';
import { NgxEchartsModule } from 'ngx-echarts';
import { CKEditorModule } from 'ngx-ckeditor';
import { MatTabsModule } from '@angular/material';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
export const routes = [
  {path:'',component:ViewcampaignComponent,pathMatch:'full'},
]

@NgModule({
  declarations: [ViewcampaignComponent],
  imports: [
    CommonModule,
    SharedModule,
    GridsterModule,
    NgxEchartsModule,
    CKEditorModule,
    MatTabsModule,
    ChartsModule,
    HttpClientModule,
   
    RouterModule.forChild(routes)
   
  ],
  providers: [ThemeService]

})
export class ViewCampaignModule { }
