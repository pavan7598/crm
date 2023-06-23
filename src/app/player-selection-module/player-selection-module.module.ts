import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlayerSelectionComponent, ViewSqlDialogbox } from './player-selection/player-selection.component';
import { SegmentationComponent } from './segmentation/segmentation.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ElementsCollectionListComponent } from './player-selection/elements-collection-list/elements-collection-list.component';
import { FilterPanelComponent } from './player-selection/filter-panel/filter-panel.component';
import { SelectionPanelComponent } from './player-selection/selection-panel/selection-panel.component';
import { PlayerSelectionRouting } from './player-selection-routing';

import { FilterElementComponent } from './player-selection/filter-element/filter-element.component';
import { ElementComponent } from './player-selection/element/element.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerSelectionLangingComponent } from './player-selection-langing/player-selection-langing.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { SqlFilterComponent } from './player-selection/sql-filter/sql-filter.component';
import { MatSelectModule, MatDatepickerModule, MatInputModule,
  MatProgressBarModule,MatChipsModule,MatDialogModule } from '@angular/material';

import { SharedModule} from "../shared/shared.module";
import { DatePipe } from '@angular/common';
import { PsQueryResultsComponent } from './ps-query-results/ps-query-results.component';
import { MatMenuModule } from '@angular/material/menu';
import { QueryCountComponent } from './query-count/query-count.component';
import { CountChartComponent } from './query-count/count-chart/count-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CountInfoComponent } from './query-count/count-info/count-info.component';
import { SegmentChartComponent } from './ps-query-results/segment-chart/segment-chart.component';
import { MetricCountComponent } from './ps-query-results/metric-count/metric-count.component';
import { SaveAsComponent } from './player-selection/save-as/save-as.component';
import { CKEditorModule } from 'ngx-ckeditor';


@NgModule({
  declarations: [PlayerSelectionComponent, SegmentationComponent,
    CatalogComponent, ElementsCollectionListComponent,
    FilterPanelComponent, SelectionPanelComponent, FilterElementComponent, ElementComponent,
    PlayerSelectionLangingComponent, 
    SqlFilterComponent,
    PsQueryResultsComponent, ViewSqlDialogbox,
    QueryCountComponent, CountChartComponent, CountInfoComponent,
    SegmentChartComponent, MetricCountComponent, SaveAsComponent, ],
  imports: [
    CommonModule,
    MatButtonModule,
    PlayerSelectionRouting,
    HttpClientModule,
    CKEditorModule,
    MatTableModule, 
    MatFormFieldModule,
    MatMenuModule,
    MatPaginatorModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FlexLayoutModule,
    NgxEchartsModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    DragDropModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    PlayerSelectionComponent, SegmentationComponent,
    ElementsCollectionListComponent,MatChipsModule,
    FilterPanelComponent, SelectionPanelComponent,
    PsQueryResultsComponent, ViewSqlDialogbox,ElementComponent,
    QueryCountComponent, CountChartComponent, CountInfoComponent,SegmentChartComponent
  ],
  providers: [DatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [PlayerSelectionComponent, ViewSqlDialogbox, CountInfoComponent,SegmentChartComponent,SaveAsComponent],
  //entryComponents:[PlayerSelectionComponent],
})
export class PlayerSelectionModule { }
