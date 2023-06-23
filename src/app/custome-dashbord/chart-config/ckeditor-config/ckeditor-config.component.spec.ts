import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeditorConfigComponent } from './ckeditor-config.component';

describe('CkeditorConfigComponent', () => {
  let component: CkeditorConfigComponent;
  let fixture: ComponentFixture<CkeditorConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CkeditorConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeditorConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
