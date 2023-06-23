import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { dashbordService } from "../dashbord.services";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ViewchartComponent } from '../viewchart/viewchart.component';

@Component({
  selector: 'app-dashbord-list',
  templateUrl: './dashbord-list.component.html',
  styleUrls: ['./dashbord-list.component.scss']
})
export class DashbordListComponent implements OnInit {
  displayedColumns: string[] = ['name','created by','created date', 'Actions',"Link to Gaze"];
  dataSource = new MatTableDataSource<any>();
  Dashboardcatalog: any;

  dataset: any;
  returnElements:  any = [];
  dashboardObject: any;
  config:any=[];
  dashbordId: any;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  currentuser: any;
  constructor(private toastr: ToastrService ,public dialog: MatDialog,private router: Router, private dashbordService: dashbordService) { }

  ngOnInit() {
    let Usr: any = window.sessionStorage.getItem('currentuser');
    this.currentuser=JSON.parse(Usr)
   
    this.getDashboardlist();
  }
  viewDashboard(ele: any){
    this.config=[];
    this.returnElements=[];
        console.log(ele._id+"elemtid-------------------");
        let elementid=ele._id;
        if (ele._id) {
        this.dashbordService.getDashbordObj(elementid).subscribe(d => {
          // console.log("29--",d)
          this.dashboardObject = d[0];
             if (this.dashboardObject.queryID) {
            // this.chartconf.dragconfig(this.dashboardObject);
            this.dashbordService.editDashboard(this.dashboardObject).subscribe(d => {
                  // console.log("33--",d)
          let data: any = d;
           console.log("data.queryObj.layerID-------->",data.queryObj.layerID)
          this.dataset = data.dataset;
          console.log(this.dataset+"view--------------------");
          this.dashbordService.getElements(data.queryObj.layerID).subscribe(d => {
            // console.log("38--",d)
            let ele: any = d;
            ele.elements.map(d => {
              data.returnElements.map(d1 => {
                if (d1.id == d.id) {
                  this.returnElements.push(d)
                }
              })
            })  ; 
            for(let i=0;i<this.dashboardObject.wigetList.length;i++)
            {
                this.config.push(this.dashboardObject.wigetList[i].chartConfig );
            }
            console.log(this.config+"con0000000000000----------------------"+this.returnElements)
               const dialogRef = this.dialog.open(ViewchartComponent, {
                 width: '80%', height: '80%',
                 data: { dataset: this.dataset, returnElements: this.returnElements, queryId: { id: ele._id }, conf: this.config }
               }); 
          })
          
        })  ; 
       
      
      }
       
        });
        
      }
      else
      {
        console.log("enter else oart");
        this.dashboardObject = { wigetList: [], queryID: '', name: '' };
            this.dashboardObject.wigetList = [{ loading: false,cols: 2,rows: 2,y: 0,x: 0,chartConfig:{}}];
          
      }
      }
      
          //data: {name: this.name, animal: this.animal}
          
      
  getDashboardlist() {
    this.dashbordService.getDashboardList().subscribe(d => {
      console.log(d)
      this.Dashboardcatalog = d;
      this.dataSource = new MatTableDataSource<any>(this.Dashboardcatalog);
      this.dataSource.paginator = this.paginator;
    })
  }
  toggle(ev:any,ele:any){
    console.log(ev.checked)
    console.log(ele)
    ele.link_to_gage=ev.checked
      this.dashbordService.updateDashboard(ele).subscribe(d => {
        // console.log(d)
        this.toastr.success('Updated Sucessfully', '');
      }, (err) => {
        console.log("error", err.error);
        if (err.error.data.code == 11000) {
          this.toastr.error("Name already exist", '');
        } else {
          this.toastr.error("something went wrong", '');
        }
      });
    // }
  }
  DeleteDashboard(id: any) {
    this.dashbordService.deleteDashboard(id).subscribe(d => {
      this.getDashboardlist();
    })
  }
  editDashboard(ele: any) {
    this.router.navigate(['dashboard','dashboardCreate', { id: ele._id }]);
  }
}