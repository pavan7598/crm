import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-connection-item',
  templateUrl: './connection-item.component.html',
  styleUrls: ['./connection-item.component.scss']
})
export class ConnectionItemComponent implements OnInit {
  @Input() connectionObject;
  test  = new Date();
  constructor() { }

  ngOnInit() {
  }

}
