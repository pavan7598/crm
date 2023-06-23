import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
// import { SwiperModule } from 'swiper/angular';
import { StartcampaignComponent } from './startcampaign.component';

export const routes = [
  {path:'',component:StartcampaignComponent ,pathMatch:'full'},
]

@NgModule({
  declarations: [StartcampaignComponent],
  imports: [
    CommonModule,
    SharedModule,
    // SwiperModule,
    RouterModule.forChild(routes)
  ]
})
export class StartCampaignModule { }
