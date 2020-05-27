import { TestBed } from '@angular/core/testing';

import { CollegeService } from './college.service';

describe('CollegeService', () => {
  let service: CollegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
