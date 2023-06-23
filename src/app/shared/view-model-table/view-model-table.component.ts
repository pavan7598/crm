import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-model-table',
  templateUrl: './view-model-table.component.html',
  styleUrls: ['./view-model-table.component.scss']
})
export class ViewModelTableComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewModelTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // console.log("data-===>",this.data);
  }

}
