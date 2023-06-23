import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiDataSummaryComponent } from './roi-data-summary.component';

describe('RoiDataSummaryComponent', () => {
  let component: RoiDataSummaryComponent;
  let fixture: ComponentFixture<RoiDataSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoiDataSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoiDataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
