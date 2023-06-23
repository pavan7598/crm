import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationSlabFilterComponent } from './segmentation-slab-filter.component';

describe('SegmentationSlabFilterComponent', () => {
  let component: SegmentationSlabFilterComponent;
  let fixture: ComponentFixture<SegmentationSlabFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationSlabFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationSlabFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
