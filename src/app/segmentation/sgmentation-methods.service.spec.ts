import { TestBed } from '@angular/core/testing';

import { SgmentationMethodsService } from './sgmentation-methods.service';

describe('SgmentationMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SgmentationMethodsService = TestBed.get(SgmentationMethodsService);
    expect(service).toBeTruthy();
  });
});
