import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropElementsComponent } from './drop-elements.component';

describe('DropElementsComponent', () => {
  let component: DropElementsComponent;
  let fixture: ComponentFixture<DropElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
