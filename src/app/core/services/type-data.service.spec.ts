import { TestBed } from '@angular/core/testing';

import { TypeDataService } from './type-data.service';

describe('TypeDataService', () => {
  let service: TypeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
