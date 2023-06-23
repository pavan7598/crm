import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { PlayerSelectionService } from '../player-selection.service';
import { NameCheck } from '../name-check';

@Component({
  selector: 'app-save-as',
  templateUrl: './save-as.component.html',
  styleUrls: ['./save-as.component.scss']
})
export class SaveAsComponent implements OnInit {

  constructor(private pss:  PlayerSelectionService) {}
  name = new FormControl('',  [Validators.required, Validators.pattern('[0-9-a-z_A-Z ]*')],  NameCheck.createValidator(this.pss).bind(this));
  public onsaveas = new Subject();
  ngOnInit() {
  }

  saveAs() {
    if  (this.name.valid) {
    this.onsaveas.next(this.name.value);
    }
    // else{
    //   return  this.toastr.error("Special charaters are not allowed", 'Message');
    // }
  }

}
