import { DeepObjectPipe } from './deep-value-pipe';

describe('DeepValuePipe', () => {
  it('create an instance', () => {
    const pipe = new DeepObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
