import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'

import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.sass']
})
export class ProfileupdateComponent implements OnInit {
  ProfileForm:FormGroup = new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    role:new FormControl(''),
    phonenumber:new FormControl(''),
    age:new FormControl(''),
    gender:new FormControl(''),
    profileImage:new FormControl('')
  })
  constructor() { }

  ngOnInit() {
  }

  upDateprofile(){
    console.log('======>update profile',this.ProfileForm);
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}
