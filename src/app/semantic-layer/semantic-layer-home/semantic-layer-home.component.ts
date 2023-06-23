import { Component, OnInit ,  AfterViewInit} from '@angular/core';

import { MatDialog } from '@angular/material';
import { LayerspropertiesformComponent } from './layerspropertiesform/layerspropertiesform.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
declare var jsPlumb:  any;
@Component({
  selector: 'app-semantic-layer-home',
  templateUrl: './semantic-layer-home.component.html',
  styleUrls: ['./semantic-layer-home.component.scss']
})
export class SemanticLayerHomeComponent implements OnInit ,  AfterViewInit {
  lstrefresh  = new Subject<any>();
  showFiller = false;
  filter="";
  title = 'Angular JsPlumb Integration';
  jsPlumbInstance;
  showConnectionToggle = false;
  buttonName = 'Connect';
  constructor(public dialog: MatDialog,
    private router: Router) {
      // console.log(jsPlumb);
  }
  showConnectOnClick() {
    this.showConnectionToggle = ! this.showConnectionToggle;
    if ( this.showConnectionToggle) {
    this.buttonName = 'Dissconnect';
      this.connectSourceToTargetUsingJSPlumb();
    } else {
      this.buttonName = 'Connect';
      this.jsPlumbInstance.reset();
    }
  }
  editLayer(event:  String)  {
    this.router.navigate(['semantic/layer',  {id : event}]);
  }
  newLayer( ) {
    const dialogRef = this.dialog.open(LayerspropertiesformComponent, {width: '30%'});
    dialogRef.componentInstance.LayerSaved.subscribe((data) =>  {
      this.lstrefresh.next('');
      this.filter='';
      dialogRef.close();
      // GET LAYER OBJECT -------------------
    });
    dialogRef.afterClosed().subscribe((data)  =>  {
      // console.log(`Logging the dialog Ref -----------------------`);
    });

  }
  ngAfterViewInit() {

  }
  connectSourceToTargetUsingJSPlumb() {
    this.jsPlumbInstance = jsPlumb.getInstance();

    let labelName;
      labelName = 'connection';
      this.jsPlumbInstance.connect({
        connector:  [ 'Bezier',
         { curviness: 100 ,
          width:  '1px'},
        {
          cssClass: 'LineStyle'
      } ],
        source: 'Source',
        target: 'Target1',
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#456', strokeWidth: 4},
        overlays: [
          ['Label', {label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel'}]
        ],
      });

      this.jsPlumbInstance.draggable('Target1');
      this.jsPlumbInstance.draggable('Source');
  }
  ngOnInit() {
  }
  applyFilter(e){
   // debugger;
    this.lstrefresh.next(e);
  }
}
