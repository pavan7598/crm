import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-selected-segment',
  templateUrl: './selected-segment.component.html',
  styleUrls: ['./selected-segment.component.scss']
})
export class SelectedSegmentComponent implements OnInit {
  @Input() campaignObj:any;
  constructor() { }

  ngOnInit() {
  }

}
