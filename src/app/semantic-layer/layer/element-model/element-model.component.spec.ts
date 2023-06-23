import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementModelComponent } from './element-model.component';

describe('ElementModelComponent', () => {
  let component: ElementModelComponent;
  let fixture: ComponentFixture<ElementModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
