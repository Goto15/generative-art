import { TestBed } from '@angular/core/testing';

import { Genuary2021Service } from './genuary2021.service';

describe('Genuary2021Service', () => {
  let service: Genuary2021Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Genuary2021Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
