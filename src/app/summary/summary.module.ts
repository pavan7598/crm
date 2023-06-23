import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignSummaryComponent } from './campaign-summary.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { MessagesSentComponent } from './messages-sent/messages-sent.component';
import { ScheduleWidgetsComponent } from './schedule-widgets/schedule-widgets.component';
import { StatusWidgetsComponent } from './status-widgets/status-widgets.component';
import { RevenueOverviewComponent } from './revenue-overview/revenue-overview.component';
import { EmailProgressCampaignComponent } from './email-progress-campaign/email-progress-campaign.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const routes = [
  {path:'',component:CampaignSummaryComponent ,pathMatch:'full'},
]

@NgModule({
  declarations: [CampaignSummaryComponent, EmailProgressCampaignComponent, RevenueOverviewComponent, StatusWidgetsComponent, ScheduleWidgetsComponent, MessagesSentComponent, CampaignListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SummaryModule { }
