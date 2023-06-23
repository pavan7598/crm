import { Component, OnInit, ChangeDetectorRef, VERSION, NgZone, ViewChild } from '@angular/core';
import { UserserviceService } from '../usermodule/userservice.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';
import {MatRadioModule} from '@angular/material/radio';
// import { SwiperOptions } from 'swiper';
// import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import {
  MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
// import Swiper from 'swiper';
// import { BehaviorSubject, Observable } from 'rxjs';
// import SwiperCore , {
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Virtual,
//   Zoom,
//   Autoplay,
//   Thumbs,
//   Controller,
// } from 'swiper';
// import { SwiperComponent } from 'ngx-useful-swiper';


// install Swiper components
// SwiperCore.use([
//   Navigation,
//   Pagination,
//   Scrollbar,
//   A11y,
//   Virtual,
//   Zoom,
//   Autoplay,
//   Thumbs,
//   Controller
// ])

@Component({
  selector: 'app-startcampaign',
  templateUrl: './startcampaign.component.html',
  styleUrls: ['./startcampaign.component.scss']

})

export class StartcampaignComponent implements OnInit {
  profileImage: any;
  toggleActivated: boolean = false;
  toggleActivated1: boolean = false;
  contactform: any;
  selectedTemplate: any; // Adjust the type according to your data model
  selectedRowIndex: number = -1;
  // standalone: true;
  text:any;
  name = 'Angular ' + VERSION.major;
  public tableData: any = [];
  public tableTitle: any = [];
  public customPagination = 1;
  public recordsPerPage = 10;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public currentPage = 0;
  newTableData: any = [];
  campaignname: string
  newtabledatalength: any;
  contextname: any;
  templatename:any;
  templatetext:any;
  namesArray: any = [];
  contactsArray: any = [];
  open: any;
  show:any;
  public ContactName: any;
  public ContactNumber: any;
  selectedText: any;
  public ContactEmail: any;
  public EmailAddress:any;
// public Ename:any;
// public EmailId:any;
public EtableData: any = [];
public EtableTitle: any = [];
  public EtableRecords = [];
  public EpageStartCount = 0;
  public EpageEndCount = 10;
  public EtotalPageCount = 0;
  public EcurrentPage = 0;
  public ErecordsPerPage = 10;
  public EcustomPagination = 1;
  EnamesArray: any = [];
  EmailIdArray: any = [];
  EmailTableData: any = [];
  EmailTableDatalength: any;
  EtableDatalength: any;
  EmailtableData: any;
  EmailtableDatalength: any;
  // config: SwiperOptions = {
  //   pagination: { el: '.swiper-pagination', clickable: true },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   spaceBetween: 30
  // };


  // @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  constructor(private api: UserserviceService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.whatsapptempalte()
  }



  // csv file table format for sms and whatsapp campaign

  public uploadData(event: any) {
    if (event.target.files[0] != undefined) {
      console.log(event.target.files[0]);
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(<unknown>event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      reader.onload = (e: any) => {
        this.tableData = [];
        this.tableTitle = [];
        this.namesArray = [];
        this.contactsArray = [];
        this.newTableData = [];
        
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        console.log(data); // Data will be logged in array format containing objects
        this.tableData = data;
        console.log(this.tableData, "tb")
        // this.tableTitle = Object.keys(this.tableData[0]);

        if (!this.newTableData.length) {
          for (let item in this.tableData[0]) {
            if (item == "Name" || item == "Phone No") this.tableTitle.push(item)
          }
        }
        this.tableData.map((item: any) => {
          let obj = {
            Name: item.Name,
            "Phone No": item['Phone No']
          }
          this.namesArray.push(item.Name)
          this.contactsArray.push(item['Phone No'])
          this.newTableData.push(obj)
        })
        console.log(this.newTableData, "new Tb")
        this.newtabledatalength = this.newTableData.length
        console.log(this.newtabledatalength, "newtabledatalength Tb")
        this.tableRecords = this.tableData.slice(
          this.pageStartCount,
          this.pageEndCount
        );
        this.totalPageCount = this.tableData.length / this.recordsPerPage;
    
      };
      this.tableData = [];
    this.tableTitle = [];
    this.namesArray = [];
    this.contactsArray = [];
    this.newTableData = [];
    }
  }




  //csv for email campaign
 public saveData(event:any){
  if (event.target.files[0] != undefined) {
    console.log(event.target.files[0]);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
      this.EtableData = data;
      console.log(this.EtableData, "tb")
      // this.tableTitle = Object.keys(this.tableData[0]);

      if (!this.EmailTableData.length) {
        for (let item in this.EtableData[0]) {
          if (item == "EName" || item == "EmailId") this.EtableTitle.push(item)
        }
      }
      this.EtableData.map((item: any) => {
        let obj = {
          EName: item.EName,
          "EmailId": item['EmailId']
        }
        this.EnamesArray.push(item.EName)
        this.EmailIdArray.push(item['EmailId'])
        this.EmailTableData.push(obj)
      })
      console.log(this.EtableData, "new Tb")
      this.EtableData.length= this.EmailTableData.length
      console.log(this.EmailTableData.length, "newtabledatalength Tb")
      this.EtableRecords = this.EtableData.slice(
        this.EpageStartCount,
        this.EpageEndCount
      );
      this.EtotalPageCount = this.EtableData.length / this.ErecordsPerPage;
    };
  }
 }

  // onPageChange() {
  //   this.pageStartCount = this.currentPage * this.recordsPerPage;
  //   this.pageEndCount = this.pageStartCount + this.recordsPerPage;
  //   this.tableRecords = this.tableData.slice(
  //     this.pageStartCount,
  //     this.pageEndCount
  //   );
  // }

  // save(){
  // console.log(this.newTableData,"val")
  // }

  //radio button 


  selectRow(index: number) {
    this.selectedRowIndex = index;
    console.log(this.selectedRowIndex, 'rowww')
    this.selectedText = this.text[this.selectedRowIndex];
    console.log(this.selectedText, "selectedText")
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
    console.log(event,'select')
  }


