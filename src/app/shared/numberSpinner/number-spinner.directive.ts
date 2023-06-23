import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
//import { PortalHostDirective } from '@angular/cdk/portal';
import * as $ from 'jquery';
@Directive({
  selector: '[appNumberSpinner]'
})
export class NumberSpinnerDirective {
  @Input('appNumberSpinner') number: Number;
  @Input() positive_class;
  @Input() negitive_class;
  @HostListener('change', ['$event.target.value']) chng(event) {
    let value = parseInt(event);
    if (value >= 0) {
      if (this.positive_class) {
        this.renderer.addClass(this.el.nativeElement, this.positive_class);
      }
      else {
        this.renderer.addClass(this.el.nativeElement, 'df-positive')
      }
    }
    else {
      if (this.positive_class) {
        this.renderer.removeClass(this.el.nativeElement, this.positive_class)
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'df-positive');
      }
      this.renderer.addClass(this.el.nativeElement, 'negitive')
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
}
