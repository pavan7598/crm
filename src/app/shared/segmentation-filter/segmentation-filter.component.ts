import { Component, OnInit, DoCheck, KeyValueDiffers, Input, KeyValueDiffer } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-segmentation-filter',
  templateUrl: './segmentation-filter.component.html',
  styleUrls: ['./segmentation-filter.component.scss']
})
export class SegmentationFilterComponent implements OnInit,DoCheck {

  constructor(public differs: KeyValueDiffers) { }
  @Input()
  returnelements: any;
  @Input()
  slb: any = {};
  differ: KeyValueDiffer<string, any>;

  ngOnInit() {
    //console.log("this.slb==>", this.slb);
    console.log("this.slb==>", this.slb.filters);
    if(!this.slb.filters){
      this.slb.filters = [];
      this.addFilter();
    }
    this.differ = this.differs.find(this.slb.filters).create();
  }
  filterArray = new FormArray([new FormGroup({})]);
  addFilter() {
    //console.log("addFilter===>");
    this.slb.filters.push({})
    this.filterArray.controls.push(new FormGroup({}))
  }

  deleteSlab(index) {
    // console.log("val==>", index);
    this.slb.filters.splice(index, 1);
  }

  ngDoCheck() {
    const change = this.differ.diff(this.slb.filters);
    //console.log("==>",change);
    let final_condition=``;
    let final_condition_campaign=``;
    let metric_list=[];
 

    for(let r of this.slb.filters)
    {
      ////
    console.log("rrrrrrr===>",r);

        let elename = r;
        //console.log("elename.elementlabel===>",elename.elementlabel);
        if(elename && elename.elementlabel){
        let elename_under="";
        if(elename && elename.elementlabel){
          //console.log("elename===>",elename.elementlabel.toLowerCase());
          elename=elename.elementlabel.toLowerCase();
          elename_under = elename.split(' ').join('_');
        }
        if(r.condition){
        let con = r.condition.replace(elename, elename_under);
        ////
        let condition=con.replace(elename, elename_under);
        final_condition_campaign=condition+'&&'+final_condition_campaign

        final_condition=r.condition+'&&'+final_condition
        if(r.elementtype=='Metrics')
        {
            metric_list.push(r.elementlabel.toLowerCase())
        }
      }
    }
    }
    final_condition=final_condition.replace(/\&\&$/g,'');
    final_condition_campaign=final_condition_campaign.replace(/\&\&$/g,'');
    this.slb.final_condition=final_condition;
    this.slb.final_condition_campaign=final_condition_campaign;
    this.slb.metric_list=metric_list;

  }



}
