import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlFilterComponent } from './sql-filter.component';

describe('SqlFilterComponent', () => {
  let component: SqlFilterComponent;
  let fixture: ComponentFixture<SqlFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
