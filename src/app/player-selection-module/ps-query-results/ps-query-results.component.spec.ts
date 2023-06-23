import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsQueryResultsComponent } from './ps-query-results.component';

describe('PsQueryResultsComponent', () => {
  let component: PsQueryResultsComponent;
  let fixture: ComponentFixture<PsQueryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsQueryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsQueryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
