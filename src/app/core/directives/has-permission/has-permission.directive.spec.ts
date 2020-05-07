import { HasPermissionDirective } from './has-permission.directive';

describe('HasPermissionDirective', () => {
  it('should create an instance', () => {
    const directive = new HasPermissionDirective(null, null, null, null);
    expect(directive).toBeTruthy();
  });
});
