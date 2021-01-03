import { TestBed } from '@angular/core/testing';

import { MathHelpersService } from './math-helpers.service';

describe('MathHelpersService', () => {
  let service: MathHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
