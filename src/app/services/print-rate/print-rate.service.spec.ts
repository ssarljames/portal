import { TestBed } from '@angular/core/testing';

import { PrintRateService } from './print-rate.service';

describe('PrintRateService', () => {
  let service: PrintRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
