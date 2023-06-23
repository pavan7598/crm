import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { UserserviceService } from '../usermodule/userservice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import { FormControl} from '@angular/forms';
import {MatSnackBar,  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
  import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
  import * as moment from 'moment';
  import { Label, SingleDataSet } from 'ng2-charts';
  import { Data } from '../data';
import { stat } from 'fs';
  

@Component({
  selector: 'app-viewcampaign',
  templateUrl: './viewcampaign.component.html',
  styleUrls: ['./viewcampaign.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' ,display:'none'})
      ),
      state('isExpanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'isExpanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ViewcampaignComponent implements OnInit {
  toggleActivated3:boolean=false ;
  data: Data[];
  year = [];
  count = [];
  len:number;
  [x: string]: any;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  @ViewChild('outerSort', { static: true })
  sort!: MatSort;
  loading=true;
  @ViewChildren('innerSort')
  innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables')
  innerTables!: QueryList<MatTable<Address>>;
  dataSource!: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['CampaignName', 'Message', 'Contacts'];
  innerDisplayedColumns = ['Name', 'Contact', 'whatsappStatus', 'TextStatus'];

//email camapaign




  // expandedElement!: User | null;

// pagesize=10;
// currentPage=0;


// doughnutchart
// onPageChange(event:any){
//   this.dataSource.paginator.pageIndex = event.pageIndex;
//   this.dataSource.paginator.pageSize = event.pageSize;

// }

 
  //doughnut chart
  public doughnutChartLabels = ['read', 'sent','failed','NotStarted'];
  public doughnutChartData = [10, 50, 40];
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ['#4265ED', '#65ed42', '#ff8080'],
      borderColor: ['#4265ED', '#65ed42', '#ff8080']
    }
  ];
  public doughnutChartLabels2 = ['sent', 'delivered','failed', 'NotSent'];
  public doughnutChartData2 = [10, 50, 40];
  public doughnutChartColors2: any[] = [
    {
      backgroundColor: ['#4265ED', '#909090', '#ff8080'],
      borderColor: ['#4265ED', '#909090', '#ff8080']
    }
  ];





  USERS: any = []

  
  @ViewChild(MatPaginator,{static:true})
  Paginator1!: MatPaginator;
//   @ViewChild(MatPaginator,{static:true})
// paginator2:(MatPaginator);

// @ViewChild('paginator', { static: true }) public paginator: MatPaginator;
// @ViewChild('paginator2', { static: true }) public paginator2: MatPaginator;



  constructor(
    private api:UserserviceService,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) { }



 
  ngOnInit() {
    this.showCampaign();
    

  }


  

  
expandCollapse(row) {
  console.log("exp")
  if (row.isExpanded) {
    row.isExpanded = false;
    console.log("expf")
  } else {
    row.isExpanded = true;
    console.log("expt")
  }
}
  toggleRow(i) {
    // element.addresses && (element.addresses as MatTableDataSource<Address>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    // this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
  }

//   onInnerPageChange(event:PageEvent) {
//     console.log(event, "event")
//     let org=this.dataSource1
  
//     this.pageSize = +event.pageSize; // get the pageSize
//     this.currentPage = +event.pageIndex + 1; // get the current page
//     this.datasouce1.number.length( org,this.currentPage,this.pageSize).subscribe((res: any) => {
//       console.log(res,"pageevent")
//       this.reportsdata = res.result.Reports;
//       this.postlength = res.result.totalCount;

// })
// }
  item(element){
    this.campaignIdForRefresh = element.id;
    let obj = {
      id: element.id 
    }
    this.api.getAllCampaignContacts(obj).subscribe((res: any) => {
      this.isExpanded = false
      this.expantable = res.details;
      console.log(this.expantable, "ghjhg")
      this.notstartedcontacts=this.expantable.filter((status)=>status.status=='Not Started').length
  this.successfulContacts=this.expantable.filter((status) => status.status == 'sent' || status.status == "sent ").length;
  this.readMessages=this.expantable.filter((status) => status.status ==  'read' || status.status ==  "read ").length;
  this.unsuccessfullContacts=this.expantable.filter((status) =>status.status == null).length;
console.log(this.unsuccessfullContacts,"unsucc")
 
  this.doughnutChartData = [];
  this.doughnutChartData.push(this.notstartedcontacts);
  this.doughnutChartData.push(this.readMessages);
  this.doughnutChartData.push(this.successfulContacts);
  this.doughnutChartData.push(this.unsuccessfullContacts);

  console.log(this.doughnutChartData, "dod")
  this.notsentMess=this.expantable.filter((status) =>status.sms_status == 'not sent').length;
this.successfulMess=this.expantable.filter((status) =>status.sms_status == 'delivered').length;
this.sentMess=this.expantable.filter((status)=>status.sms_status == "sent").length;
this.failedMess=this.expantable.filter((status) => status.sms_status == 'error'|| status.sms_status == null ).length;
console.log(this.successfulMess, "dream")

this.doughnutChartData2=[];
this.doughnutChartData2.push(this.notsentMess)
this.doughnutChartData2.push(this.successfulMess)
this.doughnutChartData2.push(this.sentMess)
this.doughnutChartData2.push(this.failedMess)
console.log(this.doughnutChartData2, "pear")
  console.log(this.successfulContacts,"hghjkjhg")
      // this.expantable = this.result.filter((item: any) => item.id == element.id)
      console.log(this.expantable,"data")
      this.customers =  this.expantable;
      console.log(this.customers,'cust')
      this.len = this.customers.length
      this.dataSource1 = new MatTableDataSource(this.expantable);
      // this.dataSource1.sort = this.sort;
      // this.customers.paginator=this.paginator2
      // console.log(this.paginator2,"paginator2")
      console.log(this.customers,"dataSource1")

      // this.dataSource1length=this.dataSource1.length;
      // console.log( this.dataSource1length," this.dataSource1length")
      // this.dataSource1length.paginator2=this.paginator2;
    })

    // this.dataSource = new MatTableDataSource(this.result);
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator=this.Paginator1;
     // isExpanded: false,
  }



showCampaign(){
 
 this.api.camapaignDetails().subscribe((res:any) =>{
  console.log(res, "getCampaigns")
  let temp = [];
  res.details.map((item: any) => {
    let index = temp.findIndex((element: any) => item.id == element.id);
    if (index == -1) temp.push(item) 
  })
  this.result = temp;
  // this.result = res.details;
  console.log(this.result, "result")
 
 
  this.dataSource = new MatTableDataSource(this.result);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator=this.Paginator1;

    // this.dataSource.paginator = this.paginator;
console.log(this.dataSource,"dssss")

console.log(this.Paginator1,"this.Paginator1")
// this.dataSource.paginator=this.paginator2;
 

this.loading=false;
  // this.length = this.user.addresses.length
  console.log(length,"limmmmm")
 }) 
}
sendMessage() {
  // Filter the recipients whose status is not "read" or "send"
  const filteredRecipients = this.expantable.filter((status) => status.status != 'read ' && status.status != 'send ');
  
  // Check if there are any recipients remaining after filtering
  if (filteredRecipients.length > 0) {
    let obj = {
      campaignId: this.campaignIdForRefresh
    }
  
    this.api.whatsappCampaign(obj).subscribe((res: any) => {
      console.log(res, "res");
      if (res.statusCode == 200) {
        this.snackBar.open('Dispatched Successfully!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      } else {
        this.snackbar.open('Dispatched Unsuccessful!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.log(res, 'dispatch')
      }
    });
  } else {
    // Show a message indicating that there are no recipients to send the message to
    this.snackBar.open('No recipients available to send the message!', 'X', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}






// textMessage(){
//   const filtercustomertext = this.expantable.filter((status) =>status.sms_status !=="sent" && status.sms.status !="delivered");
  
//   if(filtercustomertext.length >0) {
//   {
//       let obj = {
//          campaignId: this.campaignIdForRefresh,
//       customerId:this.custumerIdForRefresh
//       }
    
//      this.api.smsCampaign(obj).subscribe((res:any)=>{
//       console.log(res.statusCode,"jes")
   
//      if (res.statusCode == 200) {
//           this.snackBar.open('Dispatched Successfully!', 'X', {
//             duration: 3000,
//             verticalPosition: 'top',
//             panelClass: ['success-snackbar']
//           });
//         } else {
//           this.snackbar.open('Dispatched Unsuccessful!', 'X', {
//             duration: 3000,
//             verticalPosition: 'top',
//             panelClass: ['error-snackbar']
//           });
//           console.log(res, 'dispatch')
//         }
//       });
//     } else {
//       // Show a message indicating that there are no recipients to send the message to
  
//       this.snackBar.open('No recipients available to send the message!', 'X', {
//         duration: 3000,
//         verticalPosition: 'top',
//         panelClass: ['error-snackbar']
//       });
//     }
//   }
  
  
  










// sendMessage(){
//   let obj = {
//     campaignId: this.campaignIdForRefresh
//   }
//   this.api.whatsappCampaign(obj).subscribe((res: any) => {
//     console.log(res, "res");
//     if(res.statusCode == 200){
//       this,this.snackBar.open('Dispatched Successfully!','X',{
//         duration:3000,
//         verticalPosition:'top',
//         panelClass:['success-snackbar']
//       });
//     }
//     else{
//       this.snackbar.open('Dispatched Unsuccessful!','X',{
//         duration:3000,
//         verticalPosition:'top',
//         panelClass:['error-snackbar']
//       });
//       console.log(res,'dispatch')
//     }
//   })
// }
textMessage(){
  let obj ={
    campaignId: this.campaignIdForRefresh,
    customerId:this.custumerIdForRefresh
  }
  this.api.smsCampaign(obj).subscribe((res:any)=>{
    console.log(res.statusCode,"jes")
  if(res.statusCode == 200){
    this,this.snackBar.open('Dispatched Successfully!','X',{
      duration:3000,
      verticalPosition:'top',
      panelClass:['success-snackbar']
    });
  }
  else{
    this.snackbar.open('Dispatched Unsuccessful!','X',{
      duration:3000,
      verticalPosition:'top',
      panelClass:['error-snackbar']
    });
    console.log(res,'dispatch')
  }
  })
}

Messagestatus(){
  let obj = {
    id: this.campaignIdForRefresh
  }

  this.item(obj)
     this.snackBar.open('statusRefresh!', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['success-snackbar']

              });
  

  


}

toggleelementactivity(){
  this.toggleActivated3 = !this.toggleActivated3;
}




}
export interface User {
  CampaignName: string;
  Message: string;
  Contacts: Number;
  addresses?: Address[] | MatTableDataSource<Address>;
}


export interface Address {
  Name: string;
  Contact: string;
  whatsappStatus: any;
  TextStatus:any;
}

export interface UserDataSource {
  CampaignName: string;
  Message: string;
  Contacts: Number;
  addresses?: MatTableDataSource<Address>;
}



