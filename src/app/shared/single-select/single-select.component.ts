import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent implements OnInit {

  constructor() { }
   
    /** list */
  @Input() list: any[] = [ ];

  /** control for the selected  */
    public selectCtrl: FormControl = new FormControl();

    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  
    @ViewChild('singleSelect',{static:true}) singleSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();
    ngOnInit() {
      // set initial selection
      this.selectCtrl.setValue(this.list[10]);
  
      // load the initial list
      this.filteredList.next(this.list.slice());
  
      // listen for search field value changes
      this.bankFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterList();
        });
    }

    
  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredList
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredList are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }
  

  protected filterList() {
    if (!this.list) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredList.next(this.list.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredList.next(
      this.list.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
