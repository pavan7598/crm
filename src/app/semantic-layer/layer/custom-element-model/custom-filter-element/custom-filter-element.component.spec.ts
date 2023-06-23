import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterElementComponent } from './custom-filter-element.component';

describe('CustomFilterElementComponent', () => {
  let component: CustomFilterElementComponent;
  let fixture: ComponentFixture<CustomFilterElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFilterElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
