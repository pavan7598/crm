import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-sql-filter',
  templateUrl: './custom-sql-filter.component.html',
  styleUrls: ['./custom-sql-filter.component.scss']
})
export class CustomSqlFilterComponent implements OnInit {
  @Input()
  data: any;

  @Input()
  filterValue = {value:  '=',  viewValue: 'equal to', in: ['Character', 'Integer',  'Date'],  multi:  'F'};
  maxDate=new Date();
  type:any;
  viewdata:any={};
  filterForm = new FormGroup({
    filter: new FormControl('', Validators.required),
    value: new FormControl('0', Validators.required),
    value2: new FormControl('', Validators.required)
    
  });


  placeholders = {
    Character:  'Enter string...',
    Integer:  'Enter numaric...',
    Date :  'Enter Date value...',
    Number:'Enter numaric...',
    String:'Enter string...'
  };
  filters = [ {value:  '=', type:"equal", viewValue: 'equal to', in: ['Character','String', 'Integer',  'Date'],  multi:  'F'},
              {value:  '!=', type:"diferentThan", viewValue: 'not equal to ', in: ['Character','String', 'Integer',  'Date'],  multi:  'F'},
              {value:  '>',  type:"biggerThan", viewValue: 'greater than',  in: ['Integer', 'Date'],  multi:  'F'},
              {value:  '>=', type:"biggerOrEqualThan", viewValue: 'greater than or equal',  in: ['Integer', 'Date'],  multi:  'F'},
              {value:  '<',  type:"lessThan", viewValue: 'lower than', in: ['Integer', 'Date'],  multi:  'F'},
              {value:  '<=',  type:"lessOrEqualThan", viewValue: 'lower than equal',  in: ['Integer', 'Date'] , multi:  'F'},
              {value:  '>  @ <',  type:"between", viewValue: 'between', in: ['Integer', 'Date'] ,   multi:  'T'},
              {value:  '<  @ >',  type:"notBetween", viewValue: 'not between', in: ['Integer', 'Date'],  multi:  'T'}
              //,{value: "In@",    type:"In", viewValue: 'In List',in: ['Character','String', 'Integer',  'Date'],  multi:  'F'}
            ];
  constructor(public datepipe: DatePipe) {
    
    this.viewdata.date_val=false;
  }
  filter:any;
  somethingChanged(){

    /*debugger;*/
    if(this.viewdata.value===undefined || this.viewdata.value===""){
      this.viewdata.value="";
      //return;
      //this.playerSelectionService.playerSelection=true;
    }

    if(!this.viewdata.value2){
      this.viewdata.value2="";
     // return;
     //this.playerSelectionService.playerSelection=true;
    }
    
    //console.log("this.viewdata.value of===>",typeof this.viewdata.value);
    //console.log("this.viewdata.value===>",this.viewdata.value);
    if(typeof this.data.value =='object' && this.data.sqldatatype=='Date' && !this.viewdata.date_val){
      //console.log("this.data.value===>",this.data.value);
    }
    

    let value:any= (this.data.sqldatatype=='Date' && !this.viewdata.date_val && this.viewdata.value)? this.datepipe.transform(this.viewdata.value, 'yyyy-MM-dd'):this.viewdata.value;
    let value2:any= (this.data.sqldatatype=='Date'&& !this.viewdata.date_val && this.viewdata.value2)? this.datepipe.transform(this.viewdata.value2, 'yyyy-MM-dd'):this.viewdata.value2;
    
    
    

    //let value=this.viewdata.value;
    //let value2=this.viewdata.value2;


    this.data.operator= this.viewdata.filter.type;
    this.data.value=value;
    this.data.value2=value2;
    this.data.date_val=this.viewdata.date_val;
    // this.data.issetvisible=
    // this.data.elementlabel
    // this.data.elementname
    // this.data.elementtype
    // this.data.sqldatatype
    // this.data.elementdescription
    // this.data.collectionname
    // this.data.containerId

    this.data.element= {
      id: this.data.id,
      str: {
        name: this.data.elementname,
        operator: this.viewdata.filter.type,
        date_val:this.data.date_val,
        value: value,
        value2: value2
      }
    }
  }

    filterChange()  {
      const filterValue = this.filterForm.get('filter').value;
      this.filterValue = filterValue;
     this.somethingChanged();
      
  }


  operators:any=[];
  
  ngOnInit() {
    this.type=this.data.sqldatatype;
    this.operators = this.filters.filter((a)=> { 
      return a.in.includes(this.type);
    });
    //this.viewdata.value=0;
    //debugger
    //   console.log('Logging the input type --------------');
    //   console.log(this.type);
    // console.log("eeeeeeeeee====>",this.data);
    if(this.data && this.data.element){
      this.viewdata.filter=this.filters.filter(e=>e.type==this.data.operator)[0];   //this.data.element.str.operator;
      this.filterValue = this.viewdata.filter;
      this.viewdata.value=this.data.value;
      this.viewdata.value2=this.data.value2;
      this.viewdata.date_val=this.data.date_val;
    }else{
      this.viewdata.filter=this.operators[0]
    }
   

  }
datetype:any={};
  dateSelector(val){

    //this.viewdata.value="";
    this.viewdata.date_val=val;
    this.datetype= this.viewdata.date_val==false?this.data.sqldatatype:'Number';
    //console.log("this.datetype===>",this.datetype);
  }



}
