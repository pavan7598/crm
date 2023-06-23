import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.scss']
})
export class SegmentationComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  query:any = [{addIcon:true,deleteIcon:false}]
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit() {

  }

  Add(){
    this.query[this.query.length -1].addIcon = false;
    this.query[this.query.length -1].deleteIcon = true;
    this.query.push({addIcon:true,deleteIcon:false});
  }

  remove(index){
   console.log('index====>',index)
   this.query.splice(index,1)
  }

  cancelsegments(){
   this.cancel.emit(false);
  }

  save(){
   this.cancel.emit(false);
  }

}
