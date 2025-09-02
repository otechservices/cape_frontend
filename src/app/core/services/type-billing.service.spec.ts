import { TestBed } from '@angular/core/testing';

import { TypeBillingService } from './type-billing.service';

describe('TypeBillingService', () => {
  let service: TypeBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
