import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class FilterElementTransferService {
  public filterDragPlaceholder:  any;
  public connectContainers:  Array<CdkDropList>;
  dropListContainer =  new Subject<CdkDropList[]>();
  constructor() { }
  filterDragStart(expressionObject) {
    this.filterDragPlaceholder = expressionObject;
  }
  getPlaceholder()
  {
    return this.filterDragPlaceholder;
  }
  containerList() {
    return this.dropListContainer;
  }
  sendContainer() {
    this.dropListContainer.next(this.connectContainers);
  }
  onContainerCreate(list): Number {
    this.connectContainers.push(list);
    this.sendContainer();
    return this.connectContainers.length;
  }
  filterElemetDropped(currentFilterObject,  prevIndx, currentIndx) {
    // console.log(`Elements ------------`,  this.filterDragPlaceholder, currentFilterObject.expression);
    transferArrayItem(this.filterDragPlaceholder,
      currentFilterObject.expression,
      prevIndx,
      currentIndx);
  }

}
