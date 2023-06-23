import { Component, OnInit, Input ,ElementRef} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
declare var $:any;
@Component({
  selector: 'app-selection-panel',
  templateUrl: './selection-panel.component.html',
  styleUrls: ['./selection-panel.component.scss']
})
export class SelectionPanelComponent implements OnInit {
@Input() elements: Array<any>;
@Input() collections:  any;
@Input() a :any;
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // $(this.el.nativeElement).sortable();
  }
  drop(event: CdkDragDrop<any[]>) {
    // console.log("elements SelectionPanelComponent  ========>",this.elements);
    moveItemInArray(this.elements , event.previousIndex, event.currentIndex);
  }
  dragOver(ev) {
    // console.log("elements SelectionPanelComponent  ========>",this.elements);

    ev.preventDefault();

  }
  elementRemove($event) {
    // console.log(`-------------------->`);
    // console.log($event);
    this.elements.splice($event,1);
  }
  addElement(ev)  {

    // console.log("data",ev.dataTransfer.getData('data'));
    if  (!ev.dataTransfer.getData('data'))  {
      return;
    }
    const parsedData = JSON.parse(ev.dataTransfer.getData('data'));
    for (let e of this.elements) {
     if (e.id === parsedData.id )  {
      return;
     }
    }
    this.elements.push(parsedData);
  }

}
