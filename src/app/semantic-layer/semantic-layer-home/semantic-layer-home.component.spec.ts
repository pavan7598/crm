import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticLayerHomeComponent } from './semantic-layer-home.component';

describe('SemanticLayerHomeComponent', () => {
  let component: SemanticLayerHomeComponent;
  let fixture: ComponentFixture<SemanticLayerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticLayerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticLayerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
