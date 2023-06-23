import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss']
})
export class ElementListComponent implements OnInit {
  @Input() isDragable:  boolean;
  @Output() onremove = new EventEmitter();
  @Input() data:  any;
  @Input() type:  any;
  constructor() { }

  ngOnInit() {
    console.log()
  }
  elementDrag(ev: DragEvent) {
    ev.dataTransfer.setData('data', JSON.stringify(this.data));    
  }
  delete(indx)  {
    this.onremove.emit(indx);
  }
}
