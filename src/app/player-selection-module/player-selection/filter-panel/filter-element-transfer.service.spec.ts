import { TestBed } from '@angular/core/testing';

import { FilterElementTransferService } from './filter-element-transfer.service';

describe('FilterElementTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterElementTransferService = TestBed.get(FilterElementTransferService);
    expect(service).toBeTruthy();
  });
});
