import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ComposeComponent } from './compose/compose.component';
import { TargetUsersComponent } from './target-users/target-users.component';
import { ControlGroupComponent } from './control-group/control-group.component';
import { CampaignObject } from './../../Interfaces/interfaces';
import { CampaignService } from './../campaign.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  campaignObj = new FormGroup({
    compose: new FormGroup({}),
    target_users: new FormGroup({}),
    control_group: new FormGroup({})
  })
  constructor(private camService: CampaignService, private toast: ToastrService, private route: Router) {


  }

  ngOnInit() {
    console.log('campaignObject==>', this.campaignObj.controls)
  }
  selectedData: any;
  SelectedSegmentData(ev: any) {
    this.selectedData = ev
  }
  ComposeForm(value) {
    if (value == 'target') {
      if (this.campaignObj.controls.target_users.invalid) {
        this.toast.error('Select Segment');
      }
    }
  }

  finish(value) {
    let channel: any = Object.keys(this.campaignObj.value.control_group.channel);
    console.log('======>save obj', this.campaignObj, channel)
    let total_percentage = 0;
    let controlPercentage = 0;
    this.campaignObj.value.control_group.ControlValue.forEach(d => {
      controlPercentage = controlPercentage + d.value;
    })
    if (channel.length > 0) {
      this.campaignObj.value.control_group.channel.forEach(d => {
        total_percentage = total_percentage + d.percentage
      })
      if (controlPercentage > 0) {
        if (total_percentage < 100 || controlPercentage < 100) {
          this.toast.error('percentages must be 100');
        } else {
          this.camService.createCampaign(this.campaignObj.value).subscribe(d => {
            let res: any = d;
            if (res.error == false) {
              this.toast.success('Campaign Saved Successfully');
              this.route.navigateByUrl('/campaign/schedule')
            } else {
              if (res.msg.code == 11000) {
                this.toast.error('campaign exists with Name');
              }
            }
          })
        }
      }else{
        this.toast.error('Drag control group and target group')
      }

    } else {
      this.toast.error('Select channel and drag');
    }

  }

}
