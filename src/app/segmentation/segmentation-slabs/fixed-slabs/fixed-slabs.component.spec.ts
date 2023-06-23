import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSlabsComponent } from './fixed-slabs.component';

describe('FixedSlabsComponent', () => {
  let component: FixedSlabsComponent;
  let fixture: ComponentFixture<FixedSlabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSlabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
