import { Component, OnInit,Inject,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrls: ['./confim-dialog.component.scss']
})
export class ConfimDialogComponent implements OnInit {
  @Input() pData:any
  
  constructor(public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any) {}
    onNoClick(ev:any): void {
      this.dialogRef.close(ev);
    }
    ngOnInit(){ }
 
}