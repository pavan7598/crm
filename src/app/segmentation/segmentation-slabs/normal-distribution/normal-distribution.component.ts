import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SgmentationMethodsService } from './../../sgmentation-methods.service';
import { SharedService } from './../../../shared/shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlabsModelBoxComponent } from './../slabs-model-box/slabs-model-box.component'
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-normal-distribution',
  templateUrl: './normal-distribution.component.html',
  styleUrls: ['./normal-distribution.component.scss']
})
export class NormalDistributionComponent implements OnInit {
  normalDistribution: any = [];
  measureList: any;
  orders: any = [{ value: 'asc', label: 'ascending' }, { value: 'desc', label: 'descending' }];
  common: any = {};
  constructor(private appService: AppService,
    private segmentationMethodsService: SgmentationMethodsService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    public toastr:ToastrService

  ) {
    this.measureList = this.appService.MeasureList;
  }
  metricSelect = new FormControl('',Validators.required);
  Order = new FormControl('',Validators.required);
  ngOnInit() {
    this.segmentationMethodsService.currentData.subscribe((e: any) => {
      this.common.dimensions = e.data.elementname;
    });
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  type: any;
  normaldistributiontype(ev) {
    this.type = ev;
  }
  NormalDistributionList: any;
  ShowPanel: any = true;
  Submitted:any = false;
  normaldistribution() {
  this.Submitted = true;
    if(!this.metricSelect.valid && !this.Order.valid){

    }else if(this.metricSelect.valid && this.Order.valid && this.type != undefined){
      this.segmentationMethodsService.getNormalSlabs(this.sharedService.selected_filter.final_condition, this.common, this.type, 5).subscribe((d: any) => {
        this.NormalDistributionList = d.data;
        this.SaveSegment();
        this.ShowPanel = false;
        this.nextStep();
      })
    }else{
       this.toastr.error('Select Normal Distribution Type')
    }
  }

  openDialog(value): void {
    const dialogRef = this.dialog.open(SlabsModelBoxComponent, {
      width: '500px',
      data: value
    });
  }

  salbLength(){
    let length = 0;
    this.NormalDistributionList.forEach(d=>{
      length = length + d.length
    })
    return length;
  }
  Object:any;
  SaveSegment() {
    let customer = this.salbLength();
    // let Slabname = index
    let segMethods: any = { type: 'normal' }
    segMethods.config = { common: this.common, normalDistribution: this.type }
    this.Object = { filters: this.sharedService.selected_filter, segmentMethods: segMethods,customers:customer,totalCustomers:this.appService.total_players,segmentType: 'custom' };
    // this.openDialog(obj);
  }


}
