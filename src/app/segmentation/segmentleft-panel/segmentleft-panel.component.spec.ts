import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentleftPanelComponent } from './segmentleft-panel.component';

describe('SegmentleftPanelComponent', () => {
  let component: SegmentleftPanelComponent;
  let fixture: ComponentFixture<SegmentleftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentleftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentleftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
