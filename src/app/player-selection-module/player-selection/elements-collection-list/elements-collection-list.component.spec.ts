import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsCollectionListComponent } from './elements-collection-list.component';

describe('ElementsCollectionListComponent', () => {
  let component: ElementsCollectionListComponent;
  let fixture: ComponentFixture<ElementsCollectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsCollectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
