import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { UserserviceService } from './../usermodule/userservice.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';
import {SgmentationMethodsService} from './../segmentation/sgmentation-methods.service';
import * as $ from 'jquery';
window['$'] = window['jQuery'] = $; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() side: EventEmitter<any> = new EventEmitter<any>();
  currentuser: any;
  Showmenu:any = false;

  segmentation = false;
  campaignCreation = false;
  menu:string="";
  strletter: any;
  constructor(private router: Router, private userservice: UserserviceService, private segService:SgmentationMethodsService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart){
        this.menu=event.url;   
        if(event.url=='/campaign/segmentation'){
          this.segmentation=true;
        }else{
          this.segmentation=false;
        }

        if(event.url=='/campaign/createCampaign'){
          this.campaignCreation=true;
        }else{
          this.campaignCreation=false;
        }
      }
      if (event instanceof NavigationEnd){
        this.routeForChildMenu();
      }
    })

   }

   menustr:any="campaign";
   routeForChildMenu(){
    console.log("this.router.url",this.router.url);
    if(this.router.url.includes('/campaign/')){
      this.menustr='campaign';
    }else if(this.router.url.includes('/semantic/')){
      this.menustr='semantic';
    }else if(this.router.url.includes('/customerextraction/')){
      this.menustr='customerextraction';
    }
    else if(this.router.url.includes('/reports')){
      this.menustr='reports';
    }
    else if(this.router.url.includes('/dashboard/')){
      this.menustr='dashboard';
    }  else if(this.router.url.includes('/newreports')){
      this.menustr='newreports';
    }
    console.log("this.menu====>",this.menu);
    console.log("this.menustr====>",this.menustr);
   }
  list = [
    { id: 1, name: 'New Project' },
    { id: 2, name: 'My New Project' },
    { id: 4, name: 'test' },
    { id: 5, name: 'Create new project' }
  ];


  logout() {
    window.sessionStorage.removeItem('token');
    
    this.router.navigateByUrl('/');
    let win = (window as any);
      if(win.location.search !== '?loaded' ) {
          win.location.search = '?loaded';
          win.location.reload();
      }
    this.router.navigateByUrl('/user/login');
  }

  AccountSettings() {
    this.router.navigateByUrl('/user/profileupdate');
  }
  menuVal: any = true;
  sidenav() {
    this.menuVal = !this.menuVal;
    console.log('=====>this.ment',this.menuVal)
    this.side.emit('');
  }


  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of list filtered by search keyword */
  public filteredlist: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect',{static:true}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  ngOnInit() {  
    let Usr: any = window.sessionStorage.getItem('currentuser');
    this.currentuser = JSON.parse(Usr)
    this.strletter= this.currentuser.email.substring(1, 0) 
    // set initial selection

    //this.bankCtrl.setValue(this.list[10]);

    // load the initial bank list
    this.filteredlist.next(this.list.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterlist();
      });
  }

  
ngAfterViewInit() {
  this.setInitialValue();
		$('#nav-icon3').click(function(){
		$(this).toggleClass('open');
	});
}

ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}

protected setInitialValue() {
  // this.filteredlist
  //   .pipe(take(1), takeUntil(this._onDestroy))
  //   .subscribe(() => {
  //     // setting the compareWith property to a comparison function
  //     // triggers initializing the selection according to the initial value of
  //     // the form control (i.e. _initializeSelection())
  //     // this needs to be done after the filteredlist are loaded initially
  //     // and after the mat-option elements are available
  //     this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
  //   });
}


protected filterlist() {
  if (!this.list) {
    return;
  }
  // get the search keyword
  let search = this.bankFilterCtrl.value;
  if (!search) {
    this.filteredlist.next(this.list.slice());
    return;
  } else {
    search = search.toLowerCase();
  }
  // filter the list
  this.filteredlist.next(
    this.list.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
  );
}

segmentationRouter(value){
  this.Showmenu = value;
}

}
