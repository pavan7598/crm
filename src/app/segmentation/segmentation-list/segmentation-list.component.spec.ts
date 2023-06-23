import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationListComponent } from './segmentation-list.component';

describe('SegmentationListComponent', () => {
  let component: SegmentationListComponent;
  let fixture: ComponentFixture<SegmentationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
