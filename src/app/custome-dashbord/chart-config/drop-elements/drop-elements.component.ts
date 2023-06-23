import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-drop-elements',
  templateUrl: './drop-elements.component.html',
  styleUrls: ['./drop-elements.component.scss']
})
export class DropElementsComponent implements OnInit {
  @Input() type: any;
  @Input() confList: any;
  @Input() placeholder: any;
  @Input() single: any;
  @Output() dragElements = new EventEmitter();
  elements: any = [];
  constructor() { }

  ngOnInit() {
    // console.log("-draglist------>",this.confList)
    if(this.confList.value[this.confList.key]){
      this.elements=this.confList.value[this.confList.key];
    }
  }
  dragOver(ev: any) {
    ev.preventDefault();
  }
  addElement(ev: any) {
    if (!ev.dataTransfer.getData('data')) {
      return;
    }
    const parsedData = JSON.parse(ev.dataTransfer.getData('data'));
    for (let e of this.elements) {
      if (e.id === parsedData.id) {
        return;
      }
    }
    // console.log(this.type)
    if (this.type == parsedData.elementtype) {
      // console.log(this.single)
      if (this.single) {
        this.elements = [];
        this.elements.push(parsedData);
      } else {
        this.elements.push(parsedData);
      }
    } else if (this.type == 'all') {
      this.elements.push(parsedData);
    }
    else {
      return;
    }
    // console.log(this.elements)
    this.dragElements.emit(this.elements);
  }

  elementRemove($event: any) {
    this.elements.splice($event, 1);
    this.dragElements.emit(this.elements);
  }

}
