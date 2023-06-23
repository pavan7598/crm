import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from '../../../connection.service';
import { LayersService } from '../../../layers.service';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {
  @Input() dataID;
  @Input() tableList:Array<any>;
  displayList:Array<any> = [];
  elements;
  ExpandedIndex ;
  constructor(
    private connectionservice:  ConnectionService,
    private layerService: LayersService
    ) { }
  displayColumns  = false;
  displayTables(config) {

    }
    addToContainer(event,name,id) {
      event.stopPropagation();
      this.layerService.layerContainer$.next({name, id});
      this.connectionservice.tableAdding$.next(true);
    }
    // touggelColumn() {
    //   this.displayColumns = !this.displayColumns  ;
    // }
    getColumns(name,  id, indx) {

      this.ExpandedIndex  = indx;
      this.displayColumns = false;
      //
      this.elements = [];
      //this.touggelColumn();
      this.connectionservice.getEntitiesSchema(id,name).subscribe((data:any)  =>  {
        // console.log(`Loggign the data ---------------`,data);
//        debugger;
        if(data.items)
        {
        this.displayColumns =  true;
        this.elements = data.items[0].elements;
        }
        else{

        }
      });
    }

  ngOnInit() {
    this.applyPagination({length: this.tableList.length,
      pageIndex: 0,
      pageSize: 37,
      previousPageIndex: 1});

    // console.log(this.data);
  }
  applyPagination(ev:PageEvent) {
   // debugger;
    let dlist=[]
    if(ev.pageIndex*ev.pageSize+ev.pageSize<ev.length)
    {
      dlist =this.tableList.slice(ev.pageIndex*ev.pageSize,ev.pageIndex*ev.pageSize+ev.pageSize)
    }
    else
    {
      dlist=this.tableList.slice(ev.pageIndex*ev.pageSize,ev.length)
    }
    if(dlist.length>0)
    {
      this.displayList = dlist;
    }
  }

}
