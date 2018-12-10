/* @jsx jsx */

import { jsx } from '@emotion/core';

import { mount } from 'enzyme';
import 'jest-enzyme';

import { Table, TableCell, TableRow } from '../';

describe('Table component', () => {
  it('renders children', () => {
    const children = <tr />;

    expect(mount(<Table>{children}</Table>)).toContainReact(children);
  });

  it('always renders tbody underneath', () => {
    const wrapper = mount(<Table />);

    expect(wrapper).toContainMatchingElement('tbody');
    wrapper.unmount();
  });
});

describe('TableRow component', () => {
  it('renders children', () => {
    const children = <td />;

    expect(mount(<TableRow>{children}</TableRow>)).toContainReact(children);
  });
});

describe('TableCell component', () => {
  it('renders children', () => {
    const children = <span>some content</span>;

    expect(mount(<TableCell>{children}</TableCell>)).toContainReact(children);
  });
});
