import { IsFuturePipe } from './is-future.pipe';

describe('IsFuturePipe', () => {
  it('create an instance', () => {
    const pipe = new IsFuturePipe();
    expect(pipe).toBeTruthy();
  });
});
