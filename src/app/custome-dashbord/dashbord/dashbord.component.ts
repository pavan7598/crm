import { Component, OnInit } from '@angular/core';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { QueryBuilderComponent } from "../query-builder/query-builder.component";
import { MatDialog } from '@angular/material';
import { dashbordService } from "../dashbord.services";
import { ChartConfigComponent } from "../chart-config/chart-config.component";
import { ToastrService } from 'ngx-toastr';
import { CkeditorConfigComponent } from "../chart-config/ckeditor-config/ckeditor-config.component";
import { Router, ActivatedRoute } from "@angular/router";
import * as chartConfigsList from "../chartConfigs";
import * as _ from 'lodash';
import { Validators, FormControl } from '@angular/forms';
// import { UserServiceService } from "../../user-module/user-service.service";
// import { ChartOptionsComponent } from "../chart-config/chart-options/chart-options.component";
import { ConfimDialogComponent } from '../../shared/confim-dialog/confim-dialog.component';;
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  options: GridsterConfig;
  dashboardObject: any = {};
  resultset: any;
  dataset: any;
  returnElements: any = [];
  opt: any;
  dashbordId: any;
  dashboard_owner: any;
  dashbord_active: boolean = false;
  dashbord_name = new FormControl('', [Validators.required, Validators.pattern('[0-9-a-z_A-Z ]*')])
  currentuser: any;
  constructor(
    // public userService: UserServiceService, 
    public router: Router, 
    public activatedRoute: ActivatedRoute,
    private toastr: ToastrService, 
    public dashbord_service: dashbordService, 
    public dialog: MatDialog) {
    // this.userService.getCurrentUser().subscribe(d => {
    //   // console.log(d)
    //   let data: any = d;
    // })
    this.dashboard_owner = 'test';
  }

  ngOnInit() {
    let Usr: any = window.sessionStorage.getItem('currentuser');
    this.currentuser=JSON.parse(Usr)
    this.activatedRoute.params.subscribe(params => {
      this.dashbordId = params.id;
//      debugger;
      // console.log(this.dashbordId)
      if (params.id) {
        this.dashbord_service.getDashbordObj(this.dashbordId).subscribe(d => {
          // console.log("29--",d)
          this.dashboardObject = d[0];
          if (this.dashboardObject.queryID) {
            // this.chartconf.dragconfig(this.dashboardObject);
            this.dashbord_service.editDashboard(this.dashboardObject).subscribe(d => {
              // console.log("33--",d)
              let data: any = d;
              // console.log("data.queryObj.layerID-------->",data.queryObj.layerID)
              this.dataset = data.dataset;
              this.dashbord_service.getElements(data.queryObj.layerID).subscribe(d => {
                // console.log("38--",d)
                let ele: any = d;
                ele.elements.map(d => {
                  data.returnElements.map(d1 => {
                    if (d1.id == d.id) {
                      this.returnElements.push(d)
                    }
                  })
                })
                // console.log("56----------->",this.dashboardObject.wigetList)
                this.dashboardObject.wigetList.forEach((element: any, index: any) => {
                  if (element.chartConfig && element.chartConfig.type != 'text') {
                    this.dragconfig(element.chartConfig, index)
                  }
                });
              })
            })
          }
        })
      } else {
        this.dashboardObject = { wigetList: [], queryID: '', name: '' };
        this.dashboardObject.wigetList = [{ loading: false,cols: 2,rows: 2,y: 0,x: 0,chartConfig:{}}];
      }
    });
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: 'none',
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 10,
      maxCols: 10,
      minRows: 10,
      maxRows: 100,
      maxItemCols: 50,
      minItemCols: 1,
      maxItemRows: 50,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: 'none',
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }
  getErrorMessage() {
    return this.dashbord_name.hasError('required') ? 'You must enter a dashbord name' :
      this.dashbord_name.hasError('pattern') ? 'Special Charaters are not allowed' : '';
  }
  addWidget() {
    let ptemp = { loading: false, cols: 2, rows: 2, y: 0, x: 0, chartConfig: {} };
    this.dashboardObject.wigetList.push(ptemp);
  }

  removeWidget(indx: any) {
    this.dashboardObject.wigetList.splice(indx, 1);
  }

  openQueryBuilder() {
    if (this.dashboardObject.queryID) {
      const dialogRef2 = this.dialog.open(ConfimDialogComponent, {
        data: { name: 'Previous DataSet would be clear!!' }
      })
      dialogRef2.afterClosed().subscribe(re => {
        console.log(re)
        if (re) {
          return;
        } else {
          this.dashboardObject = { wigetList: [], queryID: '', name: '' };
          this.dashboardObject.wigetList = [{ loading: false, cols: 2, rows: 2, y: 0, x: 0, chartConfig: {} }];
          this.dataset = undefined;
          this.returnElements = undefined;
          this.dashboardObject.queryID = undefined;
          this.resultset = undefined;
        }
      })
    } else {
      const dialogRef = this.dialog.open(QueryBuilderComponent, {
        width: '1000px', disableClose: true
      })
      dialogRef.afterClosed().subscribe(re => {
        // console.log('The dialog was closed', re);
        this.returnElements = [];
        this.resultset = re;
        if (this.resultset) {
          let res: any = {};
          res.paging = { page: 1, pageSize: 3000 };
          res.query = this.resultset;
          this.dashbord_service.getElements(this.resultset.layerID).subscribe(d => {
            let ele: any = d;
            ele.elements.map(d => {
              this.resultset.return_elements.map(d1 => {
                if (d1.id == d.id) {
                  this.returnElements.push(d)
                }
              })
            })
          })
          this.dashbord_service.executeQuery(res).subscribe(d => {
            let response: any = d;
            this.dataset = response.data.rows;
            this.dashboardObject.queryID = this.resultset._id;
          })
        }
      });
    }
  }
  openChartConfig(config: any, index: any) {
    // console.log("----------config----",config)
    // console.log(index)
    if (!this.dataset) {
      this.toastr.error("Please Select the dataset", '');
      return;
    } else {
      const dialogRef = this.dialog.open(ChartConfigComponent, {
        width: '80%', height: '80%',
        data: { dataset: this.dataset, returnElements: this.returnElements, queryId: this.dashboardObject.queryID, conf: config.chartConfig }
      })
      dialogRef.afterClosed().subscribe(re => {
        if (re) {
          this.dashboardObject.wigetList[index].loading = true;
          this.dashboardObject.wigetList[index].chartConfig = re.dragdata;
          this.dashboardObject.wigetList[index].chartConfig.wigetdata = re.opt;
          // this.opt=re.opt;
          // this.dragconfig(re.dragdata)
          // this.dashboardObject.wigetList[index].c = re.dragdata;
          // console.log("----wigetList--", this.dashboardObject.wigetList[index].chartConfig)
          // console.log("----wigetList--this.opt-----------",this.opt)
        }
        // console.log("----wigetList--all------", this.dashboardObject)

      })
    }
  }

  ckeditorConf(item: any, i: any) {
    // console.log(item)
    // console.log(i)
    if (item.loading == false) {
      item.chartConfig.value = '';
      item.chartConfig.type = 'text';
      // console.log(item)
    } else {
      item.chartConfig = item.chartConfig;
    }
    const dialogRef = this.dialog.open(CkeditorConfigComponent, {
      width: '50%', disableClose: true,
      data: { conf: item.chartConfig }
    })
    dialogRef.afterClosed().subscribe(re => {
      // console.log(re)
      if (re) {
        this.dashboardObject.wigetList[i].loading = true;
        this.dashboardObject.wigetList[i].chartConfig = re.opt;
        //  console.log(this.dashboardObject.wigetList[i].chartConfig)
        // console.log("----wigetList--all------", this.dashboardObject)

      }
    })
  }

  SaveDashboard() {
    if (this.dashbord_name.status == "INVALID") {
      this.toastr.error("Please check dashbord name", '');
      return;
    }
    for (let i of this.dashboardObject.wigetList) {
      delete i.chartConfig.wigetdata
    }
    // this.dashboardObject.dashbord_active = this.dashbord_active;
    console.log('--dashboardobj---',this.dashboardObject)
    this.dashboardObject.dashboard_owner = this.currentuser.email;
  
    this.dashboardObject.link_to_gage = false;
    this.dashbord_service.saveDashboard(this.dashboardObject).subscribe(
      (d: any) => {
        this.toastr.success(d.data, '');
        this.router.navigateByUrl('/dashbordList')

      }, (err) => {
        console.log("error", err.error);
        this.toastr.error(err.error.data, '');
      });
  }
  UpdateDashboard() {
    // console.log(this.dashboardObject)
    for (let i of this.dashboardObject.wigetList) {
      delete i.chartConfig.wigetdata
    }
    this.dashbord_service.updateDashboard(this.dashboardObject).subscribe(d => {
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
  }

  dragdata: any
  dragconfig(ev: any, i: any) {
    // console.log("------this.dragdata---------",ev,i)
    // console.log("------this.dragdata---------",ev)
    this.opt = {};
    this.dragdata = ev;
    let chartType: any = ev.type;
    let chartValues: any = ev.list;
    if (chartType != 'crosstable' && chartType != 'metriccard' && chartType != 'table') {
      if (chartValues.xdim && chartValues.xdim.xdim && chartValues.xmet && chartValues.xmet.xmet && chartValues.xdim.xdim.length > 0 && chartValues.xmet.xmet.length > 0) {
        this.opt = this.chart_Options(chartType, chartValues, this.dataset)
      }
    }
    if (ev.type == 'metriccard' && ev.list.xmet && ev.list.xmet.xmet && ev.list.xmet.xmet.length) {
      let tableHtml: any = this.chart_Options(chartType, chartValues, this.dataset);
      this.opt.series = tableHtml;
    }
    if (ev.type == 'crosstable' && ev.list.xmet && ev.list.xmet.xmet && ev.list.xmet.xmet.length) {
      let tableHtml: any = this.crossTable(chartType, chartValues, this.dataset);
      this.opt.series = tableHtml;
    }
    if (ev.type == 'table' && ev.list.all && ev.list.all.all && ev.list.all.all.length) {
      let tableHtml: any = this.crossTable(chartType, chartValues, this.dataset);
      this.opt.series = tableHtml;
    }
    this.dashboardObject.wigetList[i].chartConfig.wigetdata = this.opt;
  }
  barchart_data(metric: any, dimension: any, dataset: any) {
    let resultset: any = {};
    metric = (metric).toLowerCase();
    dimension = (dimension).toLowerCase();
    resultset.legend = [];
    let groupset: any = _.groupBy(dataset, dimension);
    let dataset_val: any = [];
    let i: any;
    for (i in groupset) {
      resultset.legend.push(i);
      let tmp_value: number = 0;
      groupset[i].map(d => {
        tmp_value = tmp_value + parseInt(d[metric]);
      })
      dataset_val.push(tmp_value)
    }
    resultset.data = dataset_val;
    //  console.log("resultset barchart_data",resultset);
    return resultset;
  }
  piechart_data(metric: any, dimension: any, dataset: any) {
    
    let resultset: any = {};
    resultset.legend = [];
    var groupset = _.groupBy(dataset, dimension);
    var dataset_val = [];
    for (let i in groupset) {
     
      let tmp: any = { name: i, value: 0 };
      resultset.legend.push(i)
      console.log('----',i)
      console.log('----',resultset.legend)

      groupset[i].map(function (val) {
        tmp.value = tmp.value + parseInt(val[metric]);
      })
      dataset_val.push(tmp)
    }
    resultset.data = dataset_val;
    // console.log("resultset piechart_data",resultset);
    return resultset;
  }
  kpi_sum(metric: any, dataset: any) {
    metric = (metric).toLowerCase();
    let temp: any = 0;
    for (let i of dataset) {
      if (i[metric] != undefined)
        temp = temp + parseInt(i[metric]);
    }
    // console.log("value*** ",temp);
    return `
    <h2 style="text-align: center font-size: xx-large;margin-left:10px;">${this.valueToWord(temp)}</h2>
    <h7 style="text-align: center;margin-left:10px;">${metric.toUpperCase()}</h7>
    `;
  }
  valueToWord(input: any) {
    if ((input).length >= 7) {
      let number: any = input / 1000000;
      let dec: any = input / 10000;
      let removeVlaue: any = dec - (number * 100);
      return number + '.' + removeVlaue + 'M'
    }
    else {
      return (input / 1000) + 'K'
    }
  }
  chart_Options(chartType: any, chartValues: any, dataset: any) {
    if (chartType == 'metriccard') {
      var metric = (chartValues.xmet.xmet[0].elementlabel).toLowerCase();
      var metricCardResult = this.kpi_sum(metric, dataset);
      return metricCardResult;
    }
    if (chartType == 'pie') {
    
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      var metric = (chartValues.xmet.xmet[0].elementlabel).toLowerCase();
      let resultsest = this.piechart_data(metric, dimension, dataset);
      let piecharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs[chartType]));
      piecharts.series[0].data = resultsest.data;
      piecharts.legend.data = resultsest.legend;
      return piecharts;
    }
    if (chartType == 'doughnut') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      var metric = (chartValues.xmet.xmet[0].elementlabel).toLowerCase();
      let resultsest = this.piechart_data(metric, dimension, dataset);
      let doughnutcharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs[chartType]));
      doughnutcharts.series[0].data = resultsest.data;
      doughnutcharts.legend.data = resultsest.legend;
      // console.log("doughnutcharts", doughnutcharts);
      return doughnutcharts;
    }

    if (chartType == 'bar') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let barcharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs.bar));
      barcharts.series = [];
      for (let element of chartValues.xmet.xmet) {
        var temp = { name: '', type: 'bar', data: [] }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        barcharts.xAxis.data = resultsest.legend;
        barcharts.series.push(temp);
      }
      //  console.log("multibar charts out",barcharts);
      return barcharts;
    }
    if (chartType == 'horizontalbar') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let barcharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs.bar));
      barcharts.series = [];
      barcharts.yAxis = { type: 'category', data: [] }
      barcharts.xAxis = { type: 'value' }
      for (let element of chartValues.xmet.xmet) {
        var temp = { name: '', type: 'bar', data: [] }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        barcharts.yAxis.data = resultsest.legend;
        barcharts.series.push(temp);
      }
      //  console.log("verticalbar charts out",barcharts);
      //console.log("verticalbar charts out",JSON.stringify(barcharts));
      return barcharts;
    }
    if (chartType == 'stackedbar') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let barcharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs.bar));
      barcharts.series = [];
      for (let element of chartValues.xmet.xmet) {
        let temp: any = { name: '', type: 'bar', stack: 'test', data: [] }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        barcharts.xAxis.data = resultsest.legend;
        barcharts.series.push(temp);
      }
      // console.log("multibar charts out",barcharts);
      return barcharts;
    }
    if (chartType == 'verticalstackedbar') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let barcharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs.bar));
      barcharts.series = [];
      barcharts.yAxis = { type: 'category', data: [] }
      barcharts.xAxis = { type: 'value' }
      for (let element of chartValues.xmet.xmet) {
        let temp: any = { name: '', type: 'bar', stack: 'test', data: [] }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        barcharts.yAxis.data = resultsest.legend;
        barcharts.series.push(temp);
      }
      return barcharts;
    }
    if (chartType == 'line') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let linecharts = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs[chartType]));
      linecharts.series = [];
      for (let element of chartValues.xmet.xmet) {
        let temp: any = { name: '', type: 'line', smooth: true, data: [] }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        linecharts.xAxis.data = resultsest.legend;
        linecharts.series.push(temp);
      }
      // console.log(linecharts)
      return linecharts;
    }
    if (chartType == 'area') {
      var dimension = (chartValues.xdim.xdim[0].elementlabel).toLowerCase();
      let areachart = JSON.parse(JSON.stringify(chartConfigsList.chartConfigs[chartType]));
      areachart.series = [];
      for (let element of chartValues.xmet.xmet) {
        let temp: any = { name: '', type: 'line', data: [], areaStyle: {} }
        let resultsest = this.barchart_data(element.elementlabel, dimension, dataset);
        temp.data = resultsest.data;
        areachart.xAxis[0].data = resultsest.legend;
        areachart.series.push(temp);
      }
      // console.log(areachart)
      return areachart;
    }
  }
  crossTable(type: any, list: any, dataset: any) {
    let selected_cols: any = [];
    let selected_mets: any = [];
    for (let j in list) {
      if (j == `xdim` || j == `ydim`) {
        list[j][j].forEach((a) => {
          selected_cols.push(a.elementlabel.toLowerCase())
        })
      }
      else
        list[j][j].forEach((a) => {
          selected_mets.push(a.elementlabel.toLowerCase())
        })
    }
    if (type == 'table') {
      if (selected_mets.length == 0)
        return;
      else {
        let table_row: any = '';
        for (let i = 0; i < dataset.length - 1; i++) {
          table_row = table_row + `<tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210)">${selected_mets.map(met => {
            return `<td>${dataset[i][met]}</td>`
          }).join('\n')}</tr>`
        }
        let table = `<table class="uk-table" style="background-color:white;margin-top:15px;border-bottom: 1px solid rgb(213, 210, 210)">
            <tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210);font-family: 'Lato-Bold';font-size: 14px;">${selected_mets.map(met => {
          return `<th>${met} </th>`
        }).join('\n')}
            </tr>`+ table_row +
          `</table>`
        return table;
      }
    }
    if (!(selected_cols.length > 1 || selected_mets > 0))
      return;
    else {
      let final_res: any = {}
      let unique_fields: any = [];
      let row_set: any = new Set();
      let column_set: any = new Set();
      let groups: any = _.groupBy(dataset, function (value) {
        let broupBy_cols: any = selected_cols.map((d) => {
          return value[d]
        })
        return broupBy_cols.join(` # `);
      });

      for (let g in groups) {
        let groupKey: any = g.split(`#`);
        row_set.add(groupKey[0]);
        column_set.add(groupKey[1]);
        unique_fields.push(g)
        groups[g].reduce((ol: any, nw: any) => {
          let tmp: any = {}
          for (let h of selected_mets) {
            tmp[h] = ol[h] + nw[h];
          }
          return tmp;
        })
        for (let k of selected_mets) {
          final_res[g + ` # ${k}`] = groups[g][0][k]
        }
      }
      let row_array: any = Array.from(row_set);
      let column_arr: any = Array.from(column_set);
      let totalTds: any = {}
      let table: any = `
    <table class="uk-table" style="background-color:white;margin-top:15px;border-bottom: 1px solid rgb(213, 210, 210)">
    <tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210);font-family: 'Lato-Bold';font-size: 14px;">
    <th></th>
    ${column_arr.map(cd => {
        return `${selected_mets.map(met => {
          return `<th>${cd} </th>`
        }).join('\n')}`
      }).join('\n')}
    </tr>
    <tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210);font-family: 'Lato-Bold';font-size: 14px;">
    <th>${selected_cols.join('/\n')}</th>
    ${column_arr.map(cd => {
        let column: any = selected_mets.map(met => {
          return `<th>${met || '-'} </th>`
        }).join('\n')
        return column;
      }).join('\n')}
    </tr>
    ${row_array.map(d => {
        return `<tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210)"><td>${d}</td>${column_arr.map(cd => {
          return `${selected_mets.map(met => {
            return `<td>${final_res[d + `#` + cd + ` # ` + met] == undefined ? `-` : final_res[d + `#` + cd + ` # ` + met]} </td>`
          }).join('\n')}`
        }).join('\n')}</tr>`
      }).join(` \n`)
        }
    <tr style="background-color:white;border-bottom: 1px solid rgb(213, 210, 210);font-family: 'Lato-Bold';font-size: 14px;">
    <td>total</td>${column_arr.map((cd, i) => {
          totalTds[i] = [];
          selected_mets.map(met => {
            let sum_temp: any = 0;
            row_array.map(d => {
              sum_temp = sum_temp + (final_res[d + `#` + cd + ` # ` + met] || 0)
            })
            totalTds[i].push(sum_temp);
          })
          let sum: any = totalTds[i].map((a) => {
            return `<td>${a}</td>`;
          }).join('\n')
          return sum
        }).join('\n')}</tr>    
    </table>`
      //console.log(table);
      return table;
    }
  }
}
