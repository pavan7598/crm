import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { jsPlumbInstance } from 'jsplumb';
import { LayersService } from '../../../../layers.service';
import { JsPlumbService } from '../../../../js-plumb.service';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent implements OnInit ,AfterViewInit{
  @Input() element: any;
  @Input() jsPlumbInst: jsPlumbInstance;
  constructor(private layerService: LayersService,
    private jps:  JsPlumbService) {

   }

  ngOnInit() {

    // console.log(`Loggig the element in each component -------`);
    // console.log(this.element);
    // this.jps.refreshEndPoint$.subscribe(  d =>  {
    //   //
    //   this.jsPlumbInst.removeAllEndpoints(this.element.elementID);
    //   this.addEndpoints();
    // });

  }
addEndpoints()  {

  this.jsPlumbInst.makeSource(this.element.elementID , {
        anchor: ['Right'],
        endpoint: ['Rectangle', { width:  1, height:  1 }],
        connectorStyle : { stroke:  '#666', strokeWidth:  '1px' },
        filter: ':not(mat-icon)',
        connector:[ 'Bezier', { curviness:100 },{
          cssClass:'LineStyle'
      } ],
        maxConnections: -1
      });
      this.jsPlumbInst.makeTarget(this.element.elementID, {
        anchor: [ 'Left'],
        endpoint: ['Rectangle', { width:  1, height:  1 }],
        connectorStyle :  { stroke: '#666', strokeWidth:  '1px' },
        connector:  [ 'Bezier', { curviness:  100 } ],
        filter: ':not(mat-icon) ',
        maxConnections: -1
      });
}
  addElement()  {
  this.layerService.elementEvent.next(this.element);

        }
ngAfterViewInit() {
  this.addEndpoints();
  // console.log(this.element);

}
}
