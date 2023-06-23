import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWidgetsComponent } from './schedule-widgets.component';

describe('ScheduleWidgetsComponent', () => {
  let component: ScheduleWidgetsComponent;
  let fixture: ComponentFixture<ScheduleWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
