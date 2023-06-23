import { Component,OnInit } from '@angular/core';
import { Router, NavigationStart, RouterEvent, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router'
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm-app';
  loading = true
  constructor(private router:Router,private as:AppService){
   
  }

  
    
  ngOnInit(){
    
    let token = window.sessionStorage.getItem('token');
    if(token){
      this.router.events.forEach((event) => {
        if (event instanceof NavigationStart){
  
          console.log("event============>",event.url);
          if(event.url=='/'){
            this.router.navigateByUrl('/reports');
          }
        }
      });
    }else{
      this.router.navigateByUrl('/user/login');

    }

  }
}
