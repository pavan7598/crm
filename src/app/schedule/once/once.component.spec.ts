import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnceComponent } from './once.component';

describe('OnceComponent', () => {
  let component: OnceComponent;
  let fixture: ComponentFixture<OnceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
