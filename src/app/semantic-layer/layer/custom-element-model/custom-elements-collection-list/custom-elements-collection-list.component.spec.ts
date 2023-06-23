import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomElementsCollectionListComponent } from './custom-elements-collection-list.component';

describe('CustomElementsCollectionListComponent', () => {
  let component: CustomElementsCollectionListComponent;
  let fixture: ComponentFixture<CustomElementsCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomElementsCollectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomElementsCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
