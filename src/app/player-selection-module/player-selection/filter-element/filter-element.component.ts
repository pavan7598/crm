import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { PlayerSelectionService  } from "../player-selection.service";
import * as $ from 'jquery';
@Component({
  selector: 'app-filter-element',
  templateUrl: './filter-element.component.html',
  styleUrls: ['./filter-element.component.scss']
})
export class FilterElementComponent implements OnInit {
@Input()
data: any =  {};
@Input() containerid:any;
@Output() filterDrop = new EventEmitter();
@Output() removeElement = new EventEmitter();
@HostListener('dragstart',['$event']) FilterOver(ev) {
  // ev.preventDefault();
  // console.log('Listning the drag !!!!!!!!!!!!!!');
  let img = document.createElement("div");
  img.style.width = '100px';
  img.style.height  = '100px';
  img.style.background='red'

  ev.dataTransfer.setDragImage(img, 0, 0);
}
@HostListener('drop',['$event']) dropperonFilter(ev) {
  ev.stopPropagation();
  // console.log(this.containerid);
let droppedData = JSON.parse(ev.dataTransfer.getData('data'));
let filterCheck = !droppedData.isfilter || false;
let containrtCheck = (droppedData.containerId === this.containerid) ? true : false;
if  (this.data.id === droppedData.id  && !filterCheck && containrtCheck) {
this.filterDrop.emit({data: droppedData, toAdd: false});
}
else  {
  this.filterDrop.emit({data: droppedData, toAdd: true});
}
}
  constructor(private playerSelectionService:PlayerSelectionService) {

  }
  remove() {
    this.removeElement.emit();
  }

  ngOnInit() {

    if  (this.data.element) {
      let row = this.playerSelectionService.findNameById(this.data.element.id);
    this.data.elementlabel = row.elementlabel;
  }
  }


}
