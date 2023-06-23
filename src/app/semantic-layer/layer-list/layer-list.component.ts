import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LayersService } from '../layers.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfimDialogComponent } from 'src/app/shared/confim-dialog/confim-dialog.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent implements OnInit {
layersList: Array<any>;
filter="";
@Output() onedit = new EventEmitter<any>();
displayedColumns: string[] = ['name', 'description', 'status','actions'];
dataSource: MatTableDataSource<any>;
@Input() refresh: Subject<any>;
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private layerservice: LayersService , private toastr: ToastrService,
    public dialog: MatDialog) {
    

  }
  edit(id,rowname)  {
    this.onedit.emit(id);
    this.layerservice.rownameforedit(rowname.name);
  }

  
  delete(id)  {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data: { name: 'Do you want to delete Layer?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }
      if (!result) {
    this.layerservice.deleteLayer(id).subscribe((data)  =>  {
      this.getLayersData();
    });
  }
  dialogRef.close();
});

  }
  getLayersData() {

    this.layerservice.getLayers().subscribe((data:  any)  =>  {
      this.layersList = data.items.filter(d=>{
        return (JSON.stringify(d).search(this.filter)  !==  -1);
      });
      
      this.dataSource = new MatTableDataSource(this.layersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  

  ngOnInit() {
    this.getLayersData();
    this.refresh.subscribe((data) => {
      this.filter=data;
      this.getLayersData();
    });
  }

}
