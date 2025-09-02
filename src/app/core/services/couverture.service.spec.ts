import { TestBed } from '@angular/core/testing';

import { CouvertureService } from './couverture.service';

describe('CouvertureService', () => {
  let service: CouvertureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouvertureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
