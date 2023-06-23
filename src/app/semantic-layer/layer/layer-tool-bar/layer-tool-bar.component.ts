import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConnectionService } from '../../connection.service';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddColectionModelComponent } from '../add-colection-model/add-colection-model.component';
import * as uuid2 from 'uuid';
import { CustomElementModelComponent } from '../custom-element-model/custom-element-model.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-layer-tool-bar',
  templateUrl: './layer-tool-bar.component.html',
  styleUrls: ['./layer-tool-bar.component.scss']
})
export class LayerToolBarComponent implements OnInit ,  OnDestroy {
connectionChange$:  Subscription;
tablesList  = [];
dataSorceId:  any;
searchString  = '';
selectedSchema: string;
Schemas:  Array<any> = [];
tableViewList =  [];
schemaViewList = [];
ConnectionError =  false;
@Input() objects;

  constructor(private connectionservice:  ConnectionService,
    private toster:ToastrService,
      public dialog: MatDialog) {
    this.connectionChange$ = this.connectionservice.connectionChangeTrigger$.subscribe((id)  =>  {
      this.tableViewList =  [];
      this.dataSorceId = id;
      if(id)
      {
      this.getElementsFromCollection();
      }
    });
  }
  getElementsFromCollection() {
    this.connectionservice.getElements(this.dataSorceId).subscribe((data: any) =>  {
      /*debugger;*/
      if(data.result==0)
      {
        this.toster.error(data.msg);
      }
      this.tablesList = data.items;
      const setData = new Set();
      if(!this.tablesList){
        return;
      }
      for (  let tables of this.tablesList) {
        setData.add(tables.name.split('.')[0]);
      }

      this.Schemas = Array.from(setData);
      this.selectedSchema = this.Schemas[0];
      this.filterBySchema();
      // this.filterByString();
    });

  }
  ngOnInit() {
  }
  filterBySchema()  {

    this.schemaViewList = this.tablesList.filter((d: any) =>  {
      return d.name.split('.')[0] === this.selectedSchema;
    });

      this.filterByString();


  }
  filterByString()  {
    this.tableViewList=[];
    setTimeout(()=>{
    if  (this.searchString ===  '') {
      this.tableViewList = this.schemaViewList;
      return;
    }
    this.tableViewList = this.schemaViewList.filter((d: any) =>  {
      return (d.name.search(this.searchString) !==  -1);
    });
  },300)
  }
  AddCollection() {

    const dialogRef = this.dialog.open(AddColectionModelComponent, {
      data: {}
    });
    dialogRef.componentInstance.create$.subscribe((data)  =>  {
        const elementID = uuid2();
          const  element: any = {};
          element.elementLabel =  data.CreateCollection;
          element.elementRole = 'folder';
          element.elementID = elementID;
          element.editing = true;
          element.elements = [];
        this.objects.push(element);
        dialogRef.close();
    });
    dialogRef.componentInstance.cancel$.subscribe(d =>  {
      dialogRef.close();
    });
  }
  AddCustomeElement() {
    const dialogRef = this.dialog.open(CustomElementModelComponent, {
      data: this.objects,
      width:"80%",
      height:"80%",


    });
  }
  ngOnDestroy() {
    this.connectionChange$.unsubscribe();
  }
}
