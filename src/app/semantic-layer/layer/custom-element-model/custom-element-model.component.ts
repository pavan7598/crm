import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { element } from 'protractor';
@Component({
  selector: 'app-custom-element-model',
  templateUrl: './custom-element-model.component.html',
  styleUrls: ['./custom-element-model.component.scss']
})
export class CustomElementModelComponent implements OnInit {
folders:any;
aggrigations = [
  { value: 'value', viewValue: 'value' },
  { value: 'sum', viewValue: 'sum' },
  { value: 'avg', viewValue: 'avg' },
  { value: 'min', viewValue: 'min' },
  { value: 'max', viewValue: 'max' },
  { value: 'count', viewValue: 'count' }
];
customeElementForm = new FormGroup({
  Collection: new FormControl(null,Validators.required),
  Aggrigation:  new FormControl(false,Validators.required),
  ElementLabel: new FormControl('',Validators.required)
})

psMainObj: any = {
  name: "",
  type: "",
  expressions: {
    expressions: []
  }
};
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {



    this.folders = data;

    // data.push({
    //   "elementLabel": "Value",
    //   "elementRole": "folder",
    //   "elementID": "valueelement",
    //   "editing": true,
    //   "elements": [
    //     {
    //       "elementID": "valueelement",
    //       "elementName": "",
    //       "elementType": "valueelement",
    //       "visible": true,
    //       "elementLabel": "Value Element",
    //       "data_type": "valueelement",
    //       "datasourceID": "valueelement",
    //       "collectionID": "valueelement",
    //       "collectionName": "valueelement",
    //       "description": "valueelement",
    //       "elementRole": "valueelement",
    //       "fixedelement": false
    //     }
    //   ]
    // });

  }
  addElement()  {
console.log('this.customeElementFormthis.customeElementFormthis.customeElementFormthis.customeElementForm')
console.log(this.customeElementForm.value.Collection.elements.push({
  "elementID": "custom-id",
  "elementName": this.psMainObj.expressions ,
  "elementType": "Number",
  "visible": true,
  "elementLabel": "Label",
  "data_type": "Number",
  "datasourceID": "custom",
  "collectionID": "valueelement",
  "collectionName": "custom",
  "description":this.psMainObj.expressions,
  "elementRole": "custom",
  "fixedelement": false
}));
console.log(this.psMainObj.expressions);
  }
  aggrigation(ev){
    if(ev.checked)
    {
      this.customeElementForm.addControl('AggFunction',new FormControl(null,Validators.required));
    }
    else  {
      this.customeElementForm.removeControl('AggFunction');
    }
  }
  ngOnInit() {
    console.log('Printing Objects in Custom Element');
    console.log(this.data);
  }
  addToelements($event) {
    ////
    // debugger;
    setTimeout(() => {
      this.psMainObj.expressions.expressions[0] = $event;
    });

    this.psMainObj.expressions.conjunction = undefined;
  }

  clear(){
    
  }

}
