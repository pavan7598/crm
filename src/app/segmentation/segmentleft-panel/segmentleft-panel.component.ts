import { Component, OnInit, Input } from '@angular/core';
import { SgmentationMethodsService } from '../sgmentation-methods.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-segmentleft-panel',
  templateUrl: './segmentleft-panel.component.html',
  styleUrls: ['./segmentleft-panel.component.scss']
})
export class SegmentleftPanelComponent implements OnInit {
  @Input() dimensions: any;
  dimension = new FormControl([], Validators.required)
  constructor(public segmentationMethodsService: SgmentationMethodsService) {

  }
  // @Input() selected:any={}
  distinctDimentions: any = [];

  ngOnInit() {



  }

  selectionChanged(ev) {
    if (ev != undefined) {
      this.segmentationMethodsService.noModel = true;
      this.segmentationMethodsService.dataSource.next({ 'key': 'custom_select', data: ev });
      this.getDistinctDimentions(ev);
    } else {
      this.segmentationMethodsService.noModel = false;
    }
  }

  getDistinctDimentions(ev: any) {
    this.segmentationMethodsService.getDistinctDimentions({ elementname: ev.elementname }).subscribe((e: any) => {
      console.log("e=====>", e);
      this.distinctDimentions = e.distintValues;
    })
  }


}
