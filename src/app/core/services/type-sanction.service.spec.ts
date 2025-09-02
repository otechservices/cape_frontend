import { TestBed } from '@angular/core/testing';

import { TypeSanctionService } from './type-sanction.service';

describe('TypeSanctionService', () => {
  let service: TypeSanctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSanctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