// save contact
  savecontact() {
    // if(this.ContactName && this.ContactNumber){

    console.log(this.ContactName, this.ContactNumber)


    let arr = [
      {
        Name: this.ContactName,
        "Phone No": this.ContactNumber
      }
    ]

    if (!this.newTableData.length) {
      for (let item in arr[0]) {
        if (item == "Name" || item == "Phone No") this.tableTitle.push(item)
      }
    }
    arr.map((item: any) => {
      let obj = {
        Name: item.Name,
        "Phone No": item['Phone No']
      }
      this.newTableData.push(obj)
      this.namesArray.push(item.Name)
      this.contactsArray.push(item['Phone No'])
      
    })
    console.log(this.newTableData.reverse(), "buy tb")
    this.newtabledatalength = this.newTableData.length
    console.log(this.newtabledatalength, "newtabledatalength Tb")
    this.tableRecords = this.tableData.slice(
      this.pageStartCount,
      this.pageEndCount
    );
    this.totalPageCount = this.tableData.length / this.recordsPerPage;

    this.ContactName = "";
    this.ContactNumber = "";
  }

  //saveemail for email campaign//
  saveemail(){
    console.log(this.ContactEmail, this.EmailAddress)


    let mail = [
      {
        EName: this.ContactEmail,
        "EmailId": this.EmailAddress
      }
    ]

    if (!this.EmailTableData.length) {
      for (let item in mail[0]) {
        if (item == "EName" || item == "EmailId") this.EtableTitle.push(item)
      }
    }
    mail.map((item: any) => {
      let obj = {
        EName: item.EName,
        "EmailId": item['EmailId']
      }
      this.EmailTableData.push(obj)
      this.EnamesArray.push(item.EName)
      this.EmailIdArray.push(item['EmailId'])
      
    })
    // console.log(this.EmailTableData.reverse(), "buy tb")
    this.EmailtableDatalength = this.EmailTableData.length
    console.log(this.EmailtableDatalength, "newtabledatalength Tb")
    this.EtableRecords = this.EtableData.slice(
      this.EpageStartCount,
      this.EpageEndCount
    );
    this.EtotalPageCount = this.EtableData.length / this.ErecordsPerPage;

    this.ContactEmail = "";
    this.EmailAddress = "";
  }

// upload add campaign(whatsapp and text)

  clearName() {
    let obj = {
      name: this.campaignname,
      createdBy: 0,
      isSMSOnly: this.selectedRowIndex ? false : true,
      noOfContacts: this.newtabledatalength
    }
    this.api.getData(obj).subscribe((res: any) => {
      console.log(res, "campaignname")
      if (res.statusCode == 200) {
        let context_obj = {
          campaignId: res.details[0].id,
          context: this.selectedRowIndex ? this.selectedText.text : this.contextname
        }

        if (this.selectedRowIndex) {
          context_obj['id'] = this.selectedText.id
        }
        this.api.addContext(context_obj).subscribe((res: any) => {
          console.log(res, '------')
          if (res.statusCode == 200) {
            // let template_obj={
            //   id:res.details[0].id,
            //   name:this.templatename,
            //   text:this.templatetext
            // }
            // console.log(template_obj,'tftft')
            // this.api.getAllTemplates(template_obj).subscribe((res:any)=>)
            let contacts_obj = {
              campaignId: context_obj.campaignId,
              customerId: 0,
              name: this.namesArray,
              number: this.contactsArray
            }
          
            console.log(contacts_obj, 'ppppppp')
            this.api.addContacts(contacts_obj).subscribe((res: any) => {
              console.log(res, 'contact')

              if (res.statusCode == 200) {
                this.snackBar.open('Data created successfully!', '', {
                  duration: 3000,
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });
              }
              else {
                this.snackBar.open('Data not created!', 'X', {
                  duration: 3000,
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar']

                });
                console.log(res, 'pavan')
              }
            });
          }
        }, (error) => {
          this.snackBar.open('Data not created!', 'X', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']

          });
        });
      }
    });
  }

  emailcampaign(){
    let obj={
      name:this.campaignname,
      createdBy:0,
      isEmail:this.selectedRowIndex? false:true,
      
    }
    this.api.addemailcampaign(obj).subscribe((res:any)=>{
      console.log(res,'emailllll')
    })
  }

//Click here to add contact
  contacts() {
    this.open = !this.open
  }
//Click here to add email
  emails(){
    this.show=!this.show
  }
// whats app template
  whatsapptempalte(){
    this.api.getAllTemplates().subscribe((res: any) => {
      console.log(res,'teplee')
      this.text=res.details
    })

  }

}


