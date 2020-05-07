import { TestBed } from '@angular/core/testing';

import { UserPermissionsService } from './user-permissions.service';

describe('UserPermissionsService', () => {
  let service: UserPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
