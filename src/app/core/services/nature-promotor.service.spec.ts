import { TestBed } from '@angular/core/testing';

import { NaturePromotorService } from './nature-promotor.service';

describe('NaturePromotorService', () => {
  let service: NaturePromotorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturePromotorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
