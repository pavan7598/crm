import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionLangingComponent } from './player-selection-langing.component';

describe('PlayerSelectionLangingComponent', () => {
  let component: PlayerSelectionLangingComponent;
  let fixture: ComponentFixture<PlayerSelectionLangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSelectionLangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectionLangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
