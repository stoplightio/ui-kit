/**
 * @jest-environment jsdom
 */
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Table, TableCell, TableHeadCell, TableRow } from '../';

describe('Table', () => {
  it('renders children', () => {
    const children = <tr />;

    expect(shallow(<Table>{children}</Table>)).toContainReact(children);
  });

  it('always renders tbody underneath', () => {
    const wrapper = mount(
      <Table>
        <tr />
      </Table>
    );

    expect(wrapper).toContainMatchingElement('tbody');
    wrapper.unmount();
  });
});

describe('TableRow', () => {
  it('renders children', () => {
    const children = <td />;

    expect(shallow(<TableRow>{children}</TableRow>)).toContainReact(children);
  });
});

describe('TableCell', () => {
  it('renders children', () => {
    const children = <span>some content</span>;

    expect(shallow(<TableCell>{children}</TableCell>)).toContainReact(children);
  });
});

describe('TableHeadCell', () => {
  it('renders children', () => {
    const children = <span>some content</span>;

    expect(shallow(<TableHeadCell>{children}</TableHeadCell>)).toContainReact(children);
  });
});
