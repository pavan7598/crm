import { Component, OnInit,ViewChild,EventEmitter,Output} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, RouterEvent, NavigationCancel, NavigationError } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { SgmentationMethodsService } from '../segmentation/sgmentation-methods.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  segmentation = false;
  campaignSummary= true;
  campaignCreation = false;
  @ViewChild('drawer',{static:true}) drawer:any;
  salb={};
  returnelements=[];
  loading = true
  constructor(private route: ActivatedRoute,private router: Router,public sharedService:SharedService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
    this.sharedService.selected_filter=this.salb;
    router.events.forEach((event) => {
      console.log('================>events',event)
      if (event instanceof NavigationStart){

        if(event.url=='/campaign/segmentation'){
          this.segmentation=true;
        }else{
          this.segmentation=false;
        }
//        debugger;
        if(event.url=='/campaign/createCampaign'){
          this.campaignCreation=true;
        }else{
          this.campaignCreation=false;
        }
//        debugger;
        if(event.url==='/campaign/summary')
        {
         
          this.campaignSummary=true;
        }
        else{
          this.campaignSummary=false;
        }
     
    
      }
    })
   }

   // Shows and hides the loading spinner during RouterEvent changes
   navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }

  ngOnInit() {
    console.log("this.router.url=====>",this.router.url);
    this.sharedService.getElements().subscribe((e:any)=>{
      this.returnelements=e.data;  
    })
  }

  fetch(){
    this.sharedService.matricsRefresh.next(this.salb);
    console.log("salb==========>",this.salb);
  }

  

  sideMenu(event){
   this.drawer.toggle();
  }

  changeRouteDrawer(value){
   this.segmentation = value;
  }
}
