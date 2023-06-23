import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CatalogService } from './catalog.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PlayerSelectionService } from "../player-selection/player-selection.service";
import { ConfimDialogComponent } from 'src/app/shared/confim-dialog/confim-dialog.component';

declare const $: any;
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {


  displayedColumns: string[] = ['name', 'queryowner', 'type', 'updatedts', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
 
  
  constructor(
    private cs: CatalogService,
    private router: Router,
    private playerSelectionService: PlayerSelectionService,
    public dialog: MatDialog
  ) {
    this.loadDataFromTables();
  }
  loadDataFromTables() {
    this.cs.getQueryList().subscribe(data => {
      //debugger;
      const table: any = [];
      const table_data: any = data;
      for (let i = 0; i < table_data.length; i++) {
        if (table_data[i].layerID) {
          table.push(table_data[i]);
        }
      }
      this.dataSource = new MatTableDataSource(table.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  emmitVal(type, row) {
    this.playerSelectionService.dataSource.next({
      key: 'catalog',
      data: row
    });
    this.router.navigate(['customerextraction','player',
      'playerSelection']);
  }
  deleteQuery(type, row) {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data: { name: 'Do you want to delete query?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }
      if (!result) {
        const id = row._id;
        this.playerSelectionService.deleteQuery(id).subscribe((data) => {
          this.loadDataFromTables();
        });
      }
      dialogRef.close();
    });
  }
  openNewSelection(type) {
    this.playerSelectionService.dataSource.next({ key: 'catalog', data: {} });
    this.router.navigate(['customerextraction','player', 'playerSelection', { id: 'new', type: type }]);
  }
  ngOnInit() {
    

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
