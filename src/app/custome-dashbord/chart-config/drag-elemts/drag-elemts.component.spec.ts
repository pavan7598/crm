import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragElemtsComponent } from './drag-elemts.component';

describe('DragElemtsComponent', () => {
  let component: DragElemtsComponent;
  let fixture: ComponentFixture<DragElemtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragElemtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragElemtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
