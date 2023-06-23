import { Component, OnInit, Input } from '@angular/core';
import { CampaignService } from 'src/app/campaign/campaign.service';

@Component({
  selector: 'app-roi-data-summary',
  templateUrl: './roi-data-summary.component.html',
  styleUrls: ['./roi-data-summary.component.scss']
})
export class RoiDataSummaryComponent implements OnInit {
  ROI_DATA={}
  @Input() show;
  constructor(private campService: CampaignService) { 
    this.getRoiData('conversion')
    this.campService.roiTrigger().subscribe(type=>{
//      debugger;
      this.getRoiData(type);
    })
  }
getRoiData(type)
{
  this.campService.getCampaignROI(type).subscribe((data:any)=>{
    this.ROI_DATA = data.data;
  });
}
  ngOnInit() {
    this.getRoiData('conversion')
    this.campService.roiTrigger().subscribe(type=>{
//      debugger;
      this.getRoiData(type);
    })
  }

}
