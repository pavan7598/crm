import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CampaignService } from 'src/app/campaign/campaign.service';
import { AppService } from './../../app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EchartsComponent } from './../../shared/echarts/echarts.component';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import {SgmentationMethodsService} from 'src/app/segmentation/sgmentation-methods.service';
@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent implements OnInit {
  displayedColumns: string[] = ['Campaignname', 'type',
    'classification',
    'status',
    'no_of_candidates', 'Analytics'
  ];
  campaginType: any;
  data: any = [
    { Campaignname: 'BigBillionDay', type: "churn", Channel: "Sms", Schedule: "23hrs ago", Creator: "Divakar", Sent: 1 }
  ]
  dataSource: any;
  totaldata: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  schedule_data: any;
  dist_obj: any;
  dataset_length_array: any;
  constructor(private ss: ScheduleService, private campService: CampaignService, private as: AppService, public dialog: MatDialog) {
  }

  SelectedStatus: any;
  ngOnInit() {
    this.campaginType = this.as.CampaignType;

    this.campService.getMockCampaign().subscribe((d: any) => {

      for (let i = 0; i < d.length; i++) {
        d[i] = Object.assign(d[i], { "Campaignname": d[i].campaign_name })
        this.totaldata.push(d[i]);
        // console.log("=========>d.length===========>",d);
      }

    })
    this.ss.getAllSchedules().subscribe((data: any) => {
      this
        .schedule_data = data.data.map(d => {
          let segmentid=d.campaignDetails.segmentsID;

          let return_data = {"d":d,
            "Campaignname": d.campaignDetails.campaignName,
            "status": d.campaignDetails.status, "classification": d.campaignDetails.type, "type": d.campaignDetails.type,
            "startDate": d.startDate, "endDate": d.endDate, "Action": d._id, "campaignID": d.campaignDetails._id,
          };
          console.log("======>>>>>>>"+JSON.stringify(d));
          this.totaldata.push(return_data);
          this.dataSource = new MatTableDataSource<any>(this.totaldata);
          this.dataSource.paginator = this.paginator;
          this.dataSource = new MatTableDataSource<any>(this.totaldata);
          this.dataSource.paginator = this.paginator;
          this.filterData(this.as.CampaignTableType);
          if (d.scheduleOptions) {
            Object.assign(return_data, { "StartDate": d.scheduleOptions.start_date, "EndDate": d.scheduleOptions.end_date })
          }
          else {
            Object.assign(return_data, { "StartDate": null, "EndDate": null })
          }
          return return_data
        });
    });
  }

  filterData(value) {
    console.log('=====>value', value)
    this.SelectedStatus = value;
    if (value == 'all') {
      let data = this.totaldata.filter(d => {
        if (d.classification == this.campaginType || d.type == this.campaginType) {
          return d;
        }
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }
    if (value == 'active') {
      let data = this.totaldata.filter(d => {
        if (d.status == 'active' && (d.classification == this.campaginType || d.type == this.campaginType)) {
          return d;
        }
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }
    if (value == 'in active') {
      let data = this.totaldata.filter(d => {
        if (d.status == 'in active' && (d.classification == this.campaginType || d.type == this.campaginType)) {
          return d;
        }
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }
    if (value == 'in progress') {
      let data = this.totaldata.filter(d => {
        if (d.status == 'in progress' && (d.classification == this.campaginType || d.type == this.campaginType)) {
          return d;
        }
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }
    if (value == 'completed') {
      let data = this.totaldata.filter(d => {
        if (d.status == 'completed' && (d.classification == this.campaginType || d.type == this.campaginType)) {
          return d;
        }
      })
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;

    }
  }


  openDialog(element) {
    // console.log("element"+"hhhhhhhh"+JSON.stringify(element));
    console.log("==========element_data===========",element);
    const dialogRef = this.dialog.open(EchartsComponent, { width: '1000px' ,data:{data:element.d}});
  }



}

