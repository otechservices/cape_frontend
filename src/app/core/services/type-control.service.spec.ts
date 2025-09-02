import { TestBed } from '@angular/core/testing';

import { TypeControlService } from './type-control.service';

describe('TypeControlService', () => {
  let service: TypeControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
