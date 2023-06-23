import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalDistributionComponent } from './normal-distribution.component';

describe('NormalDistributionComponent', () => {
  let component: NormalDistributionComponent;
  let fixture: ComponentFixture<NormalDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
