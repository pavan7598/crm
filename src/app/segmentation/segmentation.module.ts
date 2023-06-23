import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SegmentationMethodsComponent } from './segmentation-methods/segmentation-methods.component';
import {SharedModule} from './../shared/shared.module';
import { SegmentationCardsComponent } from './segmentation-cards/segmentation-cards.component';
import { SegmentleftPanelComponent } from './segmentleft-panel/segmentleft-panel.component';
import { SegmentationSlabsComponent } from './segmentation-slabs/segmentation-slabs.component';
import { SegmentationTypesComponent } from './segmentation-slabs/segmentation-types/segmentation-types.component';
import { FixedSlabsComponent } from './segmentation-slabs/fixed-slabs/fixed-slabs.component';
import { PercentileSlabsComponent } from './segmentation-slabs/percentile-slabs/percentile-slabs.component';
import { NormalDistributionComponent } from './segmentation-slabs/normal-distribution/normal-distribution.component';
import { SlabsModelBoxComponent } from './segmentation-slabs/slabs-model-box/slabs-model-box.component';
import { PercentileChartComponent } from './segmentation-slabs/percentile-slabs/percentile-chart/percentile-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

export const routes = [
  { path: '', component: SegmentationMethodsComponent,data : {value :'segmentation'}, pathMatch: 'full'  },
  
];
@NgModule({
  declarations: [SegmentationMethodsComponent, SegmentationCardsComponent, SegmentleftPanelComponent, SegmentationSlabsComponent, SegmentationTypesComponent, FixedSlabsComponent, PercentileSlabsComponent, NormalDistributionComponent, SlabsModelBoxComponent, PercentileChartComponent, PieChartComponent, BarChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents:[SlabsModelBoxComponent]
})
export class SegmentationModule { }
