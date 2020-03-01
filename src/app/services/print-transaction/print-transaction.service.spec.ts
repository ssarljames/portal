import { TestBed } from '@angular/core/testing';

import { PrintTransactionService } from './print-transaction.service';

describe('PrintTransactionService', () => {
  let service: PrintTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
