import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWidgetsComponent } from './status-widgets.component';

describe('StatusWidgetsComponent', () => {
  let component: StatusWidgetsComponent;
  let fixture: ComponentFixture<StatusWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
