import { Component, OnInit, ViewChild} from '@angular/core';
import { CatalogService } from 'src/app/player-selection-module/catalog/catalog.service';
import { MatTableDataSource, MatPaginator,MatSort } from '@angular/material';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
  displayedColumns: string[] = ['name', 'queryowner', 'type','ceatedts', 'updatedts' , 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  

  constructor(private cs: CatalogService) {}
  ngOnInit() { 
    
    this.cs.getQueryList().subscribe(data => {
      // console.log(data)
    let table:any=[];
    let table_data:any=data;
    for(var i=0;i<table_data.length;i++){
      if(table_data[i].layerID){
        table.push(table_data[i])
      }
    }
  this.dataSource = new MatTableDataSource(table.reverse());
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
   }

}
