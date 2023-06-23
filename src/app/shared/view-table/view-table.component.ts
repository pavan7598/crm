import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
//import { ExcelService } from '../excel.service';
//import { SendEmailComponent } from '../send-email/send-email.component';
@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']

})
export class ViewTableComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @Input() masterData:any;

  //constructor(private excelService:ExcelService,private sendEmailComponent:SendEmailComponent) { }

  constructor(){}

  ngOnInit() {
    //
//    debugger;
    this.displayedColumns=Object.keys(this.masterData[0]);
    this.dataSource = new MatTableDataSource(this.masterData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportAsXLSX(data):void {
    /**----pass data and filename to be saved as parameters--- */
    //this.excelService.exportAsExcelFile(this.masterData, 'Crux_');
  }


}
