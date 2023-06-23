import { TestBed, async, inject } from '@angular/core/testing';

import { LayerDeactivateGuard } from './layer-deactivate.guard';

describe('LayerDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayerDeactivateGuard]
    });
  });

  it('should ...', inject([LayerDeactivateGuard], (guard: LayerDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
