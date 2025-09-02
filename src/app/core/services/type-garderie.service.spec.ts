import { TestBed } from '@angular/core/testing';

import { TypeGarderieService } from './type-garderie.service';

describe('TypeGarderieService', () => {
  let service: TypeGarderieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeGarderieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
