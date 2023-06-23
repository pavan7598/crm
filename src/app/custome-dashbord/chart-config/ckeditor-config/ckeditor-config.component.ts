import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ckeditor-config',
  templateUrl: './ckeditor-config.component.html',
  styleUrls: ['./ckeditor-config.component.scss']
})
export class CkeditorConfigComponent implements OnInit {
  dataConf: any;
  config = {
    height: 150,
    extraPlugins : 'colorbutton,justify,font',
    //Configure your file manager integration. This example uses CKFinder 3 for PHP.
    filebrowserBrowseUrl: 'http://localhost:3500',
    filebrowserImageBrowseUrl: 'http://localhost:3500/browse',
    filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
    filebrowserImageUploadUrl: environment.baseUrl_connection + '/api/upload/upload'
  }
  constructor(private toastr: ToastrService, private dialogRef: MatDialogRef<CkeditorConfigComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.dataConf = data.conf;
  }
  valu: any;
  ngOnInit() {
      this.valu = this.dataConf.value;
  }
  apply() {
    // console.log(",this.dataConf.value----valu>",this.valu)
    let old: any = {value:this.dataConf.value,type : 'text'}
    if (this.dataConf.value != '') {
      this.dataConf = {};
      this.dialogRef.close({ opt:old, dragdata: {} });
    } else {
      this.toastr.error("Please fill all field", '')
    }
  }
  close() {
    this.dataConf.value = this.valu;
    this.dialogRef.close({ opt: this.dataConf, dragdata: {} });
  }

}
