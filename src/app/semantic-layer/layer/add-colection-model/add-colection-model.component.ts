import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-add-colection-model',
  templateUrl: './add-colection-model.component.html',
  styleUrls: ['./add-colection-model.component.scss']
})
export class AddColectionModelComponent implements OnInit {
  //  element id is awuto generated
  create$ = new Subject<any>();
  cancel$ = new Subject<any>();
addCollectionForm =   new FormGroup({
  CreateCollection: new FormControl('', Validators.required)
});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

   }

  ngOnInit() {
    if  (this.data.elementLabel)  {
      //
      this.addCollectionForm.setValue({CreateCollection:  this.data.elementLabel});
    }
  }

  create(form)  {
    this.create$.next(form.value);
   // console.log('-------------->',form);
  }
  cancel()
  {
    this.cancel$.next();
  }
}
