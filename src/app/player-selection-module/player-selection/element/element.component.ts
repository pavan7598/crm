import { Component, OnInit, Input, ElementRef, Output,  EventEmitter } from '@angular/core';
import { FilterElementTransferService } from '../filter-panel/filter-element-transfer.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {
@Output() onremove = new EventEmitter();
@Input()
data: any;
@Input() index: number;
@Input() isDragable:  boolean;
@Input() showRemove:  boolean;
@Input() canlock:boolean;
constructor(private el: ElementRef,private fets:FilterElementTransferService) { }

  ngOnInit() {

  }
  elementDrag(ev: DragEvent) {
    ev.dataTransfer.setData('data', JSON.stringify(this.data));
    
  }
  delete(indx)  {

    this.onremove.emit(indx);
  }
  elementRemove(indx) {
    this.onremove.emit(indx);
    
  }

}
