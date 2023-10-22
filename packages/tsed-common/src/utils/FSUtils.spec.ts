import { promises } from 'fs';

import { FSUtils } from './FSUtils';

describe('FSUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readFile', () => {
    it('Should be called without mandatory parameters', async () => {
      const spy = jest.spyOn(promises, 'readFile').mockImplementation();

      await FSUtils.readFile('/data/test/jest.js');

      expect(spy).toBeCalledWith('/data/test/jest.js');
    });
  });
});
