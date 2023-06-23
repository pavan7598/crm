import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreportsComponent } from './newreports.component';

describe('NewreportsComponent', () => {
  let component: NewreportsComponent;
  let fixture: ComponentFixture<NewreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
