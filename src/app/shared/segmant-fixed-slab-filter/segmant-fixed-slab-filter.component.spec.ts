import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmantFixedSlabFilterComponent } from './segmant-fixed-slab-filter.component';

describe('SegmantFixedSlabFilterComponent', () => {
  let component: SegmantFixedSlabFilterComponent;
  let fixture: ComponentFixture<SegmantFixedSlabFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmantFixedSlabFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmantFixedSlabFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
