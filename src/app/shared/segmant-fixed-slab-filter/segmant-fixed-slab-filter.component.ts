import { Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segmant-fixed-slab-filter',
  templateUrl: './segmant-fixed-slab-filter.component.html',
  styleUrls: ['./segmant-fixed-slab-filter.component.scss']
})
export class SegmantFixedSlabFilterComponent implements OnInit, DoCheck {


  constructor(public differs: KeyValueDiffers) { }
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

  @Input()
  returnelements = [];
  @Input()
  slabfilter: any;
  selectFilter: any;

  @Input()
  totalIndx: any;

  @Output() addSlab = new EventEmitter<string>();

  addFilter(){
    this.addSlab.emit();
  }


  @Input()
  indx: any;
  @Output() removeSlab = new EventEmitter<string>();
  operators: any = [];


  ngOnInit() {
    //this.slabfilter.date_val= false;
    //console.log("this.slabfilter=========>", this.slabfilter);
    //console.log("this.returnelements=========>", this.returnelements);
    //debugger;
    if (this.slabfilter.selectFilter) {
      //debugger
      // console.log(" this.slabfilter===>", this.slabfilter);
      // console.log("this.returnelements===>",this.returnelements);
      //let fSelected=this.slabfilter.selectElement;
      //this.slabfilter.elementid
      //this.slabfilter.selectElement = this.returnelements.filter(e => e.elementid== fSelected.elementid)[0];
      this.selectFilter = this.allOoperators.filter(e => e.value == this.slabfilter.selectFilter)[0]; //this.slabfilter.selectFilter;
      //this.selectedRow = this.slabfilter.selectElement
      this.selectedEle(this.slabfilter.elementid);
    }
    this.differ = this.differs.find(this.slabfilter).create();
  }

  filterValue = { value: '=', viewValue: 'equal to', in: ['Character', 'Integer', 'Date'], multi: 'F' };
  selectedRow: any = {};
  selectedEle(id) {
    let selected = this.returnelements.filter(e => e.elementid == id)[0];
    this.selectedRow = selected;
    //console.log("selected=========>", selected);
    this.slabfilter.type = selected.sqldatatype;
    this.slabfilter.elementtype = selected.elementtype;
    this.slabfilter.elementtype = selected.elementtype;
    this.slabfilter.elementlabel = selected.elementlabel;
    this.operators = this.allOoperators.filter(function (a) {
      return a.in.includes(selected.sqldatatype);
    });


  }

  selectedEleUi(id) {
    this.slabfilter.value = "";
    if (this.slabfilter.value2) {
      this.slabfilter.value2 = "";
    }
    this.selectFilter = [];
    let selected = this.returnelements.filter(e => e.elementid == id)[0];
    this.selectedRow = selected;
    //console.log("selected=========>", selected);

    this.slabfilter.type = selected.sqldatatype;
    this.slabfilter.elementtype = selected.elementtype;
    this.slabfilter.elementlabel = selected.elementname;
    this.slabfilter.elementname = selected.elementlabel;
    this.operators = this.allOoperators.filter(function (a) {
      return a.in.includes(selected.sqldatatype);
    });

  } 

  filterOperator(val) {
    this.slabfilter.selectFilter = val.value;
    //this.filterValue = {value:  '=',  viewValue: 'equal to', in: ['Character', 'Integer',  'Date'],  multi:  'F'};
    if (!(this.slabfilter.selectFilter == '>= @ <' || this.slabfilter.selectFilter == '<= @ >')) {
      this.slabfilter.value2 = undefined;
    }
  }

  deleteSlab(i) {
    this.removeSlab.emit(i);
  }
  somethingChanged() {

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
    const change = this.differ.diff(this.slabfilter);

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
    //console.log("this.slabfilter===>",this.slabfilter);    
    if (this.slabfilter && this.slabfilter.elementlabel) {
      this.slabfilter.elementlabel = this.slabfilter.elementlabel.toLowerCase();
      if ((this.slabfilter.selectFilter == '>= @ <' || this.slabfilter.selectFilter == '<= @ >')) {

        this.slabfilter.condition = `i['${this.slabfilter.elementlabel}'] ${this.slabfilter.selectFilter.split('@')[0]} ${this.slabfilter.value} ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} i[${this.slabfilter.elementlabel}] ${this.slabfilter.selectFilter.split('@')[1]} ${this.slabfilter.value2}`;

        if (this.slabfilter.type == 'Date') {
          if (this.slabfilter.date_val) {
            this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]}  new Date(moment().add(${this.slabfilter.value2},'days').format('MM-DD-YYYY')).getTime()`;
          } else {

            this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}'].getTime() ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value}').getTime() ${this.slabfilter.selectFilter == '<= @ >' ? '||' : '&&'} new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}').getTime()`;
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
            this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime()`;
          } else {
            //this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date(moment().add(${this.slabfilter.value},'days').format('MM-DD-YYYY')).getTime()`;
            this.slabfilter.condition = `new Date (i['${this.slabfilter.elementlabel}']).getTime() ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value}').getTime()`;
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
}
