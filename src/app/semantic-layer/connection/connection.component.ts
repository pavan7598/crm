import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConnectionFormComponent } from '../connection-form/connection-form.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  onconnAdd = new Subject<any>();
  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }
  refreshList() {

  }
  openConnectionForm()  {
    const ref = this.dialog.open(ConnectionFormComponent);
    ref.componentInstance.connectionSave.subscribe((data) =>  {
      // console.log('Logging the data from event '  , data);
      // console.log(`---------------------------------------------`);
      this.onconnAdd.next('calling the child');
      ref.close();
    });
  }
  editModel(event) {

    const ref = this.dialog.open(ConnectionFormComponent, {data: {eventdata:  event}});
    ref.componentInstance.connectionSave.subscribe((data) =>  {
      // console.log('Logging the data from event '  , data);
      // console.log(`---------------------------------------------`);
      this.onconnAdd.next('calling the child');
      ref.close();
    });
  }

}
