import { TestBed } from '@angular/core/testing';

import { PlayerSelectionService } from './player-selection.service';

describe('PlayerSelectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerSelectionService = TestBed.get(PlayerSelectionService);
    expect(service).toBeTruthy();
  });
});
