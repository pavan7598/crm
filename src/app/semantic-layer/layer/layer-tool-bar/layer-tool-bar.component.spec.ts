import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerToolBarComponent } from './layer-tool-bar.component';

describe('LayerToolBarComponent', () => {
  let component: LayerToolBarComponent;
  let fixture: ComponentFixture<LayerToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
