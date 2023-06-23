import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { targetUsers } from './../../../Interfaces/interfaces';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CampaignService } from './../../campaign.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-target-users',
  templateUrl: './target-users.component.html',
  styleUrls: ['./target-users.component.scss']
})
export class TargetUsersComponent implements OnInit {
  @Input() targetusers: FormGroup;
  @Input() totalCampainObj: any;
  @Output() segmentData: EventEmitter<any> = new EventEmitter<any>();
  pages: any = [0, 1];
  segments: any;
  // maxpage = [this.segments.length - 1];
  prev: any = false;
  pagearray: any = [];
  constructor(private route: Router, public sharedService: SharedService, private campService: CampaignService, private toast: ToastrService,private appService:AppService) {
  }
  Segment_name = new FormControl('', [
    Validators.required
  ]);
  salb:any = {};
  returnelements = [];
  currentUser: any;
  AllSegments: any;
  ngOnInit() {
    this.targetusers.addControl('id', new FormControl('', Validators.required));
    this.currentUser = JSON.parse(window.sessionStorage.getItem('currentuser'));
    this.getSegments();
    this.appService.elementlist().subscribe((d:any)=>{
      console.log('================>elementlist',d);
      this.returnelements = d.data
    })
  }

  getSegments() {
    this.campService.getAllSegment().subscribe(d => {
      let Data: any = d;
      this.AllSegments = Data.data;
      this.data = this.AllSegments;
    })
  }
  selectedCustomers:any={
    selected:0,
    total:this.appService.total_players,
  };
  fetchData:Boolean=false;
  fetch() {
    console.log("salb==========>", this.salb);
    //console.log("salb==========>", this.salb.final_condition_campaign);
    //debugger;

    this.campService.getExecuteDistinct({filters:this.salb.final_condition_campaign}).subscribe((e:any)=>{
      console.log("e============>",e);
      this.selectedCustomers.selected=e.data;
      console.log("this.selectedCustomers============>",this.selectedCustomers);
      this.fetchData=false;
      setTimeout(() => {        
        this.fetchData=true;
      }, 200);
    })
  }

  doubleClick(ev){
    console.log("doubleClick===>",ev);
    this.salb=ev.filters;
    this.salb._id=ev._id;
    this.fetch();
    //this.salb.name=ev.name;
    console.log("this.salb====>",this.salb);
    this.Showsegments=true;

  }

  Showsegments: any = false;
  customsegment(value) {
    this.Showsegments = value;
    this.fetchData=false;
    this.salb={};
  }
  segmentName: any;
  selectedSegment(value) {
    this.segmentName = value.segmentName;
    this.targetusers.get('id').setValue(value._id);
    this.segmentData.emit(value);
  }

  SegmentsList() {
    this.route.navigateByUrl('/campaign/segList')
  }

  Save() {
    let obj: any = { segmentName: this.Segment_name.value, filters: this.salb, campaignType: this.totalCampainObj.compose.campaign_type, createdBy: this.currentUser.email, segmentType: 'runtime',totalCustomers:this.appService.total_players,_id:this.salb._id };
    if (this.Segment_name.invalid) {

    } else {
      this.campService.saveSegment(obj).subscribe(d => {
        let res: any = d;
        if (res.error == false) {
          this.Showsegments = false;
          this.getSegments();
          this.toast.success(res.msg)
        } else {

        }
      })
    }
  }

  data:any =[];
  Search(value){
    this.data = this.AllSegments;
    if(value != undefined && value != ''){
      this.data = this.AllSegments.filter(d=>{
        return d.segmentName.toLowerCase().search(value.toLowerCase())>=0
      })

    }else{
      this.getSegments();
    }
  }




}
