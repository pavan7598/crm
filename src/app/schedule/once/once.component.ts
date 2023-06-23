import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-once',
  templateUrl: './once.component.html',
  styleUrls: ['./once.component.scss']
})
export class OnceComponent implements OnInit {
  @Input() schedule:any;
  @Output() onceEmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() add_step=new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    
  }
  value:any;
  OnceSelected(){
    if(this.value == undefined || this.value !='once' ){
      let flag_val;
      this.value = 'once'
      this.onceEmit.emit({value:this.value,flag:true})
    }else{
      this.value = undefined
      this.onceEmit.emit({value:this.value,flag:false})
    }
  }
  addStep($event:MouseEvent)
  {
    $event.stopPropagation();
this.add_step.emit()
  }
}
