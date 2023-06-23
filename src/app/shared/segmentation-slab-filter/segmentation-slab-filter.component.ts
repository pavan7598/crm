import { Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-segmentation-slab-filter',
  templateUrl: './segmentation-slab-filter.component.html',
  styleUrls: ['./segmentation-slab-filter.component.scss']
})
export class SegmentationSlabFilterComponent implements OnInit, DoCheck {


  constructor(public differs: KeyValueDiffers,public datepipe: DatePipe) { }
  differ: KeyValueDiffer<string, any>;
  maxDate = new Date();
  allOoperators = [{ value: '=', type: "equal", viewValue: 'equal to', in: ['String', 'Character', 'Integer', 'Date'], multi: 'F' },
  { value: '!=', type: "diferentThan", viewValue: 'not equal to ', in: ['String', 'Character', 'Integer', 'Date'], multi: 'F' },
  { value: '>', type: "biggerThan", viewValue: 'greater than', in: ['Integer', 'Date'], multi: 'F' },
  { value: '>=', type: "biggerOrEqualThan", viewValue: 'greater than or equal', in: ['Integer', 'Date'], multi: 'F' },
  { value: '<', type: "lessThan", viewValue: 'lower than', in: ['Integer', 'Date'], multi: 'F' },
  { value: '<=', type: "lessOrEqualThan", viewValue: 'lower than equal', in: ['Integer', 'Date'], multi: 'F' },
  { value: '>= @ <', type: "between", viewValue: 'between', in: ['Integer', 'Date'], multi: 'T' },
  { value: '<= @ >', type: "notBetween", viewValue: 'not between', in: ['Integer', 'Date'], multi: 'T' }
    //,{value: "In@",    type:"In", viewValue: 'In List',in: ['Character', 'Integer',  'Date'],  multi:  'F'}
  ];

  placeholders = {
    Character: 'Enter string...',
    String: 'Enter string...',
    Integer: 'Enter numaric...',
    Date: 'Enter Date value...',
    Number: 'Enter numaric...'
  };
  @Input() form:any;

  @Input()
  returnelements = [];
  @Input()
  slabfilter: any;
  selectFilter: any;
  slabfilter1: any;
  @Input()
  totalIndx: any;

  @Input()
  indx: any;
  @Output() removeSlab = new EventEmitter<string>();
  @Output() addSlab = new EventEmitter<string>();

  
  operators: any = [];


  ngOnInit() {
    //this.slabfilter.date_val= false;
    
    this.form.addControl('segmentName',new FormControl('',Validators.required));
    this.form.addControl('filter',new FormControl('',Validators.required));

    console.log("thi=====jksakajdasjkd=========>",this.form);
    if(this.slabfilter){
      if(Object.keys(this.slabfilter).length==0)
      this.slabfilter1=null;
      else
      this.slabfilter1=this.slabfilter;
    }
    //console.log("this.returnelements=========>", this.returnelements);
    //debugger;
    if (this.slabfilter.selectFilter) {
     // debugger
      // console.log(" this.slabfilter===>", this.slabfilter);
      // console.log("this.returnelements===>",this.returnelements);
      //let fSelected=this.slabfilter.selectElement;
      //this.slabfilter.elementid
      //this.slabfilter.selectElement = this.returnelements.filter(e => e.elementid== fSelected.elementid)[0];
      this.selectFilter = this.allOoperators.filter(e => e.value == this.slabfilter.selectFilter)[0]; //this.slabfilter.selectFilter;
      //this.selectedRow = this.slabfilter.selectElement
      this.selectedEle(this.slabfilter.elementid);
    }
    //this.differ = this.differs.find(this.slabfilter).create();
  }

  filterValue = { value: '=', viewValue: 'equal to', in: ['Character', 'Integer', 'Date'], multi: 'F' };
  selectedRow: any = {};
  selectedEle(id) {
    let selected = this.returnelements.filter(e => e.elementid == id)[0];
    this.selectedRow = selected;
    //console.log("selected=========>", selected);
    this.slabfilter.type = selected.sqldatatype;
    this.slabfilter.sqldatatype = selected.sqldatatype;
    this.slabfilter.elementtype = selected.elementtype;
    this.slabfilter.elementname = selected.elementname;
    this.slabfilter.elementlabel = selected.elementlabel;
    this.operators = this.allOoperators.filter(function (a) {
      return a.in.includes(selected.sqldatatype);
    });


  }

  selectedEleUi(id,slab) {
    console.log('selected data====>',slab)
    this.slabfilter.value = "";
    if (this.slabfilter.value2) {
      this.slabfilter.value2 = "";
    }
    this.selectFilter = [];
    let selected = this.returnelements.filter(e => e.elementid == id)[0];
    this.selectedRow = selected;
    //console.log("selected=========>", selected); elementlabel

    this.slabfilter.elementid = selected.elementid;
    this.slabfilter.type = selected.sqldatatype;
    this.slabfilter.sqldatatype = selected.sqldatatype;
    this.slabfilter.elementtype = selected.elementtype;
    this.slabfilter.elementname = this.slabfilter1.elementlabel;
    this.slabfilter.elementlabel = selected.elementname;
    this.operators = this.allOoperators.filter(function (a) {
      return a.in.includes(selected.sqldatatype);
    });

  } 

  filterOperator(val) {
    this.slabfilter.selectFilter = val.value;
    //this.filterValue = {value:  '=',  viewValue: 'equal to', in: ['Character', 'Integer',  'Date'],  multi:  'F'};
    if (!(this.slabfilter.selectFilter == '>= @ <' || this.slabfilter.selectFilter == '<= @ >')) {
      this.slabfilter.value2 = undefined;
    }else{
      
    }
  }

