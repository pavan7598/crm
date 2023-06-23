import { Component,
   OnInit, 
   Input,
    ElementRef,
     AfterViewInit,
      Renderer2,
       OnDestroy,
        Output,
         EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { jsPlumb, jsPlumbInstance, DragEventCallbackOptions } from 'jsplumb';
import * as $ from 'jquery';
import { JsPlumbService } from '../../../js-plumb.service';

@Component({
  selector: 'app-layer-table',
  templateUrl: './layer-table.component.html',
  styleUrls: ['./layer-table.component.scss']
})
export class LayerTableComponent implements OnInit, AfterViewInit , OnDestroy {
  @Input() schema;
  @Input() jsPlumbInst: jsPlumbInstance;
  @Input() index: any;
  @Output() ondelete = new EventEmitter<any>();
  @Output() initcomplete = new EventEmitter<any>();
  constructor(private eleref: ElementRef,
    private render2: Renderer2,
    public jps:JsPlumbService) {
      this.jps.refreshEndPoint$.subscribe(d=> {
        // console.log(`calling ---------------`);
        this.addDrag();
      });
  }
  elements: Array<any>;
  ngOnInit() {
     this.elements = this.schema.elements;

  }
addDrag() {
  this.jsPlumbInst.draggable(this.eleref.nativeElement,  {
    containment:  'parent',
    drag: (params: DragEventCallbackOptions) =>  {
      this.jsPlumbInst.revalidate(params.el);
    },
    stop: (params: DragEventCallbackOptions) =>  {
      this.schema.top = params.pos[1];
      this.schema.left  = params.pos[0];
    }
  });

    $(this.eleref.nativeElement)
    .css({'top':  this.schema.top, 'left': this.schema.left});



}
ngAfterViewInit() {
this.addDrag();
this.initcomplete.emit(1);
}
deleteSchema()  {
this.ondelete.emit(this.index);
}
ngOnDestroy() {
  this.jsPlumbInst.reset();
}

}
