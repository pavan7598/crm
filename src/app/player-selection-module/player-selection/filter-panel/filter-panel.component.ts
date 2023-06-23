import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output, DoCheck, HostListener } from '@angular/core';
import { element } from 'protractor';
import { FilterElementTransferService } from './filter-element-transfer.service';
import { PlayerSelectionService } from '../player-selection.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit , AfterViewInit,DoCheck {
@Input()
expressions: any;
@Input() containerIndex;
cplaceholder = false;
eplaceholder = false;
cplaceholderData  = {};
eplaceholderData  = {};
dropRejected = false;
panelId:any;
placeholderdata:any;
@HostListener('dragleave',['$event']) removePlaceholder(ev) {

this.placeholderdata = undefined;

}
@Output() passData=new EventEmitter<any>();

  constructor( private fet: FilterElementTransferService,
    public playerSelectionService:PlayerSelectionService) {


   }

   ngDoCheck(){
    // console.log("this.expressions==>",this.expressions);
     //console.log("this.expressions.length==>",this.expressions.length);
     if(this.expressions.expressions.length==0){
      this.playerSelectionService.playerSelection=false;
     }
    for (let element of this.expressions.expressions) {
      //console.log("element operator====>",element.operator);
      //console.log("element value====>",element.value2);
//      debugger
      if(!(element.value && element.operator) && element.value!=0){
        this.playerSelectionService.playerSelection=true;
       console.log("mmm=>",element.value);
        break;
      }else if((((element.operator=='notBetween' || element.operator=='between')) && !(element.value2))){
        this.playerSelectionService.playerSelection=true;
        //console.log("mmm=>");
        break;
      }else{
        this.playerSelectionService.playerSelection=false;
      }
    };

   }

  containerDragOver(ev) {

      ev.preventDefault();
      ev.stopPropagation();
     // console.log('---------',this.fet.filterDragPlaceholder);
      // if(!this.placeholderdata){
      //  this.placeholderdata  = JSON.parse(this.fet.filterDragPlaceholder);
      // }
  }
  addToelements($event) {
//    debugger;
    this.expressions.expressions  = this.expressions.expressions.concat($event).filter(d=>{
      if(d.conjunction)  {
        if(d.expressions.length === 0) {
          return false;
        }
      }
      return true;
    });

  }
  containerDrop(ev) {
    this.placeholderdata=undefined;
      ev.stopPropagation();
    // console.log(`dropped on the container----------`,this.expressions);
    const transferedData  = JSON.parse(ev.dataTransfer.getData('data'));
    transferedData.containerId = this.panelId;
    this.expressions.expressions.push(transferedData);
    if(this.expressions.expressions.length>1)
    {

      this.expressions.conjunction='AND';
    }


  }
elementDragOver(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    // ev.stopPropagation();
}
addDataTransfer(event:  DragEvent,  ele:  any,  indx) {
  ele.isfilter  = true;
  ele.containerId = this.panelId;
  event.dataTransfer.setData('data',  JSON.stringify(ele));
}
changeConjunction() {
if  ( this.expressions.conjunction ===  'AND') {
  this.expressions.conjunction =  'OR';
} else  {
  this.expressions.conjunction =  'AND';
}
}
removeEle(i)  {
  if  (this.dropRejected) {
    this.dropRejected = false;
    // console.log('same container check elementDrop');
    return;
  }
  this.expressions.expressions.splice(i, 1 );
  this.expressions.expressions=this.expressions.expressions.filter(d=>{
    if(d.conjunction)  {
      if(d.expressions.length === 0) {
        return false;
      }
    }
    return true;
  })

  if  (this.expressions.expressions.length  === 1)  {
      const currentData = this.expressions.expressions[0];
      this.expressions.expressions  = [];
      this.passData.emit( currentData );


  }
//  debugger;

}
elementDrop(ev: any, index) {
// debugger;
  if  (!ev.toAdd) {
    this.dropRejected = true;
    // console.log('same container check elementDrop');
    return;
  }

  this.dropRejected = false;
  let droppedEle = this.expressions.expressions.splice(index, 1 );
  let addObject = this.expressions.expressions
  .splice(index, 0, {conjunction: 'AND' , expressions: [droppedEle[0], ev.data]});
}
drop(ev)  {
// console.log(`CDK Drop event --------------->`,ev);
}
showPlaceholderContainer()  {
// console.log(`Logging the Drop on element`);
}
showPlaceholderElement()  {

}

  ngOnInit() {
    this.panelId = new Date().getTime();
  }
  ngAfterViewInit(){

    //this.expressions.;
  }



}
