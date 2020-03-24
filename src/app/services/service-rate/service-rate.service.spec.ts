import { TestBed } from '@angular/core/testing';

import { ServiceRateService } from './service-rate.service';

describe('PrintRateService', () => {
  let service: ServiceRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
