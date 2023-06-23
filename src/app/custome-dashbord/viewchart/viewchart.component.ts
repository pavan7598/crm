import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { dashbordService } from "../dashbord.services";
import * as chartConfigsList from "../chartConfigs";
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ChartConfigComponent } from '../chart-config/chart-config.component';
import { SendEmailComponent } from 'src/app/shared/send-email/send-email.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

import html2canvas from 'html2canvas';
@Component({
  selector: 'app-viewchart',
  templateUrl: './viewchart.component.html',
  styleUrls: ['./viewchart.component.scss']
})
export class ViewchartComponent implements OnInit {
  // cdk: any = {}
  single: any[];
  multi: any[];
  docDefinition: any;

  view: any[] = [700, 400];


  duplicatedata: any;
  queryObj: any = {};
  dataset: any;

  returnElements: any;
  conf: any = [];
  chartconfig: ChartConfigComponent;
  // ckedit: boolean = false;
  opt1: any = [];
  textopt: any = [];
  tableopt: any = [];
  opt: any = {};
  constructor(private toastr: ToastrService,
    public dialog: MatDialog,
    public dashbordservice: dashbordService, private dialogRef: MatDialogRef<ChartConfigComponent>, @Inject(MAT_DIALOG_DATA) data: any,) {
    this.dataset = data.dataset;
    this.returnElements = data.returnElements;
    this.conf = data.conf;
    this.duplicatedata = data;
  }

  ngOnInit() {

    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('chart');
      html2canvas(chart, {
        height: 3000,
        width: 1000,
        scale: 3,
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('chart').style.visibility = 'visible';
        }
      }).then((canvas) => {
        // Get chart data so we can append to the pdf
        const chartData = canvas.toDataURL();
        // Prepare pdf structure
        const docDefinition = {
          content: [],
          styles: {
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
              alignment: 'left'
            },
            subsubheader: {
              fontSize: 12,
              italics: true,
              margin: [0, 10, 0, 25],
              alignment: 'left'
            }
          },
          defaultStyle: {
            // alignment: 'justify'
          }
        };

        // Add some content to the pdf
        const title = { text: ' export of charts to the PDF', style: 'subheader' };
        const description = { text: ' ', style: 'subsubheader' };
        docDefinition.content.push(title);
        docDefinition.content.push(description);
        // Push image of the chart
        docDefinition.content.push({ image: chartData, width: 500 });
        this.docDefinition = docDefinition;
        // pdfMake.createPdf(docDefinition).download('chartToPdf' + '.pdf');
      });
    }, 1100);




    for (let i = 0; i < this.conf.length; i++) {
      console.log(this.conf[i].type);
      if (this.conf[i].type != "text" &&
        this.conf[i].type != "crosstable" &&
        this.conf[i].type != "metriccard" &&
        this.conf[i].type != "table"
      ) {
        this.chartconfig = new ChartConfigComponent(this.toastr, this.dashbordservice, null, this.duplicatedata);

        this.opt1.push(this.chartconfig.dragconfig(this.conf[i]));
       

        console.log(this.opt1, '=============pie====opt1==========>');
      }

      else if (this.conf[i].type == "crosstable" ||
        this.conf[i].type == "metriccard" ||
        this.conf[i].type == "table") {
        this.chartconfig = new ChartConfigComponent(this.toastr, this.dashbordservice, null, this.duplicatedata);

        this.opt.series = this.chartconfig.dragconfig(this.conf[i]);
        this.tableopt.push(this.opt.series);
        // console.log(this.tableopt+"==========================>table data==============");
      }
      else if (this.conf[i].type == "text") {
        this.textopt.push(this.conf[i].value);
      }
      else {

      }
    }
  }


  emailParams = { query: this.queryObj };
  emailSend() {
   

    let pdfDocGenerator = pdfMake.createPdf(this.docDefinition);
    pdfDocGenerator.getBase64((data) => {

      this.emailParams = { query: this.queryObj };
      this.dialog.open(SendEmailComponent, {
        width: '40%',
        data: { name: this.emailParams, data }
      })
    });
    // this.toastr.success("Email Sent", 'Message');



    // console.log(this.queryObj,'============query data==========>');
  }

  downloadbutton() {
    // Download PDF
    if (this.docDefinition) {
      pdfMake.createPdf(this.docDefinition).download('chartToPdf' + '.pdf');
    } else {
      console.log('Chart is not yet rendered!');
    }

  }
}

