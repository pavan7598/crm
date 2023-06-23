import { Component, OnInit, Input,AfterViewInit, OnDestroy } from '@angular/core';
import { LayersService } from '../../layers.service';
import { ConnectionService } from '../../connection.service';
import { JsPlumbService } from '../../js-plumb.service';
import { jsPlumb, jsPlumbInstance,ConnectParams } from 'jsplumb';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { JoinsModelComponent } from '../joins-model/joins-model.component';
import * as uuid2 from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-layer-container',
  templateUrl: './layer-container.component.html',
  styleUrls: ['./layer-container.component.scss']
})
export class LayerContainerComponent implements OnInit, AfterViewInit,  OnDestroy {
// this component maintains the schema --------------------------------------
@Input() params;
  instance;
  jsPlumbInstance;
  constainerSubscription$:  Subscription;
  reload  = [];
  @Input() onedit:  Subject<any>;
rightJoinType = {
  paintStyle:{cssClass:'Right' },
  overlays: [
    ['Label' , { location: 0.8,  label:  'right',
    labelStyle: {cssClass: 'rightJoinType',
    color:  '#000',
    font: 'bold 14px ER', fill: ' #fff no-repeat fixed center'} }]
]

};
    // left join coniguration -------------------
leftJoinType = {
  paintStyle:{cssClass:'Left' },
  overlays: [
      ['Label' , { location: 0.25,  label:  'left',
      labelStyle: {cssClass: 'leftJoinType',
      color:  '#000',
      font: 'bold 14px ER', fill: ' #fff no-repeat fixed center'} }]
  ]

};
// inner join configuration --------------------
selectedJoin = {
  overlays: [
  ['Label' , { location: 0.5,  label:  'inner',
    labelStyle: {cssClass: 'Inner',
    color:  '#000',
    font: 'bold 14px ER', fill: ' #fff no-repeat fixed center'} }]
]
};

  constructor(private layerService: LayersService,
    private connectionservice:  ConnectionService,
    private jsplumb: JsPlumbService,
    public dialog: MatDialog,
    public jps: JsPlumbService,
    private toastr: ToastrService
    ) {

   }
   findJoinObject(sourceID, targetID) {
    const joins = this.params.joins;
    for (let join of joins)  {
      if  (join.sourceElementID ===  sourceID && join.targetElementID ===  targetID)  {
        return join;
      }
    }
   }
   deleteSchema(schemaId)  {
    this.reload = [];
  const schemaElelst = this.params.schema[schemaId].elements.map(  d =>  {
      return d.elementID;
  });

  const mchJoins = [];
  if(this.params.joins)
  {
  for (let join of  Object.keys(this.params.joins)) {
    for (let ele of schemaElelst)  {
      if  (ele === this.params.joins[join].sourceElementID ||  ele === this.params.joins[join].targetElementID)  {
        mchJoins.push(join);
      }
    }
  }
}

      for (let mc of mchJoins)  {
            this.params.joins.splice(mc ,  1);
      }
  this.params.schema.splice(schemaId ,  1);

this.createJsPlumbInstance();
let tmp =  this.params.schema;
this.params.schema = [];

setTimeout(() => {
  this.params.schema = tmp;
});

this.toastr.error("Table deleted");

// refresh joins
}

checkReload(ev) {
  if  ( this.reload.length === this.params.schema.length  - 1)  {
    this.joinTables();
    this.reload =  [];
} else  {
  this.reload.push(ev);
}
}
   deleteJoin(sourceID, targetID) {

    const joins = this.params.joins;

    for (let join = 0 ; join  <  joins.length;  join++)  {
      if  (joins[join].sourceElementID ===  sourceID && joins[join].targetElementID ===  targetID)  {
        return join;
      }
    }
   }
   makeJoin(sourceID, targetID) {

    if  (!this.params.joins)  {
        this.params.joins = [];
    }

    let found = false;
    //  First verify that the join does not exists
    for (let j in this.params.joins)  {
        if (this.params.joins[j].sourceElementID === sourceID && this.params.joins[j].targetElementID === targetID) {
            found = true;
        }
    }

    if (found === false)  {
            let join: any = {};
            join.joinID = uuid2();

            for (let collection of Object.keys(this.params.schema))  {
                for (let element of Object.keys(this.params.schema[collection].elements)) {
                    if (this.params.schema[collection].elements[element].elementID === sourceID)
                    {
                        join.sourceElementID = this.params.schema[collection].elements[element].elementID;
                        join.sourceElementName = this.params.schema[collection].elements[element].elementName;
                        join.sourceCollectionID = this.params.schema[collection].collectionID;
                        join.sourceCollectionName = this.params.schema[collection].collectionName;

                    }

                    if (this.params.schema[collection].elements[element].elementID === targetID)  {
                        join.targetElementID = this.params.schema[collection].elements[element].elementID;
                        join.targetElementName = this.params.schema[collection].elements[element].elementName;
                        join.targetCollectionID = this.params.schema[collection].collectionID;
                        join.targetCollectionName = this.params.schema[collection].collectionName;

                    }
                }
            }


            if (join.sourceElementID && join.sourceCollectionID && join.targetElementID && join.targetCollectionID) {
                join.joinType = 'default';
                this.params.joins.push(join);

            }
        return join;
    }

   }
   joinTables()  {
    //  console.log(this.params.joins);
     if(this.params.joins)  {
    for (let join of this.params.joins)  {

         let connection = this.jsPlumbInstance.connect({
          source: join.sourceElementID,
          target: join.targetElementID,
          anchor: ['Right',  'Left'],
          filter: 'div',
          filterExclude:  true,
          endpoint  : [  'Rectangle', { width: 1, height:  1 }],
          connectorStyle : { stroke:  '#666', strokeWidth: '1px' },
          connector:[ 'Bezier', { curviness:  100 }, {
            cssClass:'LineStyle'
        } ],
          maxConnections: -1
      });
      if  (join.joinType === 'right')  {
        connection.setType('right');
      } else if (join.joinType === 'left') {
        connection.setType('left');
      } else  {
        connection.setType('selected');
      }

  }
}
}

