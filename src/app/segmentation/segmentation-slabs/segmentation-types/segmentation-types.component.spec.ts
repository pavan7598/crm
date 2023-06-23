import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationTypesComponent } from './segmentation-types.component';

describe('SegmentationTypesComponent', () => {
  let component: SegmentationTypesComponent;
  let fixture: ComponentFixture<SegmentationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
