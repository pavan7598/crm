import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetUsersComponent } from './target-users.component';

describe('TargetUsersComponent', () => {
  let component: TargetUsersComponent;
  let fixture: ComponentFixture<TargetUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
