import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationSlabsComponent } from './segmentation-slabs.component';

describe('SegmentationSlabsComponent', () => {
  let component: SegmentationSlabsComponent;
  let fixture: ComponentFixture<SegmentationSlabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationSlabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationSlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
