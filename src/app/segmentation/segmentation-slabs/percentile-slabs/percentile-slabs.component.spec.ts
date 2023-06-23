import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentileSlabsComponent } from './percentile-slabs.component';

describe('PercentileSlabsComponent', () => {
  let component: PercentileSlabsComponent;
  let fixture: ComponentFixture<PercentileSlabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentileSlabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentileSlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
