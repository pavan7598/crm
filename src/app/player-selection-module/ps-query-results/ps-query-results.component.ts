import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { PlayerSelectionService } from "../player-selection/player-selection.service";
import { Router } from "@angular/router";
import { ViewModelTableComponent } from '../../shared/view-model-table/view-model-table.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SegmentChartComponent } from "./segment-chart/segment-chart.component";
import { Subject, Subscription } from 'rxjs';
 
import { ToastrService } from 'ngx-toastr';
import { ConfimDialogComponent } from '../../shared/confim-dialog/confim-dialog.component';
import { PlayerSelectionComponent } from "../player-selection/player-selection.component";
import { SaveAsComponent } from "../player-selection/save-as/save-as.component";
import { ExcelService } from 'src/app/shared/excel.service';
import { SendEmailComponent } from 'src/app/shared/send-email/send-email.component';
// import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ps-query-results',
  templateUrl: './ps-query-results.component.html',
  styleUrls: ['./ps-query-results.component.scss']
})
export class PsQueryResultsComponent implements OnInit, OnDestroy {
  @ViewChild(PlayerSelectionComponent,{static:true}) playerSelection: PlayerSelectionComponent;
  constructor(private toastr: ToastrService,
    public playerSelectionService: PlayerSelectionService,
    private router: Router, public dialog: MatDialog,
    private excelService:ExcelService
    ) { }
chartLoaded:any=true;
  //
  error=false;
  queryObj: any = {};
  resultData: any = [];
  original_dataset: any = {};
  resData: any = {};
  commonService$: Subscription;
  psresults:any;
  // patternvalidation = new FormControl('', [Validators.required,Validators.pattern('[0-9a-zA-Z_-]{1,40}$')])

  ngOnInit() {

    this.commonService$ = this.playerSelectionService.currentData.subscribe(data => {
      // console.log("----------data.key-----------",data.key)
      // console.log("----------data-----------",data)
      if (data.key == 'psQueryResults') {
        // debugger
        this.original_dataset = data.original_dataset;
        // this.original_dataset._id = data.data.query._id;
        this.queryObj = data.data;
        this.queryObj.paging = { page: 1, pageSize: 3000 };

        // console.log("------------this.queryObj------------",this.queryObj)
        if (this.original_dataset.type == "Segementation") {
          this.playerSelectionService.customsegResult(this.queryObj).subscribe((e: any) => {
            
            // console.log("--------------e-----Segementation----------",e)
            if(!e.totalresults)
            {
              this.toastr.error(e.message);
              this.chartLoaded=false;
              this.error=true;
              return;
            }
            this.resultData = e.totalresults;
            this.chartLoaded=false;
            this.resData = e;
          });
        } else {
//          debugger;
          this.playerSelectionService.getMetricCont(this.queryObj).subscribe((e: any) => {
//            debugger;
            if(!e.data)
            {
              this.toastr.error(e.message);
              this.chartLoaded=false;
              this.error=true;
              return;
            }
            this.resultData = e.data;
            this.psresults = e.metrics;
            this.chartLoaded=false;

          },(err)=>{
            this.toastr.error(err);
            this.chartLoaded=false;
          });
        }
      } else {
        this.router.navigate(['/player/catalog']);
      }
    });

  }

  back() {
    this.error=false;
    this.playerSelectionService.dataSource.next({ key: 'playerSelection', data: this.original_dataset });
    this.router.navigate(['customerextraction/player/playerSelection']);
  }

  showresults(data) {
    this.openDialog(data);
  }

  save(queryObj:any,saveAs:any){
    // if(!this.patternvalidation.valid){
    //   return this.toastr.error('Please Check Your Query Name');
    // }
    this.queryObj.query.creationtimestamp = Date.now();
    if(saveAs){
      delete this.queryObj.query._id;
      delete this.queryObj.query.id;
    }
    // console.log("---result--save------->",this.queryObj.query,saveAs)
    this.playerSelectionService.querySave(this.queryObj.query).subscribe((e:any)=>{
      let req:any=e;
      // debugger
      if(req._id){
        this.queryObj.query._id=req._id;
        this.original_dataset._id=req._id;
        this.original_dataset.name=req.name;
        this.toastr.success("selection saved", 'Message');
      }else{
        this.toastr.error(e.msg, 'Message');
      }
    });
  }
  saveAs() {
    const dialogRef = this.dialog.open(SaveAsComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.componentInstance.onsaveas.subscribe((data) =>  {
      this.queryObj.query.name  = data;
      this.save(this.queryObj.query,true);
      dialogRef.close();
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ViewModelTableComponent, {
      width: '80%',height:'70%',
      data: data
    });
  }

  slab_count: any = [];
  segment_value: any = [];
  xaxis: any = [];

  chart() {
    this.segment_value = [];
    this.xaxis = [];

    this.resData.conditionresults.forEach((element, index) => {
      let val = Math.round((this.resData.conditionresults[index].dataset.length / this.resData.conditionresults[index].total_count) * 100)
      this.xaxis.push(this.resData.conditionresults[index].slabcondition);
      this.segment_value.push(val);
    });


    // console.log("this.xaxis===>", this.xaxis);
    // console.log("this.segment_value===>", this.segment_value);
    let m: any = { xaxis: this.xaxis, segment_value: this.segment_value, totalCustomer: this.resultData.length };
    this.openChartDialog(m);
  }

  openChartDialog(data: any): void {
    const dialogRef = this.dialog.open(SegmentChartComponent, {
      width: '50%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
  ngOnDestroy() {
    this.commonService$.unsubscribe();
  }

  exportAsXLSX(data):void {
    /**----pass data and filename to be saved as parameters--- */
  this.excelService.exportAsExcelFile(data, 'Player_Selection_Result_');
  // console.log(data,"<=====================excel==========>");
  }
  emailParams={query:this.queryObj,type:'playerSelection',};

  emailSend(){
    this.emailParams={query:this.queryObj,type:'playerSelection',};
    this.dialog.open(SendEmailComponent, {
      width:'40%',
      data:{name:this.emailParams}
    })
    console.log(this.queryObj,"===========query=============>");
    console.log(this.emailParams,"================email=======>");
  }

  cancel() {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data: { name: 'Do you want to discard changes and go back?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==undefined){
        return;
      }
      if (!result) {
        this.router.navigate(['/customerextraction/player/catalog']);
      }
    });
  }
}
