import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCountComponent } from './query-count.component';

describe('QueryCountComponent', () => {
  let component: QueryCountComponent;
  let fixture: ComponentFixture<QueryCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
