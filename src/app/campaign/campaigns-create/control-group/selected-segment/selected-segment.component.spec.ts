import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSegmentComponent } from './selected-segment.component';

describe('SelectedSegmentComponent', () => {
  let component: SelectedSegmentComponent;
  let fixture: ComponentFixture<SelectedSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
