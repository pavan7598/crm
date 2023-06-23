import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-element-model',
  templateUrl: './element-model.component.html',
  styleUrls: ['./element-model.component.scss']
})
export class ElementModelComponent implements OnInit {
objects:  any;
selectedElem: any;
elementAdded$ =  new Subject<any>();
delIndex:Number;
// visible=false;
// fixedelement=false;
editSorceollection:any;
aggrigations = [
    { value: 'value', viewValue: 'value' },
    { value: 'sum', viewValue: 'sum' },
    { value: 'avg', viewValue: 'avg' },
    { value: 'min', viewValue: 'min' },
    { value: 'max', viewValue: 'max' },
    { value: 'count', viewValue: 'count' }
  ];
  castObjects=[{ value: 'Date', viewValue: 'Date' },{ value: 'decimal', viewValue: 'Decimal' }]
  addElementForm = new FormGroup({
    elementname: new FormControl('', Validators.required),
    CollectionName: new FormControl('', Validators.required),
    chooseFunction: new FormControl('', Validators.required),
    mouseovertext: new FormControl('', Validators.required),
    visible:  new FormControl(false),
    fixedElement: new FormControl(false),
    Cast: new FormControl(false),
    CastValue:new FormControl(''),
    dispatchElement:new FormControl(false),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // debugger
    this.selectedElem = JSON.parse(JSON.stringify(data.element));
    /*debugger;*/
    if(this.selectedElem.data_type  === 'text'    ||
      this.selectedElem.data_type ===   'string'  ||
      this.selectedElem.data_type ===   'date'    ||
      this.selectedElem.data_type ===   'timestamp'||
      this.selectedElem.data_type ===   'varchar') {
      this.aggrigations  = [{ value: 'value', viewValue: 'value' }];

    }
    this.objects = data.object;
    if  (data.edit) {
      this.delIndex = data.edit.eleIndex;
      const formValues = {
        elementname : data.edit.dataele.elementLabel,
        mouseovertext:  data.edit.dataele.description,
        chooseFunction: data.edit.dataele.elementType,
        visible:  data.edit.dataele.visible ||  false,
        fixedElement: data.edit.dataele.fixedelement || false,
        dispatchElement:data.edit.dataele.dispatchElement || false,
        Cast:data.edit.dataele.cast || false,
        CastValue:data.edit.dataele.castvalue||null,
        CollectionName: this.objects.filter(  d =>  {
          return d.elementLabel === data.edit.folder;
        })[0],
      }
      //debugger;
      this.addElementForm.setValue(formValues);
      //debugger;
      this.editSorceollection = formValues.CollectionName;
    }
      }

  ngOnInit() {

  }
    create(form)  {
      /*debugger;*/
      this.selectedElem.elementLabel = form.value.elementname;
      this.selectedElem.description =  form.value.mouseovertext;
      this.selectedElem.elementType =  form.value.chooseFunction;
      this.selectedElem.elementRole = form.value.chooseFunction === 'value' ? 'dimension' : 'metric';
      this.selectedElem.visible = form.value.visible;
      this.selectedElem.fixedelement = form.value.fixedElement;
      this.selectedElem.dispatchElement = form.value.dispatchElement;
      this.selectedElem.cast=form.value.Cast;
      this.selectedElem.castvalue=form.value.CastValue;
      this.selectedElem.data_type=form.value.Cast?'Date':this.selectedElem.data_type
      if  (this.delIndex  !==  undefined) {
        this.editSorceollection.elements.splice(this.delIndex,1);
      }
      form.value.CollectionName.elements.push(this.selectedElem);
      this.elementAdded$.next();
    }
    close() {
      this.elementAdded$.next();
    }
}
