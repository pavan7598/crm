import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChartComponent } from './select-chart.component';

describe('SelectChartComponent', () => {
  let component: SelectChartComponent;
  let fixture: ComponentFixture<SelectChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