  ngOnInit() {
    console.log("naresh*********8",this.onedit,this.params)
    this.layerService.layerContainer$.subscribe((data): any  =>  {
      //
      console.log("datatat======>",data.name)
       this.connectionservice.getEntitiesSchema(data.id,  data.name).subscribe((elemetData: any): any => {
         //

        if  (elemetData.result === 1 )  {
          for (let i of Object.keys(elemetData.items)) {
              elemetData.items[i].datasourceID = data.id;
              for (let e of Object.keys(elemetData.items[i].elements))  {
                  elemetData.items[i].elements[e].datasourceID = data.id;
                  elemetData.items[i].elements[e].collectionID = elemetData.items[i].collectionID;
                  elemetData.items[i].elements[e].collectionName = elemetData.items[i].collectionName;
              }
              this.params.schema.push(elemetData.items[i]);
          }
          this.connectionservice.tableAdding$.next(false);
         this.toastr.success('Table added',elemetData.items[0].collectionName,{timeOut: 1});

        }
       });
    });
    this.onedit.subscribe(data =>  {
      console.log("data------>",data)
      // setTimeout(() =>  {
      //   this.joinTables();
      // });
    });

  }
ngOnDestroy() {
 // this.constainerSubscription$.unsubscribe();
}
openJoinModel(connection) {
  const join = this.findJoinObject(connection.sourceId,  connection.targetId);
  const dialogIns = this.dialog.open(JoinsModelComponent, {data:  join,width:'800px'});

  dialogIns.componentInstance.delete.subscribe(() =>  {
    //

    const joinID = this.deleteJoin(connection.sourceId,  connection.targetId);
    if(joinID !== undefined)  {
    this.params.joins.splice(joinID ,  1);

    }
    this.jsPlumbInstance.deleteConnection(connection);
    dialogIns.close();
      });
      dialogIns.afterClosed().subscribe(()  =>  {
        // console.log(join);
        if(connection.connector ===  null)  {
          return;
        }
        if  (join.joinType  ===  'default') {
          connection.setType('selected');
        }
      });
  dialogIns.componentInstance.typeChanged.subscribe((type)  =>  {
    // const connections = this.jsPlumbInstance.getAllConnections();
    // console.log(`Loggign all the connectoions -------------------------`);
    // console.log(connections[0]);

    if  (type === 'right')  {
      connection.setType('right');
    } else if (type === 'left') {
      //
      connection.setType('left');
    } else  {
      connection.setType('selected');
    }
  });
}
createJsPlumbInstance() {
  this.jsPlumbInstance = jsPlumb.getInstance();
  this.jsPlumbInstance.registerConnectionType('right', this.rightJoinType);
    this.jsPlumbInstance.registerConnectionType('left', this.leftJoinType);
    this.jsPlumbInstance.registerConnectionType('selected', this.selectedJoin);
  this.jsPlumbInstance.makeSource('Source', {
  });
  this.jsPlumbInstance.bind('click', (connection,  originalEvent) =>  {
    this.openJoinModel(connection);

  });

  this.jsPlumbInstance.bind('dblclick', (connection,  originalEvent) =>  {
  });

this.jsPlumbInstance.bind('connectionDragStop', (connection) => {
  const join = this.makeJoin(connection.sourceId,  connection.targetId);
  //  this.dialog.open(JoinsModelComponent, {data:  join});
  this.openJoinModel(connection);
});
if  (this.params.schema.joins)  {
  // console.log(`Logggig ng the joins ----------------`);
  // console.log(this.params.schema.joins);
  // console.log(this.params);
}
}
  ngAfterViewInit() {
    this.createJsPlumbInstance();


  }

}

