import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as $ from 'jquery';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
  host: {
    'class': 'my-material',
},
})
export class UiComponent implements OnInit {
  @ViewChild('ele', { static: true }) ele: any;
  @ViewChild('icon', { static: true }) icon: any;
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  color = 'accent';
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor() {

  }
  gh() {
    //console.log(this.element)
  }
  ngOnInit() {
    $(this.ele._elementRef.nativeElement).find('.mat-slider-thumb').css('background-color', '#4A96F7')
    $(this.ele._elementRef.nativeElement).find('.mat-slider-thumb').css('border', '4px solid #fff')
    $(this.ele._elementRef.nativeElement).find('.mat-slider-track-fill').css('background-color', '#4A96F7')

  }

  numberSpin: any;
  number = 10;
  increase() {
    if (this.numberSpin == undefined) {
      this.numberSpin = 0;
    }
    this.numberSpin++
    if (this.numberSpin < 0) {
      this.spinner = true;
    } else {
      this.spinner = false;
    }
  }
  spinner: any;
  decrease() {
    if (this.numberSpin == undefined) {
      this.numberSpin = 0;
    }
    this.numberSpin--
    if (this.numberSpin < 0) {
      this.spinner = true;
    } else {
      this.spinner = false;
    }
  }


}
