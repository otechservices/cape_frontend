import { TestBed } from '@angular/core/testing';

import { TypeFileService } from './type-file.service';

describe('TypeFileService', () => {
  let service: TypeFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
