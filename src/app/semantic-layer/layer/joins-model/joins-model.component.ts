import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-joins-model',
  templateUrl: './joins-model.component.html',
  styleUrls: ['./joins-model.component.scss']
})
export class JoinsModelComponent {
source: String;
target: String;
type: String;
public delete = new Subject<any>();
public typeChanged = new Subject<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    //
    this.source = this.data.sourceCollectionName;
    this.target = this.data.targetCollectionName;
    this.type = this.data.joinType;
    //
  }
  deleteJoin()  {
    this.delete.next();
  }
  join(type)  {
    this.type = type;
    this.data.joinType = type;
    this.typeChanged.next(type);
  }
}
