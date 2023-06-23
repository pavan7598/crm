import { Component, OnInit, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-revenue-overview',
    templateUrl: './revenue-overview.component.html',
    styleUrls: ['./revenue-overview.component.scss']
})
export class RevenueOverviewComponent implements OnInit {
    active = {
        data: [10, 12, 21, 54, 260, 830, 710],
        data1: [30, 182, 434, 791, 390, 30, 10]
    }
    constructor() {
    //  this.chartData(Value)
    }

    @Input() pData: any = {}

    options: any;

    ngOnInit() {
        //console.log(echarts);

    }

    chartData(mydata) {
console.log(this.pData.data1+"this.pData.data1this.pData.data1")
        console.log("mydata==>", mydata);
        this.options = {
            title: {
                text: 'Revenue Overview',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['ROI', 'COST']
            },
            toolbox: {
                show: false,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.pData.data1
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'ROI',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' }, color: '#ffe1ee', lineStyle: { color: '#ff348a' } } },
                    data: mydata.data
                },
                {
                    name: 'COST',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' }, color: '#e1f3ff', lineStyle: { color: '#34a9ff' } } },
                    data: mydata.data1
                }
            ],
        };

    }

}
