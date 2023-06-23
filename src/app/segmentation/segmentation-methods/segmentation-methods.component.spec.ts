import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationMethodsComponent } from './segmentation-methods.component';

describe('SegmentationMethodsComponent', () => {
  let component: SegmentationMethodsComponent;
  let fixture: ComponentFixture<SegmentationMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
