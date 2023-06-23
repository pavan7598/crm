import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmantFixedFilterComponent } from './segmant-fixed-filter.component';

describe('SegmantFixedFilterComponent', () => {
  let component: SegmantFixedFilterComponent;
  let fixture: ComponentFixture<SegmantFixedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmantFixedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmantFixedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
