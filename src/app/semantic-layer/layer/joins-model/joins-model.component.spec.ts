import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinsModelComponent } from './joins-model.component';

describe('JoinsModelComponent', () => {
  let component: JoinsModelComponent;
  let fixture: ComponentFixture<JoinsModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinsModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
