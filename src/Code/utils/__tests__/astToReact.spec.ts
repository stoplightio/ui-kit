import { shallow } from 'enzyme';
import * as fs from 'fs';
import * as path from 'path';
import { createElement } from 'react';
import { astToReact } from '../astToReact';

describe('astToReact util', () => {
  it.each(['clike', 'javascript'])('fixture %s', fixture => {
    const ast = JSON.parse(fs.readFileSync(path.join(__dirname, '../fixtures/', `${fixture}.json`), 'utf-8'));
    const markup = ast.map(astToReact());
    expect(shallow(createElement('pre', null, markup))).toMatchSnapshot();
  });
});
