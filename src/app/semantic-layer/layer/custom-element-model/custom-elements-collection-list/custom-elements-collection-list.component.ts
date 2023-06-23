import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-elements-collection-list',
  templateUrl: './custom-elements-collection-list.component.html',
  styleUrls: ['./custom-elements-collection-list.component.scss']
})
export class CustomElementsCollectionListComponent implements OnInit {
  panelOpenState = false;
  variable:any="";  
  @Input() collections:  any;
  @Input() a:any;
  constructor() {
  
  }


  ngOnInit() {
    console.log('collections====>',this.collections);
    // console.log(this.a);
  // debugger;
  }

}
