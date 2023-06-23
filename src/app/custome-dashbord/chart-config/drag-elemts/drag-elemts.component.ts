import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-drag-elemts',
  templateUrl: './drag-elemts.component.html',
  styleUrls: ['./drag-elemts.component.scss']
})
export class DragElemtsComponent implements OnInit {
  @Input() conflist: any;
  placeholder: any; elementMap: any;
  constructor() { }
  tempconf: any;
  @Output() dragConfig = new EventEmitter();

  ngOnInit() {
    // console.log('====>conflist==draggg>',this.conflist);
    if(this.conflist && this.conflist.type!=undefined){
      this.conflist=this.conflist;
    }else{
      // this.conflist=this.conflist.configList;
      this.dragElements(this.conflist,this.conflist,this.conflist)
    }
    this.placeholder = {
      "all": `Drag elements here `,
      "xmet": `Drag measures here`,
      "ymet": `Drag measures here`,
      "xdim": `Drag dimensions here`,
      "ydim": `Drag dimensions here`,
    }
    this.elementMap = {
      "all": "all",
      "xmet": `Metrics`,
      "ymet": `Metrics`,
      "xdim": `Dimension`,
      "ydim": `Dimension`,
    }
  }
  dragElements(ev: any, item: any,conList:any) {
    if(conList){
    this.dragConfig.emit(this.conflist);
    return;
    }
    if (!this.tempconf){
    this.tempconf = JSON.parse(JSON.stringify(this.conflist));
    }else if(this.tempconf && (this.conflist.type != this.tempconf.type)){
      this.tempconf = JSON.parse(JSON.stringify(this.conflist));
    }

    if (this.tempconf && (this.conflist.type == this.tempconf.type)) {
        this.tempconf.list[item][item] = ev;
    } 
    this.dragConfig.emit(this.tempconf);
    // console.log('====>tempconf==>',this.tempconf);
  }
}
