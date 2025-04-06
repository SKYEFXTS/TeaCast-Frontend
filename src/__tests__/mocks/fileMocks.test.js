import 'util';
import styleMock from '../../__mocks__/styleMock';
import fileMock from '../../__mocks__/fileMock';

describe('Jest File Mocks', () => {
  it('should have an empty object for style files', () => {
    expect(styleMock).toEqual({});
  });

  it('should have a string stub for file imports', () => {
    expect(fileMock).toBe('test-file-stub');
  });
});