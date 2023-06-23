import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterPanelComponent } from './custom-filter-panel.component';

describe('CustomFilterPanelComponent', () => {
  let component: CustomFilterPanelComponent;
  let fixture: ComponentFixture<CustomFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
