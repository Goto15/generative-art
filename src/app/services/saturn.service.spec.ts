import { TestBed } from '@angular/core/testing';

import { SaturnService } from './saturn.service';

describe('SaturnService', () => {
  let service: SaturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
