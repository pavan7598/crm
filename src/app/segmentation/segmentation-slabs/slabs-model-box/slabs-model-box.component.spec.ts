import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlabsModelBoxComponent } from './slabs-model-box.component';

describe('SlabsModelBoxComponent', () => {
  let component: SlabsModelBoxComponent;
  let fixture: ComponentFixture<SlabsModelBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlabsModelBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabsModelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
