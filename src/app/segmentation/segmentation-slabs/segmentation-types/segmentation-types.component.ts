import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SgmentationMethodsService } from '../../sgmentation-methods.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-segmentation-types',
  templateUrl: './segmentation-types.component.html',
  styleUrls: ['./segmentation-types.component.scss']
})
export class SegmentationTypesComponent implements OnInit {
  @Output() slab: EventEmitter<any> = new EventEmitter<any>();
  constructor(public dialog: MatDialog,
   public segmentationMethodsService: SgmentationMethodsService,
   public sharedService: SharedService,
   public toastr:ToastrService
   ) { }

  elementList: any[] = [];
  segmentType: any
  ngOnInit() {

  }

  SelectSlab(value) {
    if (this.segmentationMethodsService.noModel == true) {
      this.segmentType = value;
      this.segmentationMethodsService.currentData.subscribe((e: any) => {
        if (e.key == "custom_select") {
          this.elementList[0] = e.data;
        }
        console.log("selectedData=====>", this.elementList);
      });
      this.slab.emit(value);
      // const dialogRef = this.dialog.open(SlabsModelBoxComponent, {
      //   width: '50%',
      //   minHeight:'350px',
      //   data: { data: this.elementList, type: value }
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed', result, this.segmentType);
      //   // console.log(JSON.stringify(result))
      //   // console.log(this.sharedService.selected_filter.final_condition)
      //   if (this.segmentType == 'fixed') {
      //     this.segmentationMethodsService.sendSlabData(result) ;
      //     this.segmentationMethodsService.getFixedSlabs(result, this.sharedService.selected_filter.final_condition).subscribe(data => {
      //     debugger;
      //     })
      //   }

      //   if (this.segmentType == 'percentile') {
      //     this.sharedService.slabModelData = result;
      //     this.segmentationMethodsService.getPercentilelabs(result, this.sharedService.selected_filter.final_condition, 4).subscribe(data => {
      //       debugger;
      //     })
      //   }
      //   if (this.segmentType == 'normal') {
      //     this.segmentationMethodsService.getNormalSlabs(result, this.sharedService.selected_filter.final_condition).subscribe(data => {
      //       debugger;
      //     })
      //   }


      // });

    } else {
      this.toastr.error('Select Dimension')
    }
  }
}


