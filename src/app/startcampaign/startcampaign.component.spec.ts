import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartcampaignComponent } from './startcampaign.component';

describe('StartcampaignComponent', () => {
  let component: StartcampaignComponent;
  let fixture: ComponentFixture<StartcampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartcampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
