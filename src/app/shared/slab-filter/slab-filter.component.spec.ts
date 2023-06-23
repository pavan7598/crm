import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabFilterComponent } from './slab-filter.component';

describe('SlabFilterComponent', () => {
  let component: SlabFilterComponent;
  let fixture: ComponentFixture<SlabFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlabFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
