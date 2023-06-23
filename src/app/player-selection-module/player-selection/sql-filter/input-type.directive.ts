import { Directive, Input, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material';


@Directive({
  selector: '[appInputType]'
})
export class InputTypeDirective implements OnInit {
@Input('appInputType')
type: String;

@Input()
datepickerInstance: MatDatepicker<any>;

@HostListener('click')
click() {
  // console.log("type===>",this.type);
if  (this.type === 'Number')  {
this.r2.setAttribute(this.el.nativeElement, 'type', 'number');
}
if  (this.type === 'Date')  {
  this.datepickerInstance.open();
  }

}

@HostListener('change', ['$event','$value'])
change(ev,val) {
  // console.log(`Logging the change event -----------`);
  // console.log(ev,val)
  
 }
  constructor(private el: ElementRef, private r2: Renderer2) {

  }

  ngOnInit(){
   
    // if  (this.type === 'Number')  {
    //   this.r2.setAttribute(this.el.nativeElement, 'type', 'number');
    //   }
  }

}
