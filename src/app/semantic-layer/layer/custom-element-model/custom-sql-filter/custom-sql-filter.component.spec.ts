import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSqlFilterComponent } from './custom-sql-filter.component';

describe('CustomSqlFilterComponent', () => {
  let component: CustomSqlFilterComponent;
  let fixture: ComponentFixture<CustomSqlFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSqlFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSqlFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
