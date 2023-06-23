import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CampaignsCreateComponent } from './campaigns-create/campaigns-create.component';
import { ComposeComponent } from './campaigns-create/compose/compose.component';
import { TargetUsersComponent } from './campaigns-create/target-users/target-users.component';
import { ControlGroupComponent } from './campaigns-create/control-group/control-group.component';
import { SegmentationComponent } from './campaigns-create/segmentation/segmentation.component';
import { SegmentationChartComponent } from './campaigns-create/segmentation-chart/segmentation-chart.component';
import { ChannelComponent } from './campaigns-create/control-group/channel/channel.component';
import { ControlComponent } from './campaigns-create/control-group/control/control.component';
import { SelectedSegmentComponent } from './campaigns-create/control-group/selected-segment/selected-segment.component';
import {SegmentationListComponent} from './../segmentation/segmentation-list/segmentation-list.component';
export const routes = [
  //{ path: 'summary', component: CampaignSummaryComponent, pathMatch: 'full'  },
  { path: 'createCampaign', component: CampaignsCreateComponent, pathMatch: 'full'  },
  {path:'segList',component:SegmentationListComponent,pathMatch:'full'}
];


@NgModule({
  declarations: [ CampaignComponent, CampaignsCreateComponent, ComposeComponent, TargetUsersComponent, ControlGroupComponent,  SegmentationComponent, SegmentationChartComponent, ChannelComponent, ControlComponent, SelectedSegmentComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CampaignModule { }
