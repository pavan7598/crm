import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ElementModelComponent } from '../../../element-model/element-model.component';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit ,  OnDestroy {
@Input() data;
@Input() allObjects;
@Input() showdelete;
@Input() index;
@Output() oncollectionDelete  = new EventEmitter();
@Output() oncollectionEdit  = new EventEmitter();
elmentAdd$: Subscription;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.data);
  }
  editCollection(){
    this.oncollectionEdit.emit(this.data);
  }
  elementDelete(elemetIndex) {
    this.data.elements.splice(elemetIndex, 1);
  }
  deleteCollection()
  {
this.oncollectionDelete.emit(this.index);
  }
  elementEdit(edata) {
    //
    // console.log('edit element is cilcked ');
    const dlref = this.dialog.open(ElementModelComponent, {data: {object: this.allObjects,
      element: this.data.elements[edata.index],
       edit: {
          dataele:  edata.element,
          folder: this.data.elementLabel,
          eleIndex: edata.index
        }}});
    this.elmentAdd$ = dlref.componentInstance.elementAdded$.subscribe((data:  any)  =>  {
    // console.log(`Loggign the data in the element `, data);
    dlref.close();
    });
  }
  ngOnDestroy() {

  }
}
