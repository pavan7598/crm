import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {
  @Input() schedule: FormGroup;
  @Output() monthlyEmit: EventEmitter<any> = new EventEmitter<any>();
  selectedOption = "every";
  dowdata = [{ name: "Sunday", value: "Sunday" }, { name: "Monday", value: "Monday" }, { name: "Tuesday", value: "Tuesday" }, { name: "Wednesday", value: "Wednesday" }, { name: "Thursday", value: "Thursday" }, { name: "Friday", value: "Friday" }, { name: "Saturday", value: "Saturday" }];
  womdata = [{ value: '1', name: 'First' }, { value: '2', name: 'Second' }, { value: '3', name: 'Third' }, { value: '4', name: 'Fourth' }, { value: '4-5', name: 'Last' }];
  monthly_every: FormGroup;
  monthly_ondate: FormGroup;
  options = ['every', 'ondate']
  constructor() {
  }

  ngOnInit() {
    this.schedule.addControl('selectedOption', new FormControl('', Validators.required));
    this.schedule.addControl('every', new FormControl('', Validators.required));
    this.schedule.addControl('day', new FormControl('', Validators.required));
    this.schedule.addControl('month', new FormControl('', Validators.required));
    this.schedule.addControl('start_date', new FormControl('', Validators.required));
    this.schedule.addControl('end_date', new FormControl('', Validators.required));
  }
  value: any;
  monthlySelected() {
    if (this.value == undefined || this.value != 'monthly') {
      this.value = 'monthly';
      this.monthlyEmit.emit({ value: this.value, flag: true })
    } else {
      this.value = undefined
      this.monthlyEmit.emit({ value: this.value, flag: false })
    }
  }

  changeVale(value) {
    console.log('change value====>', value)
    if (value == 'ondate') {
      this.schedule.removeControl('every');
      this.schedule.removeControl('day');
      this.schedule.removeControl('month');
      this.schedule.addControl('onDate', new FormControl('', Validators.required));
      this.schedule.addControl('onDate_month', new FormControl('', Validators.required));
    } else {
      this.schedule.removeControl('onDate');
      this.schedule.removeControl('onDate_month');
      this.schedule.addControl('every', new FormControl('', Validators.required));
      this.schedule.addControl('day', new FormControl('', Validators.required));
      this.schedule.addControl('month', new FormControl('', Validators.required));
    }
  }



}
