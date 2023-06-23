import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInfoComponent } from './count-info.component';

describe('CountInfoComponent', () => {
  let component: CountInfoComponent;
  let fixture: ComponentFixture<CountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
