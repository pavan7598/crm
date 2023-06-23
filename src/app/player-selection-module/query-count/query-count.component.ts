import { Component, OnInit, Input, Output, EventEmitter, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { CountService } from './count.service';
import { PlayerSelectionService  } from "../player-selection/player-selection.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-query-count',
  templateUrl: './query-count.component.html',
  styleUrls: ['./query-count.component.scss']
})
export class QueryCountComponent implements OnInit,DoCheck {
  @Input() query;
  @Output() queryResults = new EventEmitter();

  @Input() resetchart;
  old;
  loading = false;
  refresh = true;
  data:any
  differ: KeyValueDiffer<string, any>;
  constructor(private cs: CountService,private defer: KeyValueDiffers,public playerSelectionService:PlayerSelectionService,private toastr: ToastrService) { }
  getCountQuery() {
    if(this.playerSelectionService.playerSelection){
      this.toastr.error("Please fill Filter condition or value", 'Message');
      return;
    }
    this.loading = true;
    this.data=undefined;
    this.cs.getCount(this.query).subscribe((data) =>  {
      // console.log("----data---count---",data)
      let res:any=data
      this.loading  = false;
      if(res.error){
        this.toastr.error(res.msg, 'Message');
      }else{
        this.refresh  = false;
        this.data = res;
      }

    });
  }
  ngOnInit() {
    this.differ = this.defer.find(this.resetchart).create();
  }
  ngDoCheck() {
    ////
if(this.old !== JSON.stringify(this.resetchart) ) {
    this.refresh  = true;
    this.old = JSON.stringify(this.resetchart);
}

  }

}
