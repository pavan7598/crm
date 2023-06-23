import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { UserserviceService } from './../userservice.service';
import {matchingPasswords} from './../../utils/app-validators';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Registerform: FormGroup 
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];
  constructor(private userservice: UserserviceService,
    private formbuilder:FormBuilder,
    private toastr: ToastrService,
    private router:Router) { 
    this.Registerform= this.formbuilder.group({
      // username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cnfpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('user')
    },{validators:matchingPasswords('password','cnfpassword')})
  }

  ngOnInit() {
  }

  register() {
    if (!this.Registerform.valid) {
        this.toastr.error('Invalid fields');
        console.log('register form is not valid',this.Registerform);
    } else {
      console.log('---->register values', this.Registerform)
      this.userservice.register(this.Registerform.value).subscribe(d=>{
        this.toastr.success('Registration successfull');
        this.router.navigateByUrl('/user/login')
      })

    }
  }

  login(){
    this.router.navigateByUrl('/user/login')
  }

}
