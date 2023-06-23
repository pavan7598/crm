import { Component, OnInit,ViewChild, Output,EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {SgmentationMethodsService} from './../sgmentation-methods.service';
@Component({
  selector: 'app-segmentation-list',
  templateUrl: './segmentation-list.component.html',
  styleUrls: ['./segmentation-list.component.scss']
})
export class SegmentationListComponent implements OnInit {
  @Output()Segmentation: EventEmitter<any> = new EventEmitter<any>()
  displayedColumns: string[] = ['SEGMENT NAME', 'TYPE', 'NO OF CUSTOMERS','CREATED DATE'];
  ELEMENT_DATA:any ;  
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private route:Router,private SegmentService:SgmentationMethodsService) { }
  dataSource:any
  ngOnInit() {
    this.SegmentService.getAllSegments().subscribe((d:any)=>{
      this.ELEMENT_DATA = d.data;
      console.log('======------>',this.ELEMENT_DATA)
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  goback(){
    this.Segmentation.emit(false);
  }

}