  deleteSlab(i) {
    this.removeSlab.emit(i);
  }
  somethingChanged() {

  }
  addFilter(){
    this.addSlab.emit();
  }

  datetype: any = {};
  dateSelector(val) {

    this.slabfilter.value = "";
    this.slabfilter.value2 = "";
    this.slabfilter.date_val = val;
    this.datetype = this.slabfilter.date_val == false ? this.selectedRow.sqldatatype : 'Number';
    //console.log("this.datetype===>",this.datetype);
  }

  ngDoCheck() {
    //const change = this.differ.diff(this.slabfilter);

    //console.log("ngDoCheck");

    this.formQuery();
    if (this.slabfilter && this.slabfilter.elementid) {
      //console.log("slabfilter.elementid===========>",this.slabfilter);
      let selected = this.returnelements.filter(e => e.elementid == this.slabfilter.elementid)[0];
      //console.log("selected========>",selected);
      if (selected == undefined) {
        this.slabfilter.value = "";
        this.selectFilter = [];
        this.slabfilter.elementid = "";
      }
    }

  }

  formQuery() {
    //debugger
    console.log("this.slabfilter===>",this.slabfilter);    
    if (this.slabfilter.selectFilter && this.slabfilter.elementlabel) {
      this.slabfilter.elementlabel = this.slabfilter.elementlabel.toLowerCase();
      if ((this.slabfilter.selectFilter == '>= @ <' || this.slabfilter.selectFilter == '<= @ >')) {

        this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[0]} ${this.slabfilter.value} ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} i[${this.slabfilter.elementlabel}] ${this.slabfilter.selectFilter.split('@')[1]} ${this.slabfilter.value2}`;

        if (this.slabfilter.type == 'Date') {
          if (this.slabfilter.date_val) {
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]}  new Date(moment().add(${this.slabfilter.value2},'days').format('MM-DD-YYYY')).getTime()`;
            this.slabfilter.condition=this.dateformatterbetween();

          } else {
            this.slabfilter.condition=this.dateformatterbetween();
           // this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}'].getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value}').getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}').getTime()`;
          }
        } else if (this.slabfilter.type == 'Character' || this.slabfilter.type == 'String') {
          this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[0]} '${this.slabfilter.value}' ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[1]} '${this.slabfilter.value2}'`;
        } else {
          this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[0]} ${this.slabfilter.value} ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[1]} ${this.slabfilter.value2}`;
        }
      }
      else if (this.slabfilter.selectFilter == 'In@') {
        if (this.slabfilter.value)
          this.slabfilter.condition = `['${this.slabfilter.value.join(`','`)}'].includes(i['${this.slabfilter.elementlabel}']) `;
      }
      else {

        if (this.slabfilter.type == 'Date') {
          //console.log("this.slabfilter.date_val===>",this.slabfilter.date_val);
          if (this.slabfilter.date_val) {
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value}').getTime()`;
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime()`;
            this.slabfilter.condition =this.dateformatter();
          } else {
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime()`;
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value}').getTime()`;
            this.slabfilter.condition =this.dateformatter();
          }
        }
        else if (this.slabfilter.type == 'Character' || this.slabfilter.type == 'String') {
          this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter} '${this.slabfilter.value}'`;
        } else {
          //console.log("this.slabfilter.elementlabel==>",this.slabfilter.elementlabel);
          this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter} ${this.slabfilter.value}`;

        }
      }

    }
  }

  dateformatter(){
    //this.date=new Date();
    let res_date=  "";
    if(this.slabfilter.date_val){
      let latest_date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      res_date=this.slabfilter.elementlabel + this.slabfilter.selectFilter +`date '${latest_date}' + integer  '${this.slabfilter.value}'`;
    }else{
      let latest_date =this.datepipe.transform(this.slabfilter.value, 'yyyy-MM-dd');
      res_date=this.slabfilter.elementlabel + this.slabfilter.selectFilter +`date '${latest_date}'`;

    }

//console.log("res_date=============>",res_date);
    return res_date;
    //`new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value}').getTime()`
//`new Date (i['${this.slabfilter.elementlabel}'].getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value}').getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}').getTime()`;
  }

  dateformatterbetween(){
    //this.date=new Date();
    let res_date=  "";
    if(this.slabfilter.date_val){
      let latest_date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      //res_date=this.slabfilter.elementlabel + this.slabfilter.selectFilter +`date '${latest_date}' + integer  '${this.slabfilter.value}'`;
      res_date=this.slabfilter.elementlabel + this.slabfilter.selectFilter.split('@')[0] +`date '${latest_date}' + integer  '${this.slabfilter.value}' ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} ${this.slabfilter.elementlabel} ${this.slabfilter.selectFilter.split('@')[1]}  +date '${latest_date}' + integer  '${this.slabfilter.value2}'`;

    }else{
      let latest_date =this.datepipe.transform(this.slabfilter.value, 'yyyy-MM-dd');
      let latest_date2 =this.datepipe.transform(this.slabfilter.value2, 'yyyy-MM-dd');
      res_date=this.slabfilter.elementlabel + this.slabfilter.selectFilter.split('@')[0] +`date '${latest_date}' ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} ${this.slabfilter.elementlabel} ${this.slabfilter.selectFilter.split('@')[1]}  +date '${latest_date2}'`;
      //`new Date (i['${this.slabfilter.elementlabel}'].getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value}').getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}').getTime()`;
    }

//console.log("res_date=============>",res_date);
    return res_date;
    //`new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value}').getTime()`
//`new Date (i['${this.slabfilter.elementlabel}'].getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value}').getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}').getTime()`;
  }

  Submit(){
    console.log('=============>',this.form)
  }
}
