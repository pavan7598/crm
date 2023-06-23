import { TestBed } from '@angular/core/testing';

import { JsPlumbService } from './js-plumb.service';

describe('JsPlumbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsPlumbService = TestBed.get(JsPlumbService);
    expect(service).toBeTruthy();
  });
});
