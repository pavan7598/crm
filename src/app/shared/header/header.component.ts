import { Component, OnInit, ViewChild, EventEmitter, Input, Output, Inject, ApplicationRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// import { UserServiceService } from '../../user-module/user-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('rotated => default', animate('500ms ease-out')),
      transition('default => rotated', animate('500ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  idleState = 'Not started.';
  status:any;
  timedOut = false;
  hasIdled = false;
  state: string = 'default';
  currentdata: any;
  @Input() showMenu: boolean;
  @Input() flag: any;
  @Output() navToggle = new EventEmitter<boolean>();
  toggle: any = false;
  header_two: any;
  log_user_data: any = {};
  UserServiceService: any;
  bottomSheetRef: any;
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  bread_crum: any;
  fullPage: boolean = false;
  constructor( private appRef: ApplicationRef, public dialog: MatDialog,private router: Router 
   , private idle: Idle) {

    // console.log(window.sessionStorage.getItem('token'))
    // if (window.sessionStorage.getItem('token')) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // debugger;
        // event.url='';
        if (event.url === "/login" || event.url === "/register" || event.url === "/landing" || event.url === "/gridPage") {
          this.fullPage = true;
        } else {
          this.fullPage = false;
        }
        if (event.url !== '/campaigncreation' && event.url !== '/campaigncreation;fromPs=true' &&
          event.url !== '/ROIBuilder' &&
          event.url !== '/segmentcatalog' && event.url !== '/campaignefficacy') {
          this.navOpen(true);
          this.showMenu = false;
        } else {
          if (event.url == '/campaigncreation' ||
            event.url == '/ROIBuilder' ||
            event.url == '/segmentcatalog' ||
            event.url == '/campaignefficacy') {
            this.bread_crum = 'Maxigage'
          }
          this.showMenu = true;
          this.navOpen(false);
        }
        setTimeout(() => {
          this.userLog_history(event.url)
        }, 500);
      }
    });
  }
  openBottomSheet:any;
  navOpen(v: any) {
    this.flag = v == true ? false : true;
    this.navToggle.emit(this.flag);

  }
  ngOnInit() {
    if (window.sessionStorage.getItem('token')) {
      this.currentuser_details();
    }

    // this.uss.messageSource.subscribe(d => {
    //   if (d == 'upload' || d == 'login-success') {
    //     this.currentuser_details();
    //   }
    // })
    this.idle_time();
  }

  
  idle_time() {
    this.idle.setIdle(3000);
    this.idle.setTimeout(10);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.onIdleEnd.subscribe(() => {
    this.idleState = `No longer idle.`;
    this.status = { state: this.idleState, active: this.hasIdled };
    console.log('Act-Mon', this.status.state);
    this.appRef.tick();
    });
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.status = { state: this.idleState, active: false };
      this.logout();
    });
    this.idle.onIdleStart.subscribe(() =>{ 
      this.hasIdled = true;
      this.idleState = 'You have gone idle!'
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
    this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false;
    this.status = { state: this.idleState };
  }
  currentuser_details() {
    // this.uss.getCurrentUser().subscribe(d => {
    //   this.currentdata = d;
    // })
    this.idle_time();
  }
  image() {
    this.router.navigateByUrl('/landing');
  }
  logout() {
    this.log_user_data.user_id = this.currentdata._id;
    this.log_user_data.username = this.currentdata.username;
    this.log_user_data.role = this.currentdata.role;
    this.log_user_data.currentpage = 'Logout';
    // this.uss.getUserLogData(this.log_user_data).subscribe(d => { });    
    window.sessionStorage.removeItem("token");
    window.sessionStorage.clear();
    console.log("window.sessionStorage===>",window.sessionStorage.getItem('token'));
    this.router.navigateByUrl('/login');
  }
  accountdetails() {
    this.router.navigateByUrl('/profile');
  }
  userlogs() {
    this.router.navigateByUrl('/userLog');
  }
  userLog_history(ev) {
    if (window.sessionStorage.getItem('token')) {
      if (this.currentdata) {
        let url = (ev).substr(1);
        this.log_user_data.user_id = this.currentdata._id;
        this.log_user_data.username = this.currentdata.username;
        this.log_user_data.role = this.currentdata.role;
        if (url == 'player') {
          url = 'player/catalog';
        }
        if (url == 'customerextraction/player/playerSelection;id=new;type=Player%20Selection') {
          url = 'customerextraction/player/playerSelection';
        }
        if (url == 'customerextraction/player/playerSelection;id=new;type=Segementation') {
          url = 'player/Segementation';
        }
        this.log_user_data.currentpage = url;
        if (url == 'Login' || url == 'logout' || url == 'landing' || url == 'campaigncreation' || url == 'ROIBuilder' || url == 'segmentcatalog' || url == 'campaignefficacy' || url == 'gridPage' || url == 'player' || url == 'connection' || url == 'VipCustomers' || url == 'semanticLayerHome' || url == 'player/catalog' || url == 'customerextraction/player/playerSelection' || url == 'player/Segementation') {
          // this.uss.getUserLogData(this.log_user_data).subscribe(d => {
          // });
        }
      }
    }
  }
}