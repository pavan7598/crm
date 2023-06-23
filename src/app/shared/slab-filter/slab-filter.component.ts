import { Component, OnInit,Input } from '@angular/core';
import { Constants } from "../constants";

@Component({
  selector: 'app-slab-filter',
  templateUrl: './slab-filter.component.html',
  styleUrls: ['./slab-filter.component.scss']
})
export class SlabFilterComponent implements OnInit {

  @Input() returnelements:any;
  @Input() slabfilter:any;
  @Input() removefilter:any;
  @Input() indx:any;

  element_obj:any;

  allOoperators:any=Constants.allOoperators;

  constructor() { }

  ngOnInit() {

    this.returnelements.map((d,indx)=>{
      this.element_obj[d.elementname]=indx;
      return d.elementname;
  });
  }

  formQuery(){
    if((this.slabfilter.selectFilter=='>= @ <'||this.slabfilter.selectFilter=='<= @ >'))
        {
            this.slabfilter.condition=`i['${this.slabfilter.elementname}'] ${this.slabfilter.selectFilter.split('@')[0]} ${this.slabfilter.value1} ${this.slabfilter.selectFilter=='<= @ >'?'||':'&&'} i[${this.slabfilter.elementname}] ${this.slabfilter.selectFilter.split('@')[1]} ${this.slabfilter.value2}`;                       

            if(this.slabfilter.type=='Date')
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[0]} new Date('${this.slabfilter.value1}') ${this.slabfilter.selectFilter=='<= @ >'?'||':'&&'} i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[1]} new Date('${this.slabfilter.value2}')`;   
            else if(this.slabfilter.type=='Character')
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[0]} '${this.slabfilter.value1}' ${this.slabfilter.selectFilter=='<= @ >'?'||':'&&'} i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[1]} '${this.slabfilter.value2}'`;   
            else
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[0]} ${this.slabfilter.value1} ${this.slabfilter.selectFilter=='<= @ >'?'||':'&&'} i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter.split('@')[1]} ${this.slabfilter.value2}`;   
       
        }
        else if(this.slabfilter.selectFilter=='In@')
        {
            if(this.slabfilter.value1)
        this.slabfilter.condition=`['${this.slabfilter.value1.join(`','`)}'].includes(i['${this.slabfilter.selectElement}']) `;    
        }
        else {
            if(this.slabfilter.type=='Date')
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter} new Date('${this.slabfilter.value1}')`;   
            else if(this.slabfilter.type=='Character')
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter} '${this.slabfilter.value1}'`;   
            else
            this.slabfilter.condition=`i['${this.slabfilter.selectElement}'] ${this.slabfilter.selectFilter} ${this.slabfilter.value1}`;   
        }
}

}
