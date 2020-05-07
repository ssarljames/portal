import { TestBed } from '@angular/core/testing';

import { StationUsageLogService } from './station-usage-log.service';

describe('StationUsageLogService', () => {
  let service: StationUsageLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationUsageLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
