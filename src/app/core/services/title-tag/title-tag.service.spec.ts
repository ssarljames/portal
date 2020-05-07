import { TestBed } from '@angular/core/testing';

import { TitleTagService } from './title-tag.service';

describe('TitleTagService', () => {
  let service: TitleTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
