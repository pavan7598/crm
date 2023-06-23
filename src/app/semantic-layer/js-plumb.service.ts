import { Injectable } from '@angular/core';
import {jsPlumb } from 'jsplumb';
import { Subject } from 'rxjs';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class JsPlumbService {
  initilized  = false;
  refreshEndPoint$ = new Subject<any>();
  constructor() {
    // console.log(jsPlumb);
    // console.log($);
  }
  createInstance(layer)  {
    // console.log(jsPlumb);
    // console.log($);

  }
  clearInstance() {

  }
  refreshInstnace() {

  }
}
