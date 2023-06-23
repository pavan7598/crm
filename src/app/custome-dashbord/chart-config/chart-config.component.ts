import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { dashbordService } from "../dashbord.services";
import * as chartConfigsList from "../chartConfigs";
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chart-config',
  templateUrl: './chart-config.component.html',
  styleUrls: ['./chart-config.component.scss']
})
export class ChartConfigComponent implements OnInit {
  // cdk: any = {}
  chart: any = {};
  dataset: any;
  returnElements: any;
  conf: any;
  dragdata: any;
  opt: any = {};
  htmlToAdd: any;
  edit: any;
  chartdat: any;
  chartdata: any;

  name: any;
  // ckedit: boolean = false;
  constructor(private toastr: ToastrService, public dashbordservice: dashbordService, private dialogRef: MatDialogRef<ChartConfigComponent>, @Inject(MAT_DIALOG_DATA) data: any,) {

    if (data == null) {

      this.chartdat = JSON.parse(window.sessionStorage.getItem('x1'));
      this.chartdata = this.chartdat;
      this.dataset = this.chartdat.dataset;
      this.returnElements = this.chartdat.returnElements;
      this.conf = this.chartdat.conf;
      window.sessionStorage.setItem('x1', undefined);
      window.sessionStorage.setItem('x', undefined);
    }
    else {
      this.dataset = data.dataset;
      this.returnElements = data.returnElements;
      this.conf = data.conf;
    }
  }

  ngOnInit() {
    // console.log("----this.conf--------",this.conf)
    if (this.conf.type) {
      this.dragconfig(this.conf)
    }
  }
  apply() {
    if (this.opt.series) {
      this.dialogRef.close({ opt: this.opt, dragdata: this.dragdata });
      this.opt = {};
    } else {
      this.toastr.error("Please fill all field", '')
    }
  }


  receivecharttype(ev: any) {
    this.conf = {}
    this.conf = ev;
  }
  // echartOptions(ev:any){
  //   console.log("-=======================-->",ev)
  //   this.opt=ev;
  //   // this.dragdata=this.dragdata
  // }
  dragconfig(ev: any) {

    this.opt = {};
    this.dragdata = ev;
    if (this.chartdata != undefined) {
      this.name = { name: this.chartdata.name };
      console.log('-----pie', this.chartdata)

    }

    //   console.log("------this.dragdata---------",this.dragdata)
    if (ev.type == undefined) {
      return;
    }
    // this.child.dragconfig(ev);
    let chartType: any = ev.type;
    let chartValues: any = ev.list;
    if (chartType != 'crosstable' && chartType != 'metriccard' && chartType != 'table') {
      if (chartValues.xdim && chartValues.xdim.xdim && chartValues.xmet && chartValues.xmet.xmet && chartValues.xdim.xdim.length > 0 && chartValues.xmet.xmet.length > 0) {

        if (this.chartdata != undefined) {
          return this.opt = Object.assign(this.name, this.chart_Options(chartType, chartValues, this.dataset));
        }
        return this.opt = this.chart_Options(chartType, chartValues, this.dataset)
      }
    }
    if (ev.type == 'metriccard' && ev.list.xmet && ev.list.xmet.xmet && ev.list.xmet.xmet.length) {
      let tableHtml: any = this.chart_Options(chartType, chartValues, this.dataset);

      if (this.chartdata != undefined) {
        return this.opt.series = tableHtml;

      }
      return this.opt.series = tableHtml;
    }
    if (ev.type == 'crosstable' && ev.list.xmet && ev.list.xmet.xmet && ev.list.xmet.xmet.length) {
      let tableHtml: any = this.crossTable(chartType, chartValues, this.dataset);
      return this.opt.series = tableHtml;
    }
    if (ev.type == 'table' && ev.list.all && ev.list.all.all && ev.list.all.all.length) {
      let tableHtml: any = this.crossTable(chartType, chartValues, this.dataset);
      // console.log(tableHtml)
      return this.opt.series = tableHtml;
    }
    //   console.log("=======>this.opt==>",this.opt)
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
      groupset[i].map(function (val) {
        tmp.value = tmp.value + parseInt(val[metric]);
      })
      dataset_val.push(tmp)
      console.log('---',)
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
    // <h2 style="text-align: center font-size: xx-large;margin-left:10px;">${this.valueToWord(temp)}</h2>
    // <h7 style="text-align: center;margin-left:10px;">${metric.toUpperCase()}</h7>
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
      //     // console.log(linecharts)
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
