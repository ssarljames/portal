import { TestBed } from '@angular/core/testing';

import { ServiceTransactionService } from './service-transaction.service';

describe('ServiceTransactionService', () => {
  let service: ServiceTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
