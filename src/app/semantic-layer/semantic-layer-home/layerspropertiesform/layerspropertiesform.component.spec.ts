import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerspropertiesformComponent } from './layerspropertiesform.component';

describe('LayerspropertiesformComponent', () => {
  let component: LayerspropertiesformComponent;
  let fixture: ComponentFixture<LayerspropertiesformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerspropertiesformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerspropertiesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
