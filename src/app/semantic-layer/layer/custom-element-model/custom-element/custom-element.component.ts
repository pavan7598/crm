import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-custom-element',
  templateUrl: './custom-element.component.html',
  styleUrls: ['./custom-element.component.scss']
})
export class CustomElementComponent implements OnInit {
  @Output() onremove = new EventEmitter();
  @Input()
  data: any;
  @Input() index: number;
  @Input() isDragable: boolean;
  @Input() showRemove: boolean;
  @Input() canlock: boolean;
  constructor() { }

  ngOnInit() {

  }
  elementDrag(ev: DragEvent) {
    ev.dataTransfer.setData('data', JSON.stringify(this.data));
  }
  delete(indx) {
    this.onremove.emit(indx);
  }

  elementRemove($event) {


  }

}
