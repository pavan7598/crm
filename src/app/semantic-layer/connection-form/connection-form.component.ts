import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from '../connection.service';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {
  @Output() connectionSave = new EventEmitter<{savedStatus: boolean,  cancelStatus:  boolean}>();

  test: Boolean = false;
  userName: String;
  SemanticForm: FormGroup;
  edit: boolean;
  editId: String;
  buttonPro = {
    'test-success': false,
    'test-fail': false
  };
  connectionsList:  Array<String> = ['MONGODB',
    'MySQL',
    'POSTGRE',
    'MSSQL',
    'Google Big query',
    'Oracle'];
  constructor(
    private connectionService: ConnectionService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userName = 'test';

  }
  createConnectionObj(simaticForm) {
    return {
      name: simaticForm.name,
      status: 0,
      type: simaticForm.Connection_type,
      params: [{
        connection: {
          database: simaticForm.data_base,
          host: simaticForm.host,
          password: simaticForm.password,
          port: simaticForm.port,
          userName: simaticForm.username,
          type: simaticForm.Connection_type
        },
        packetSize: simaticForm.data_pack_size
      }]
    };

  }
  ngOnInit() {

    this.SemanticForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      Connection_type: new FormControl('', [Validators.required]),
      host: new FormControl('', [Validators.required]),
      port: new FormControl('', [Validators.required]),
      data_base: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      password: new FormControl(''),
      data_pack_size: new FormControl('', [Validators.required])
    });


    const editObject: any  = {};
    if  (this.data) {
    // console.log(`Logging the data in the edit context`);
    // console.log(this.data);
    const param = this.data.eventdata.params[0];
    const connection = param.connection;
    editObject.data_pack_size = param.packetSize;
    editObject.name = this.data.eventdata.name;
    editObject.Connection_type  = this.data.eventdata.type;
    editObject.host = connection.host;
    editObject.port = connection.port;
    editObject.data_base = connection.database;
    editObject.username = connection.userName;
    editObject.password = connection.password;
    this.SemanticForm.setValue(editObject);
    this.edit = true;
    this.editId =  this.data.eventdata._id;
    }

  }
  saveConnection() {
    if (this.SemanticForm.valid) {
      const connectionObject = this.createConnectionObj(this.SemanticForm.value);
      this.connectionService.saveConnection(connectionObject).subscribe((val) => {
        this.connectionSave.emit({savedStatus:  true  , cancelStatus: false});
      }, (err) => {
          this.connectionSave.emit({savedStatus:  true  , cancelStatus: false});
      });
    }
  }
  updateConnection()  {
    ////
    if (this.SemanticForm.valid) {
      const connectionObject = this.createConnectionObj(this.SemanticForm.value);
      this.connectionService.updateConnection(this.editId,  connectionObject).subscribe((val) =>  {
        this.connectionSave.emit({savedStatus:  true  , cancelStatus: false});
      }, (err) => {
        this.connectionSave.emit({savedStatus:  true  , cancelStatus: false});
    });

    }
  }
  connection() {
    const connectionObject = this.createConnectionObj(this.SemanticForm.value);
    this.connectionService.testConnection(connectionObject.params[0].connection).subscribe((d: any) => {
      /*debugger;*/
      if (d.result === 1) {
        this.test = true;
        this.buttonPro = {
          'test-success': true,
          'test-fail': false
        };
        ////
        // this.toastr.success('Success','C');
      } else {
        this.test = false;
        this.buttonPro = {
          'test-success': false,
          'test-fail': true
        };
        this.toastr.error('Faild',d.msg);
      }
    });
  }

}
