import { TestBed } from '@angular/core/testing';

import { EventTimeLogService } from './event-time-log.service';

describe('EventTimeLogService', () => {
  let service: EventTimeLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTimeLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
