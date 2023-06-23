import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-elment',
  templateUrl: './elment.component.html',
  styleUrls: ['./elment.component.scss']
})
export class ElmentComponent implements OnInit {
@Input() element;
@Input() index;
@Output() ondelete = new EventEmitter<any>();
@Output() onedit = new EventEmitter<any>();
elmentAdd$: Subscription;
  constructor() { }
  editElement(ev) {
    this.onedit.emit({  index:  this.index, element:  this.element});
  }
  deleteElement(ev: MouseEvent) {
    ev.stopPropagation();
    // console.log(this.index);
    this.ondelete.emit(this.index);
  }
  ngOnInit() {
    // console.log(`Logging the lemenent -------------`, this.element, this.index);


  }

}
