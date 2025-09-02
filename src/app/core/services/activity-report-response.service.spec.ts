import { TestBed } from '@angular/core/testing';

import { ActivityReportResponseService } from './activity-report-response.service';

describe('ActivityReportResponseService', () => {
  let service: ActivityReportResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityReportResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
