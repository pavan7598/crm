import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationCardsComponent } from './segmentation-cards.component';

describe('SegmentationCardsComponent', () => {
  let component: SegmentationCardsComponent;
  let fixture: ComponentFixture<SegmentationCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentationCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
