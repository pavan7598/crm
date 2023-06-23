import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricCountComponent } from './metric-count.component';

describe('MetricCountComponent', () => {
  let component: MetricCountComponent;
  let fixture: ComponentFixture<MetricCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
