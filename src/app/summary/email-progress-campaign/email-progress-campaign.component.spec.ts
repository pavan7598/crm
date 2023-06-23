import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailProgressCampaignComponent } from './email-progress-campaign.component';

describe('EmailProgressCampaignComponent', () => {
  let component: EmailProgressCampaignComponent;
  let fixture: ComponentFixture<EmailProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailProgressCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
