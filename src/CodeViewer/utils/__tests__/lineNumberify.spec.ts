import * as path from 'path';

import { lineNumberify } from '../lineNumberify';

describe('lineNumberify util', () => {
  it('handles one-liners', () => {
    const ast = require(path.join(__dirname, '/fixtures/one-liner.json'));
    expect(lineNumberify(JSON.parse(JSON.stringify(ast)))).toMatchSnapshot();
  });

  it('handles multiple lines', () => {
    const ast = require(path.join(__dirname, '/fixtures/one-liner.json'));
    expect(lineNumberify(JSON.parse(JSON.stringify(ast)))).toMatchSnapshot();
  });
});
