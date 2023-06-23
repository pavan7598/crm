import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-elements-collection-list',
  templateUrl: './elements-collection-list.component.html',
  styleUrls: ['./elements-collection-list.component.scss']
})
export class ElementsCollectionListComponent implements OnInit {
  panelOpenState = false;
  variable:any="";  
  @Input() collections:  any;
  @Input() a:any;
  constructor() {
  
  }


  ngOnInit() {
    // console.log('collections====>',this.collections);
    // console.log(this.a);
  // debugger;
  }

}
