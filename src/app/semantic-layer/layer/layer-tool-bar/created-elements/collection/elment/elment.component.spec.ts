import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElmentComponent } from './elment.component';

describe('ElmentComponent', () => {
  let component: ElmentComponent;
  let fixture: ComponentFixture<ElmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
