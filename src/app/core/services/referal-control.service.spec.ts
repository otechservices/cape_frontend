import { TestBed } from '@angular/core/testing';

import { ReferalControlService } from './referal-control.service';

describe('ReferalControlService', () => {
  let service: ReferalControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferalControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
