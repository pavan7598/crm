import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MeterialModules } from '../meterial/meterial-modules';
import { ToastrModule } from 'ngx-toastr';
import { NgxEchartsModule } from 'ngx-echarts';

import { NgSelectModule } from '@ng-select/ng-select';
import { ConfimDialogComponent } from './confim-dialog/confim-dialog.component';
import { ReduceStringPipe } from './pipes/reduce-string.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { InputTypeDirective } from './pipes/input-type.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SingleSelectComponent } from './single-select/single-select.component';
import { NumberSpinnerDirective } from './numberSpinner/number-spinner.directive';
import { FooterComponent } from './footer/footer.component';
import { EchartsComponent } from './echarts/echarts.component';
import {SgmentationMethodsService} from './../segmentation/sgmentation-methods.service';
import { SegmentationSlabFilterComponent } from './segmentation-slab-filter/segmentation-slab-filter.component';
import { SegmentationFilterComponent } from './segmentation-filter/segmentation-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng5SliderModule } from 'ng5-slider';
import {SegmentationListComponent} from '../segmentation/segmentation-list/segmentation-list.component';
import { SegmantFixedFilterComponent } from './segmant-fixed-filter/segmant-fixed-filter.component';
import { SegmantFixedSlabFilterComponent } from './segmant-fixed-slab-filter/segmant-fixed-slab-filter.component';
import { ViewTableComponent } from './view-table/view-table.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { SafeHtmlPipe } from './pipes/safehtml';
@NgModule({ 
  declarations: [ConfimDialogComponent,
    ReduceStringPipe,
    SendEmailComponent,
    SearchFilterPipe,
    SafeHtmlPipe,
    InputTypeDirective,
    ViewTableComponent,
     SingleSelectComponent,
     FooterComponent,
     NumberSpinnerDirective,
      EchartsComponent,
       SegmentationSlabFilterComponent,
       SegmentationFilterComponent,
       SegmentationListComponent,
        SegmantFixedFilterComponent,
         SegmantFixedSlabFilterComponent
        ],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    MeterialModules,
    NgSelectModule,
    NgxMatSelectSearchModule,
    NgxEchartsModule,
    FlexLayoutModule,
    Ng5SliderModule
  ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
    SendEmailComponent,
    MeterialModules,
    SafeHtmlPipe,
    ViewTableComponent,
    NgSelectModule,
    ReduceStringPipe,
    DecimalPipe,
    SearchFilterPipe,
    InputTypeDirective,
    NgxMatSelectSearchModule,
    SingleSelectComponent,
    FooterComponent,
    NumberSpinnerDirective,
    NgxEchartsModule,
    EchartsComponent,
    FlexLayoutModule,
    SegmentationSlabFilterComponent,
    SegmentationFilterComponent,
    Ng5SliderModule,
    SegmentationListComponent,
    SegmantFixedFilterComponent,
    SegmantFixedSlabFilterComponent
  ],
  providers:[SgmentationMethodsService],
  entryComponents:[ConfimDialogComponent,EchartsComponent,SendEmailComponent],

})
export class SharedModule { }
