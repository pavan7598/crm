import { Component, OnInit, DoCheck, KeyValueDiffers, Input, KeyValueDiffer } from '@angular/core';

@Component({
  selector: 'app-segmant-fixed-filter',
  templateUrl: './segmant-fixed-filter.component.html',
  styleUrls: ['./segmant-fixed-filter.component.scss']
})
export class SegmantFixedFilterComponent implements OnInit,DoCheck {


  constructor(public differs: KeyValueDiffers) { }
  @Input()
  returnelements: any;
  @Input()
  slb: any = {};
  differ: KeyValueDiffer<string, any>;

  ngOnInit() {
    console.log("this.slb==>", this.slb);
    //console.log("this.slb==>", this.slb.filters);
    //debugger;
    if(!this.slb.filters){
      this.slb.filters = [];
      this.addFilter();
    }
    this.differ = this.differs.find(this.slb.filters).create();
  }

  addFilter() {
    //console.log("addFilter===>");
    this.slb.filters.push({})
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
     // console.log("rrrrrrr===>",r);

        let elename = r;
        if(elename.elementlabel){
        let elename_under="";
        if(elename){
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
