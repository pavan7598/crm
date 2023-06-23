import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcampaignComponent } from './viewcampaign.component';

describe('ViewcampaignComponent', () => {
  let component: ViewcampaignComponent;
  let fixture: ComponentFixture<ViewcampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
