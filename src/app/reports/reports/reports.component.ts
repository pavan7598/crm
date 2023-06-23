import { Component, OnInit } from '@angular/core';
import { dashbordService } from "../../custome-dashbord/dashbord.services";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    graphdata: any;
    requireddata: any;
    dashboardObject: any;
    dataset: any;
    returnElement: any;
    x: any = [];
    duplicatedata: any;
    wiglistArray: any = {};
    returnElements: any;
    conf: any = [];
    // ckedit: boolean = false;
    opt: any = {};
    Data: any = {};
    option: any;
    optionArray: any = {};
    constructor(private toastr: ToastrService,
        public dashbordService: dashbordService, ) {

    }
    ngOnInit() {
        this.getDashboardlist();
    }

    getDashboardlist() {
        this.dashbordService.getDashboardList().subscribe(d => {
            this.requireddata = d;
            for (let i = 0; i < this.requireddata.length; i++) {
                this.editDashboard(this.requireddata[i]);
            }
            this.Data = this.conf;
        })
    }
    editDashboard(option) {
        this.dashbordService.editDashboard(option).subscribe(d => {
            let data: any = d;
            this.dataset = data.dataset;
            this.x = option;
            this.wiglistArray = this.x.wigetList;
            for (let i = 0; i < this.wiglistArray.length; i++) {
                if (this.wiglistArray[i].chartConfig.type == 'text')
                {

                }
                 else if (this.wiglistArray[i].chartConfig.type == 'table')
                 {

                 }
             else if( this.wiglistArray[i].chartConfig.type == 'crosstable')
             {

             }
                 else if( this.wiglistArray[i].chartConfig.type == 'metrictable') {

                }
                else {
                    
                    let data = { dataset: this.dataset };
                    let resultset = { returnElements: this.returnElements };
                    let conc = this.x.name ;
                    let name = { name: conc };
                    let wigetList = { wigetList: this.wiglistArray[i] }
                    this.x = Object.assign(wigetList, data, name);

                    this.conf.push(this.x);

                }
            }

        });


    }
}

