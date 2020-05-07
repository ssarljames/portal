import { TestBed } from '@angular/core/testing';

import { PaperSizeService } from './paper-size.service';

describe('PaperSizeService', () => {
  let service: PaperSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
