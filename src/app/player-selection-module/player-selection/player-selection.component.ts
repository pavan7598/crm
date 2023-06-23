import {
  Component, OnInit, Inject, IterableDiffers, DoCheck,
  KeyValueDiffers, KeyValueDiffer, OnDestroy, Input, Output, EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlayerSelectionService } from "./player-selection.service";
import { ClipboardService } from 'ngx-clipboard';
import { ConfimDialogComponent } from '../../shared/confim-dialog/confim-dialog.component';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SaveAsComponent } from './save-as/save-as.component';
// import { FormGroup,Validators,FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit, DoCheck, OnDestroy {
  @Input() campaign;
  @Output() onlink = new EventEmitter();
  @Output() onback = new EventEmitter();
  @Output() sendQuery = new EventEmitter();
  collectionsList: any = [];
  layerList: any = [];
  // valid = new FormControl('', [Validators.required,Validators.pattern('[0-9a-zA-Z_-]{1,40}$')])
  psMainObj: any = {
    layerID: "",
    selectionType: "",
    name: "",
    type: "",
    expressions: {
      expressions: []
    },
    return_elements: [],
    sals_arr: []
  };
  fixedEle=[]
  differ: KeyValueDiffer<string, any>;
  result: any = {};
  segmentationdata: any = {};
  commonService$: Subscription;
  currentuser: any;
  constructor(public playerSelectionService: PlayerSelectionService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _clipboardService: ClipboardService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public differs: KeyValueDiffers,

  ) {
    this.psMainObj = {
      layerID: "",
      selectionType: "",
      name: "",
      type: "Player Selection",
      expressions: {
        expressions: []
      },
      return_elements: [],
      sals_arr: []
    };



    this.activatedRoute.params.subscribe(params => {
      if (params.type) {
        this.psMainObj.type = params.type;
      }
      // console.log("params===>", params);
      // console.log("this.psMainObj.type===>", this.psMainObj.type);
    });



    this.commonService$ = this.playerSelectionService.currentData.subscribe((data: any) => {
      this.playerSelectionService.getLayerElements().subscribe((layerData: any) => {
      //  debugger;
        this.layerList = layerData;
        // console.log("data.data===>", data);
        // console.log("getLayerElements()", getLayerElements());

        // debugger;
        if (data.key == 'playerSelection') {
          this.psMainObj = data.data;
          this.queryObj.query._id = data.data._id;
          this.onSelection(this.psMainObj.layerID, 'back', data.data.return_elements);

        } else if (data.key === 'catalog') {
          if (data.data.layerID) {
            this.psMainObj.layerID = data.data.layerID;
            this.onSelection(this.psMainObj.layerID, 'init', data.data.return_elements);
            this.psMainObj.expressions.expressions = data.data.filter_expressions;
            this.psMainObj.name = data.data.name;
            this.queryObj.query._id = data.data._id;
            this.psMainObj.sals_arr = data.data.sals_arr;
            this.psMainObj.type = data.data.type;
            this.psMainObj._id=data.data._id;
            // debugger;
          } else {

            this.psMainObj.layerID = this.layerList[0]._id;
            this.onSelection(this.layerList[0]._id, 'change', null);

          }
        } else {

          if (data.key != "psQueryResults") {
            this.psMainObj.layerID = this.layerList[0]._id;
            this.onSelection(this.layerList[0]._id, 'change', null);
          }
        }

      });
    });
  }
  collectionsf = false;
  linkClicked() {
    // console.log("this.queryObj======>",this.queryObj)
    this.onlink.emit({ query: this.queryObj.query });
  }
  backClicked() {
    this.onlink.emit({});
  }

  onSelection(ev, type, return_elements) {

//debugger;
    // console.log("ev------------>", ev);
    // console.log("type------------>", type);
    if (ev) {
      this.playerSelectionService.getElements(ev).subscribe((data: any) => {
        console.log(data);
        this.playerSelectionService.collectionsList = data;
        this.collectionsList = data.collections;

        let FixedElem = [];
        for (let ele of data.elements) {
          if (ele.fixedelement) {
            FixedElem.push(ele);

          }
        }

        if (type == 'change') {
          this.collectionsf = true;
          // this.clear();
          if (this.psMainObj.type !== 'Segementation') {
            this.psMainObj.return_elements = FixedElem;
            this.fixedEle = [...FixedElem];
//            debugger;
          }
        } else if (type == 'back') {
          this.collectionsf = true;
          this.fixedEle = [...FixedElem];
        } else {
          return_elements.forEach(element => {
            this.psMainObj.return_elements.push(this.playerSelectionService.findNameById(element.id));
          });
          this.collectionsf = true;
        }
      });
    }
  }

  onSelectionFromUi(ev, type) {
    this.fixedEle=[];
    this.playerSelectionService.getElements(ev).subscribe((data: any) => {

      this.playerSelectionService.collectionsList = data;
      this.collectionsList = data.collections;
      this.clear();

      let FixedElem = [];
      for (let ele of data.elements) {
        if (ele.fixedelement) {
          FixedElem.push(ele);

        }
      }
//      debugger;
      if (this.psMainObj.type !== 'Segementation') {
        this.psMainObj.return_elements = FixedElem;
        this.fixedEle = [...FixedElem];
      }
    });
  }

  addToelements($event) {
    ////
//     debugger;
    setTimeout(() => {
//      debugger;
      this.psMainObj.expressions.expressions[0] = $event;
      // .filter(d=>{
      //   if(d.conjunction)  {
      //     if(d.expressions.length === 0) {
      //       return false;
      //     }
      //   }
      //   return true;
      // });
    });

    this.psMainObj.expressions.conjunction = undefined;
  }

  queryObj: any = {
    query: {
      _id: "",
      query_owner:'',
      name: "",
      type: "Player Selection"

    }
  }

  ngOnInit() {
    let Usr: any = window.sessionStorage.getItem('currentuser');
    this.currentuser=JSON.parse(Usr)
  

  }

  ngDoCheck() {


  }
  emmittocamp(query) {
    this.conObject(query);
    this.sendQuery.emit(this.queryObj);
  }



  viewSQL(data: any) {

    if (this.playerSelectionService.playerSelection) {
      this.toastr.error("Please fill Filter condition or value", 'Message');
      return;
    }


    this.queryObj.paging = { page: 1, pageSize: 0 };

    this.conObject(data);
    this.playerSelectionService.getViewSql(this.queryObj).subscribe((e: any) => {
      console.log("---------------231--------------",e)
      this.result = e;
      this.openDialog(e);
    });

  }

  conObject(data) {
    this.queryObj.query.layerID = this.psMainObj.layerID;
    this.queryObj.query.name = this.psMainObj.name;
    this.queryObj.query.sals_arr = this.psMainObj.sals_arr;
    this.queryObj.query.type = this.psMainObj.type;
    this.queryObj.query._id = this.psMainObj._id;

    this.queryObj.query.filter_expressions = [];
    if (data.expressions.expressions.length == 1) {
      this.queryObj.query.filter_expressions.push(data.expressions.expressions[0]);
    } else if (data.expressions.expressions.length > 1) {
      this.queryObj.query.filter_expressions.push(data.expressions);
    }
    this.queryObj.query.return_elements = data.return_elements.map((e: any) => {
      return { id: e.id }
    });
  }

  getResult(data: any) {
    if (this.psMainObj.return_elements == 0) {
      this.toastr.error("Please Drag Return Elements", 'Message');
      return;
    }
    if (this.playerSelectionService.playerSelection) {
      this.toastr.error("Please fill Filter condition or value", 'Message');
      return;
    }


    //console.log("psMainObj.sals_arr==>",this.psMainObj.sals_arr);
    if (this.psMainObj.type == 'Segementation') {
      let msg = "";
      let isSegmentValid = false;
      this.psMainObj.sals_arr.map(m => {
        if (!(m.slabName)) {
          isSegmentValid = true;
          return;
        }
        m.filters.map(f => {
          if (!(f.elementlabel && f.condition && (f.value || f.value==0))) {
            //if(f.value && f.value!=0){
            isSegmentValid = true;
            msg = "Please fill Segmentation slb Filter condition or value";
            return;
          //}
          }
        })
      })


      let arr: any = this.psMainObj.sals_arr;
      arr.map((d: any, indx: any) => {
        arr.filter((d1: any, indx1: any) => {
          if (d1.slabName == d.slabName) {
            if (indx1 != indx) {
              isSegmentValid = true;
              //console.log("this.slb[d].slabName===>",arr[indx].slabName);
              msg = `Slab Name ${arr[indx1].slabName} already used. It should be unique`;
              //arr[indx1].slabName="";
              return;
            }
          }
        })
      })
      if (isSegmentValid) {
        this.toastr.error(msg, 'Message');
        return;
      }
    }




    this.conObject(data);
    // console.log("original_dataset===>",data);

    this.playerSelectionService.dataSource.next({
      key: 'psQueryResults',
      data: this.queryObj, original_dataset: data
    });
    this.router.navigate(['customerextraction/player/psQueryResults']);
  }

  clear() {
    // debugger;
    this.psMainObj.expressions={
        expressions: []
      }
    this.psMainObj.return_elements= [...this.fixedEle]
    // this.psMainObj.return_elements = [];
  }

  openDialog(e): void {
    let sqlData: any = e.sql;

    sqlData = sqlData.replace('SELECT', '<b class="blue">SELECT</b>');
    sqlData = sqlData.replace('FROM', '<b class="blue">FROM</b>');
    sqlData = sqlData.replace('WHERE', '<b class="blue">WHERE</b>');
    sqlData = sqlData.replace('GROUP BY', '<b class="blue">GROUP BY</b>');

    const dialogRef = this.dialog.open(ViewSqlDialogbox, {
      width: '50%',
      data: { data: e, sql: sqlData }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  callServiceToCopy() {

    this._clipboardService.copyFromContent('This is copy thru service copyFromContent directly');
  }

  save(data:any,saveAs:any) {
    this.queryObj.query.query_owner = this.currentuser.email;


    // if(!this.valid.valid){
    //   return this.toastr.error('Please Check Your Query Name');
    // }
    this.queryObj.query.creationtimestamp = Date.now();
    this.conObject(data);
    if(saveAs){
      delete this.queryObj.query._id;
      delete this.queryObj.query.id;
    }
    this.playerSelectionService.querySave(this.queryObj.query).subscribe((e: any) => {
      let req: any = e;
      // console.log("saveeeeeeeeeeee===>", e);
      if (req._id) {
        this.queryObj.query._id = e._id;
        this.psMainObj._id = e._id;
        this.toastr.success("selection saved", 'Message');
      } else {
        this.toastr.error(e.msg, 'Message');
      }
    });
  }
  saveAs() {
    const dialogRef = this.dialog.open(SaveAsComponent, {
      width: '50%',
      data: {name:this.psMainObj.name}
    });
    dialogRef.componentInstance.onsaveas.subscribe((data) =>  {
      this.psMainObj.name  = data;
      this.save(this.psMainObj,true);
      dialogRef.close();
    });
  }

  addSlab() {
    if (this.psMainObj.return_elements.length == 0) {
      this.toastr.error("Please Add Return Elements", 'Message');
      return;
    }
    this.psMainObj.sals_arr.push({});
  };


  removeSlab(index) {
    this.psMainObj.sals_arr.splice(index, 1)
  }

  ngOnDestroy() {
    this.commonService$.unsubscribe();
  }



  cancel() {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      width: '30%',
      data: { name: 'Do you want to discard changes and go back?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      //this.animal = result;
      if(result==undefined){
        return;
      }
      if (!result) {
        this.router.navigate(['/customerextraction/player/catalog']);
      }
    });
  }


}
@Component({
  selector: 'sql-view-dialog',
  templateUrl: './sql-view-dialog.html',
  styleUrls: ['./player-selection.component.scss']
})
export class ViewSqlDialogbox {
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _clipboardService: ClipboardService) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  callServiceToCopy() {

    this._clipboardService.copyFromContent(this.data.data.sql);
  }

}
