import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import {FormControl,Validators} from '@angular/forms'
import {SgmentationMethodsService} from './../../sgmentation-methods.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-slabs-model-box',
  templateUrl: './slabs-model-box.component.html',
  styleUrls: ['./slabs-model-box.component.scss']
})
export class SlabsModelBoxComponent implements OnInit {
  slabName = new FormControl('', [
    Validators.required,
  ]);
 constructor(
   private toastr:ToastrService,
   private SegmentService:SgmentationMethodsService,
  public dialogRef: MatDialogRef<SlabsModelBoxComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  currentUser =JSON.parse(window.sessionStorage.getItem('currentuser'));
  ngOnInit() {
  //  console.log('======>currentUser',JSON.parse(this.currentUser));
  }
  
  Save(){
    if(this.slabName.valid){
      this.data.segmentName = this.slabName.value;
      this.data.createdBy = this.currentUser.email;
      this.SegmentService.saveSegment(this.data).subscribe((d:any)=>{
        this.toastr.success(d.msg);
        this.dialogRef.close();
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }


}
