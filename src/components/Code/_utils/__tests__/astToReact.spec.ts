import { shallow } from 'enzyme';
import * as path from 'path';
import { createElement } from 'react';
import { astToReact } from '../astToReact';

describe('astToReact util', () => {
  it.each(['clike', 'javascript'])('fixture %s', fixture => {
    const ast = require(path.join(__dirname, '../fixtures/', `${fixture}.json`));
    const markup = ast.map(astToReact());
    expect(shallow(createElement('pre', null, markup))).toMatchSnapshot();
  });
});
