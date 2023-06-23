import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedElementsComponent } from './created-elements.component';

describe('CreatedElementsComponent', () => {
  let component: CreatedElementsComponent;
  let fixture: ComponentFixture<CreatedElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
