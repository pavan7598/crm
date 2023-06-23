import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-count-info',
  templateUrl: './count-info.component.html',
  styleUrls: ['./count-info.component.scss']
})
export class CountInfoComponent implements OnInit {
objectKeys;
dataSet;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {

   }

  ngOnInit() {
    this.objectKeys = Object.keys(this.data);
    this.dataSet = this.data;
    ////
    // console.log(JSON.stringify(this.data));
  }

}
