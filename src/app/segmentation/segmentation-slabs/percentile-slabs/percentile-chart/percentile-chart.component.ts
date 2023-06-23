import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as echarts from 'echarts';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlabsModelBoxComponent } from './../../slabs-model-box/slabs-model-box.component';

@Component({
    selector: 'app-percentile-chart',
    templateUrl: './percentile-chart.component.html',
    styleUrls: ['./percentile-chart.component.scss']
})
export class PercentileChartComponent implements OnInit {
    @Input() data: any;
    @Input() i: any;
    @Input() dataSet:any;
    @Input() obj:any
    division:any;
    label:any;
    constructor(public dialog: MatDialog) { }

    ngOnInit() {
        console.log('=======>percentile types',this.data)
        this.division= 100 /this.dataSet.length
        this.label = this.data.length;
        this.renderChart('');
    }

    dataStyle = {
        normal: {
            label: { show: false },
            labelLine: { show: false }
        }
    };
    placeHolderStyle = {
        normal: {
            color: 'rgba(0,0,0,0)',
            label: { show: false },
            labelLine: { show: false }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    options: any;
    renderChart(messageData) {

        this.options = {
            title: {
                text: String.fromCharCode(65+this.i),
                subtext: this.label,
                //sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
                x: 'center',
                y: 'center',
                itemGap: 2,
                textStyle: {
                    color: 'rgba(30,144,255,0.8)',
                    fontFamily: '微软雅黑',
                    fontSize: 35,
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 45,
                y: 45,
                itemGap: 12,
                data: [String.fromCharCode(65+this.i),'total']
            },
            series: [
                {
                    name: '1',
                    type: 'pie',
                    clockWise: false,
                    radius: [65, 75],
                    itemStyle: this.dataStyle,
                    data: [
                        {
                            value: this.division,
                            name: String.fromCharCode(65+this.i)
                        },
                        {
                            value: 100 - this.division,
                            name: 'total',
                            itemStyle: { color: 'blue' },
                        }
                    ]
                }
            ]
        };
    }

    SaveSegment(){
        this.obj.segmentMethods.config.selectedSlab = this.i;
        console.log('=========>',this.obj);
    //  let Slabname selectedSlab: Slabname
        const dialogRef = this.dialog.open(SlabsModelBoxComponent, {
            width: '500px',
            data: this.obj
        });
    }

}
