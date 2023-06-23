import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColectionModelComponent } from './add-colection-model.component';

describe('AddColectionModelComponent', () => {
  let component: AddColectionModelComponent;
  let fixture: ComponentFixture<AddColectionModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColectionModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColectionModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
