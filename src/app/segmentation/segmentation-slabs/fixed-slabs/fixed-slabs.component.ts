import { Component, OnInit } from '@angular/core';
import { SgmentationMethodsService } from './../../sgmentation-methods.service';
import { AppService } from 'src/app/app.service';
import { SharedService } from './../../../shared/shared.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SlabsModelBoxComponent } from './../slabs-model-box/slabs-model-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fixed-slabs',
  templateUrl: './fixed-slabs.component.html',
  styleUrls: ['./fixed-slabs.component.scss']
})
export class FixedSlabsComponent implements OnInit {

  constructor(public segmentationMethodsService: SgmentationMethodsService,
    private appService: AppService,
    public sharedService: SharedService,
    public dialog: MatDialog,
    public toastr: ToastrService

  ) {
    this.measureList = this.appService.MeasureList;
  }
  common: any = {};
  orders: any = [{ value: 'asc', label: 'ascending' }, { value: 'desc', label: 'descending' }];
  measureList: any = [];
  returnElementList = []
  Elementlable: any;
  ShowPanel: any = true;
  OpenPanel: any = false;
  metricSelect = new FormControl('', Validators.required);
  Order = new FormControl('', Validators.required);
  SlabsForm: FormGroup = new FormGroup({
    mainSlab: new FormGroup({})
  })

  ngOnInit() {
    this.addSlab();

    this.segmentationMethodsService.currentData.subscribe((e: any) => {
      this.Elementlable = e.data.elementlable;
      this.common.dimensions = e.data.elementname;
      this.setStep(0);
      if (this.Submitted == true) {
        this.SubmitFixedSlab();
      }
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

  psMainObj: any = [];
  addSlab() {
    this.psMainObj.push({});
  };


  removeSlab(index) {
    this.psMainObj.splice(index, 1)
  }
  ShowSegments = false;
  selectionChanged(ev) {
    this.ShowSegments = true;
    this.returnElementList = [];
    this.returnElementList.push(ev);
  }


  ChartType: any = 'pie';
  SelectChartType(type, data) {
    this.ChartType = type;
    console.log('====>chartconfig', type, data)
  }
  SlabsData: any;
  Submitted: any = false;
  SubmitFixedSlab() {
    this.Submitted = true

    let isValid = true;
    let msg = "";
    let arr: any = this.psMainObj;

    // console.log("this.distributionObject.segmentationMethod.slab_arr==>", this.distributionObject.segmentationMethod.slab_arr);

    arr.map((d: any, indx: any) => {
      arr.filter((d1: any, indx1: any) => {
        if (d1.slabName == d.slabName) {
          if (indx1 != indx) {
            isValid = false;
            msg = "Slab Name should be unique";
            return;
          }
        }
      })
      if (d.slabName == this.psMainObj[0].defaultSlabName) {
        msg = "Slab Name should be unique";
      }
    })
    // console.log("isValid===>", isValid);
    arr.map((d: any, indx: any) => {
      d.filters.map(v => {
        console.log("v.value===>", v.value, v.value != 0);
        if (!(v.elementlabel && v.selectFilter && v.value != 0)) {
          isValid = false;
          msg = "Please fill the required fields";
          return;
        } else if ((((v.selectFilter == 'notBetween' || v.selectFilter == 'between')) && !(v.value2))) {
          isValid = false;
          msg = "Please fill the required fields";
          return;
        }
      })
    })
    // console.log("isValid===>", isValid);
    if (!isValid) {
      this.toastr.error(msg);
    } else {



      if (this.metricSelect.invalid && this.Order.invalid) {

      } else {
        this.segmentationMethodsService.getFixedSlabs(this.psMainObj, this.sharedService.selected_filter.final_condition, this.common).subscribe((Data: any) => {
          console.log('=======>fixed Slab Data', Data)
          this.SlabsData = Data.data;
          this.SlabsData.forEach(d => {
            let key = Object.keys(d)
            if (Object.keys(d[key[0]]).length > 0) {
              d.flag = true
            } else {
              d.flag = false
            }
          })
          this.ShowPanel = false;
          this.nextStep();
        })
      }
    }
  }

  openDialog(value): void {
    const dialogRef = this.dialog.open(SlabsModelBoxComponent, {
      width: '500px',
      data: value
    });
  }

  salbLength(i) {
    let key = Object.keys(this.SlabsData[i])[0];
    let keys = Object.keys(this.SlabsData[i][key]);
    let length = 0;
    keys.forEach((d) => {
      length = length + this.SlabsData[i][key][d].length;
    })
    return length;
  }

  SaveSegment(index) {
    console.log('=====>model')
    let customer = this.salbLength(index);
    let Slabname = Object.keys(this.SlabsData[index])
    let segMethods: any = { type: 'fixed' }
    segMethods.config = { common: this.common, fixedSlab: this.psMainObj, selectedSlab: Slabname[0] }
    let obj = { filters: this.sharedService.selected_filter, segmentMethods: segMethods, customers: customer, totalCustomers: this.appService.total_players, segmentType: 'custom' };
    this.openDialog(obj);
  }
}
