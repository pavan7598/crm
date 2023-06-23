import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
const routes: Routes = [
  {
    path: 'user',
     children: [
      { path: '', loadChildren: './usermodule/usermodule.module#UsermoduleModule' },
    ]
  },
  {
    path: 'campaign', component: LandingComponent,
    children: [
      { path: '', loadChildren: './campaign/campaign.module#CampaignModule' },
      { path: 'segmentation', loadChildren: './segmentation/segmentation.module#SegmentationModule' },
      { path: 'summary', loadChildren: './summary/summary.module#SummaryModule' },
      { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
      { path: 'dispatch', loadChildren: './dispatch/dispatch.module#DispatchModule' },
      {path: 'start', loadChildren: './startcampaign/startcampaign.module#StartCampaignModule' },
      {path: 'view', loadChildren: './viewcampaign/viewcampaign.module#ViewCampaignModule' },
      // { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },

    ]
  },
  {
    path: 'semantic', component: LandingComponent,
    children: [
      { path: '', loadChildren: './semantic-layer/semantic-layer.module#SemanticLayerModule' },
    ]
  },{
    path: 'customerextraction', component: LandingComponent,
    children: [
      { path: '', loadChildren: './player-selection-module/player-selection-module.module#PlayerSelectionModule' },
    ]
  },{
    path: 'dashboard', component: LandingComponent,
    children: [
      { path: '', loadChildren: './custome-dashbord/dashbord.module#dashbordModule' },
    ]
  },
  {
    path: 'reports', component: LandingComponent,
    children: [
      { path: '', loadChildren: './reports/reports.module#ReportsModule' },
    ]
  },
  {
    path: 'newreports', component: LandingComponent,
    children: [
      { path: '', loadChildren: './newreports/newreports.module#newreportsModule' },
    ]
  }

];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  //preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
  useHash: true
});