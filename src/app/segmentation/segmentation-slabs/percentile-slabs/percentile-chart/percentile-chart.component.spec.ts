import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentileChartComponent } from './percentile-chart.component';

describe('PercentileChartComponent', () => {
  let component: PercentileChartComponent;
  let fixture: ComponentFixture<PercentileChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentileChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentileChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
