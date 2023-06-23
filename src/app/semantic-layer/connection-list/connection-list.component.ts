import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { ConnectionService } from '../connection.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.scss'],
  animations: [
    trigger('slideStatus', [
      state('active', style({})),

      transition('* => active', [
        animate('3s', keyframes([
          style({ opacity:  .1, offset: 0}),
          style({ opacity:  1, offset: 0.8}),
        ])),
      ])
  ])]
})
export class ConnectionListComponent implements OnInit {
  connections:  Array<any>  = [];
  connectionsDisp:  Array<any>=[];
  @Input() refreshList: Observable<any>;
  @Output() onedit = new EventEmitter<any>();
  constructor(private connectionService:  ConnectionService) {
   }
loadConnectionList()  {
  this.connectionService.getConnectionList().subscribe((data: any) => {
    this.connections = data.items;
    this.applyPaginationToData(1, 3, this.connections.length);
  });
}
applyPaginationToData(index,  size, total) {
  if(size >=  total)  {
    this.connectionsDisp  = this.connections;
  } else  {
    this.connectionsDisp  = this.connections.slice(index  * size, (index  * size  + size));
  }

}
cardClicked(conn) {
  this.onedit.emit(conn);
}
paginationChanged(event)  {
  // console.log(`Logging the event --------------`, event);
  this.applyPaginationToData(event.pageIndex, event.pageSize,  this.connections.length);
}
  ngOnInit() {
    this.loadConnectionList();
    this.refreshList.subscribe((data) =>  {
      // console.log(`Subscribe is called -------------`);
      this.loadConnectionList();
    });
  }

}
