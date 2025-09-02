import { TestBed } from '@angular/core/testing';

import { CfeService } from './cfe.service';

describe('CfeService', () => {
  let service: CfeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
