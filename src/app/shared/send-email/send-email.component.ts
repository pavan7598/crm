import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { SharedService } from "../shared.services";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  // sendForm: FormGroup;
  imageData
  config =  {
    height: 150,
    // extraPlugins:'font',
    //Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: 'http://localhost:3500',
    filebrowserImageBrowseUrl: 'http://localhost:3500/browse',
    filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
    filebrowserImageUploadUrl: environment.baseUrl_connection+'/api/upload/upload'
  }
  cdk: any = {};
  constructor(public SharedService:SharedService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SendEmailComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.cdk.query=data.name;
    this.imageData = data.data;
    console.log("environment=====>",environment.baseUrl_connection);
  }
  ngOnInit() {
    this.cdk.body = ''
    this.cdk.recipients=[]
  }
  Subject = new FormControl('', [Validators.required])
  Recipients = new FormControl('', [Validators.required, Validators.email])
  send(x: any) {
    if (this.Subject.valid && this.Recipients.valid && x.body && x.recipients!='') {

      this.dialogRef.close();
      if(!this.cdk.query.type&&!this.imageData){
      this.SharedService.SendMailCrux(x).subscribe(d=>{
        this.toastr.success("Email Sent", 'Message');
      })
    }else{
      let m:any={query:x.query.query.query,email:{body:x.body,recipients:x.recipients,image:this.imageData,subject:x.subject}}
      this.SharedService.sendPlayerSelection(m).subscribe(d=>{
        this.toastr.success("Email Sent", 'Message');
      })
    }
    }
    else {
      this.toastr.error("Please fill the fields", 'Message');
    }
  }
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      if(this.Recipients.status == 'VALID'){
        this.cdk.recipients.push(value.trim());
      }else{
        return;
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(res: any): void {
    const index = this.cdk.recipients.indexOf(res);
    if (index >= 0) {
      this.cdk.recipients.splice(index, 1);
    }
  }
}
