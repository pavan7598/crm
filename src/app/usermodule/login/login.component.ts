import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserserviceService } from './../userservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Loginform: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  loading: boolean;
  constructor(private userservice: UserserviceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    if (!this.Loginform.valid) {
      console.log('----------login not valid')
      this.toastr.error('Enter valid fields');
    } else {
      this.userservice.login(this.Loginform.value).subscribe((res: any) => {
//        debugger;	
this.loading=true;	
        console.log('-------->res==>',res)
        this.loading=false;
        if (res.err == true && res.msg == 'Invalid UserName And Password') {
          this.toastr.error(res.msg);
        } else if (res.err == true && res.msg == 'user not found') {
          this.toastr.error(res.msg);
        } else if (res.error == false && res.jwt) {
            window.sessionStorage.setItem('token', res.jwt);
            window.sessionStorage.setItem('currentuser', JSON.stringify(res.userDetails));
            this.router.navigateByUrl('/campaign/summary');
          }
      })
    }
  }

  register() {
    this.router.navigateByUrl('/user/register');
  }

}
