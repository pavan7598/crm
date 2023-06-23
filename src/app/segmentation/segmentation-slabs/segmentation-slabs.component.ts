import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segmentation-slabs',
  templateUrl: './segmentation-slabs.component.html',
  styleUrls: ['./segmentation-slabs.component.scss']
})
export class SegmentationSlabsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  SlabValue:any;
  SelectedSlab(ev:any){
    console.log('=====>event',ev)
    this.SlabValue = ev;
  }
}
