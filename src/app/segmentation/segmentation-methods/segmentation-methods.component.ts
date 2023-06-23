import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EchartsComponent } from './../../shared/echarts/echarts.component';
import { ActivatedRoute } from '@angular/router';
import { SgmentationMethodsService } from './../sgmentation-methods.service';
import { LandingComponent } from './../../landing/landing.component';
@Component({
  selector: 'app-segmentation-methods',
  templateUrl: './segmentation-methods.component.html',
  styleUrls: ['./segmentation-methods.component.scss']
})
export class SegmentationMethodsComponent implements OnInit {
  @ViewChild(EchartsComponent, { static: true }) chart: EchartsComponent;
  constructor(private route: ActivatedRoute,
    private segService: SgmentationMethodsService,
    private landing: LandingComponent,
  ) { 
    this.landing.changeRouteDrawer(true)
    this.dimensions=[ {
      "elementid": 8,
      "issetvisible": true,
      "elementlable": "Country",
      "elementname": "country",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "String",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    },{
      "elementid": 7,
      "issetvisible": true,
      "elementlable": "AgeGroup",
      "elementname": "age_group",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "String",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }, {
      "elementid": 4,
      "issetvisible": true,
      "elementlable": "Gender",
      "elementname": "gender",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "String",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }, {
      "elementid": 9,
      "issetvisible": true,
      "elementlable": "GameType",
      "elementname": "game_type",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "Integer",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }, {
      "elementid": 53,
      "issetvisible": true,
      "elementlable": "ProductPreference",
      "elementname": "product_preference",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "String",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }, {
      "elementid": 22,
      "issetvisible": true,
      "elementlable": "SourceOfTraffic",
      "elementname": "source_of_traffic",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "Date",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }, {
      "elementid": 10,
      "issetvisible": true,
      "elementlable": "PlayerStatus",
      "elementname": "player_status",
      "tablename": "player",
      "elementtype": "Dimension",
      "sqldatatype": "String",
      "fixedelement": false,
      "dispatchelement": false,
      "elementdescrption": null
    }];


    // this.segService.getDimensions().subscribe((e:any)=>{
    //   this.dimensions=e.data;
    // });
  }
  dimensions:any=[];
  slider: any;
  selected:any={}

  ngOnInit() {
  }
  SegListData:any = false;
  ShowSegList(ev:any){
    this.SegListData = ev;
  }


}
