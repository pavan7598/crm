import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationChartComponent } from './segmentation-chart.component';

describe('SegmentationChartComponent', () => {
  let component: SegmentationChartComponent;
  let fixture: ComponentFixture<SegmentationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
