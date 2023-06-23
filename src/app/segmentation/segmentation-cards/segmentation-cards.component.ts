import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SgmentationMethodsService } from '../sgmentation-methods.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-segmentation-cards',
  templateUrl: './segmentation-cards.component.html',
  styleUrls: ['./segmentation-cards.component.scss']
})
export class SegmentationCardsComponent implements OnInit {
  @Output()SegmentationList: EventEmitter<any> = new EventEmitter<any>()
  segmentationCardList:any=[]
  constructor(private sgmentationMethodsService:SgmentationMethodsService,public sharedService:SharedService) {
    this.sgmentationMethodsService.getTotalCustomerSummary({final_condition_campaign:''}).subscribe((e:any)=>{
      this.segmentationCardList=e.data;
      console.log("this.segmentationCardList====>",this.segmentationCardList);
    });

   }

  ngOnInit() {

    
    this.sharedService.matricsRefreshData.subscribe((e:any)=>{
      
      console.log("eeeeeeeeeeeeeeeee====>",e);
      this.sgmentationMethodsService.getTotalCustomerSummary({final_condition_campaign:e.final_condition_campaign}).subscribe((e:any)=>{
        this.segmentationCardList=e.data;
        console.log("this.segmentationCardList====>",this.segmentationCardList);
      });
    });
  }
  SegList(){
  this.SegmentationList.emit(true);
  }

}
