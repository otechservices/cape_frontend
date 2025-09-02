import { TestBed } from '@angular/core/testing';

import { TypeSousGarderieService } from './type-sous-garderie.service';

describe('TypeSousGarderieService', () => {
  let service: TypeSousGarderieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSousGarderieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
