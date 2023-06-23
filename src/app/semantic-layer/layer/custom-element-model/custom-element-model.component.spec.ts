import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomElementModelComponent } from './custom-element-model.component';

describe('CustomElementModelComponent', () => {
  let component: CustomElementModelComponent;
  let fixture: ComponentFixture<CustomElementModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomElementModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomElementModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
