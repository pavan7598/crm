import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationFilterComponent } from './segmentation-filter.component';

describe('SegmentationFilterComponent', () => {
  let component: SegmentationFilterComponent;
  let fixture: ComponentFixture<SegmentationFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
