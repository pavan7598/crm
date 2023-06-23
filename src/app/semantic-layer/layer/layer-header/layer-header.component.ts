import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ConnectionService } from '../../connection.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayersService } from '../../layers.service';
// import {LayerListComponent} from '/src/app/semantic-layer/layer-list/layer-list.component';

@Component({
  selector: 'app-layer-header',
  templateUrl: './layer-header.component.html',
  styleUrls: ['./layer-header.component.scss']
})
export class LayerHeaderComponent implements OnInit {
  @Input() params;
  @Input() currentSelection: any;
  connections: Array<any>;
  connectionNotCreatedFlag = false;
  tableAdding = false;
  @Output() onsave = new EventEmitter<any>();
  name="";
  constructor(
    private connectionservice: ConnectionService,
    private router: Router,
    
    private toster: ToastrService, private layerservice: LayersService ) {
    
    this.connectionservice.tableAdding$.subscribe((d: boolean) => {
      this.tableAdding = d;
      
    })
    
    this.connectionservice
      .getConnectionList()
      .subscribe((data: any) => {
        if (data.items.length == 0) {
          this.connectionNotCreatedFlag = true;
          this.toster.error("Connections are not created Please Create Connection!")
        }
        this.connections = data.items.map((item) => {
        return { name: item.name, id: item._id };
        
          
          
        });
        if (!this.currentSelection) {

          this.currentSelection = this.connections[0].id;
          this.connectionChanged();
        }
      });
  }
  connectionChanged() {
    this.connectionservice.connectionChangeTrigger$.next(this.currentSelection);

  }
  save() {
    this.onsave.emit();
    
  }
  cancel() {


    this.router.navigate(['semantic','semanticLayerHome']);
  }

  
  ngOnInit() {
    this.name=this.layerservice.sendrowname();
  }

}
