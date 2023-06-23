import { Component, OnInit, Input } from '@angular/core';
import { SgmentationMethodsService } from './../../sgmentation-methods.service';
import { SharedService } from './../../../shared/shared.service'
import { AppService } from 'src/app/app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlabsModelBoxComponent } from './../slabs-model-box/slabs-model-box.component'
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-percentile-slabs',
  templateUrl: './percentile-slabs.component.html',
  styleUrls: ['./percentile-slabs.component.scss']
})
export class PercentileSlabsComponent implements OnInit {
  percentileTypes: any;
  common: any = {};
  orders: any = [{ value: 'asc', label: 'ascending' }, { value: 'desc', label: 'descending' }];
  measureList: any;
  constructor(private segmentationMethodsService: SgmentationMethodsService,
    private sharedService: SharedService,
    private appService: AppService,
    public dialog: MatDialog,
    public toastr:ToastrService
  ) {
    this.measureList = this.appService.MeasureList;
  }
  options: any = {}
  Elementlable: any
  step = 0;
  metricSelect = new FormControl('', Validators.required);
  Order = new FormControl('', Validators.required);

  ngOnInit() {
    this.segmentationMethodsService.currentData.subscribe((e: any) => {
      this.common.dimensions = e.data.elementname;
    });
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openDialog(value): void {
    const dialogRef = this.dialog.open(SlabsModelBoxComponent, {
      width: '500px',
      data: value
    });
  }

  salbLength() {
    let length = 0;
    this.percentileTypes.forEach(d => {
      length = length + d.length
    })
    return length;
  }
  Object:any;
  SaveSegment() {
    let customer = this.salbLength();
    // let Slabname = index
    let segMethods: any = { type: 'percentile' }
    segMethods.config = { common: this.common, percentileSlab: this.No_of_divisions }
    this.Object = { filters: this.sharedService.selected_filter, segmentMethods: segMethods, customers: customer, totalCustomers: this.appService.total_players, segmentType: 'custom' };
    // this.openDialog(obj);
  }

  No_of_divisions: any;
  TotalPencentiles(value) {
    this.No_of_divisions = value;
  }
  showPanel: any = true;
  Submitted: any = false;
  SubmitPercentile(divisions) {
    this.No_of_divisions = divisions;
    console.log('=======>',this.Order,this.metricSelect)
    this.Submitted = true;
    if(this.metricSelect.invalid && this.Order.invalid){

    }else if(this.metricSelect.valid && this.Order.valid && this.No_of_divisions){
      this.segmentationMethodsService.getPercentilelabs(this.sharedService.selected_filter.final_condition, this.common, this.No_of_divisions).subscribe(d => {
        let Data: any = d;
        this.percentileTypes = Data.data;
        console.log('=============>data',this.percentileTypes)
        this.SaveSegment();
        this.showPanel = false;
        this.nextStep();
      })
    }else{
        this.toastr.error('Select divisions')
    }
  }

  selectChange(){
    if(this.metricSelect.valid && this.Order.valid){
      this.SubmitPercentile(4);
    }
  }

}
