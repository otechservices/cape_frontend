import { TestBed } from '@angular/core/testing';

import { TypeAvisService } from './type-avis.service';

describe('TypeAvisService', () => {
  let service: TypeAvisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAvisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
