import { TestBed } from '@angular/core/testing';

import { PrintQualityService } from './print-quality.service';

describe('PrintQualityService', () => {
  let service: PrintQualityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintQualityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
