import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModelTableComponent } from './view-model-table.component';

describe('ViewModelTableComponent', () => {
  let component: ViewModelTableComponent;
  let fixture: ComponentFixture<ViewModelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
