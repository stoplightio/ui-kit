import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { ITable, ITableCell, ITableRow } from '../Table';
import { ITheme } from '../theme';

describe('Table component', () => {
  let Table: React.FunctionComponent<ITable>;

  const theme: Partial<ITheme> = {
    table: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      shadow: '0 0 5px',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Table } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('always renders table', () => {
    const wrapper = shallow(<Table as="span" />);
    expect(wrapper).toHaveProp('as', 'table');
  });

  it('renders children under tbody', () => {
    const wrapper = shallow(<Table>content</Table>);
    expect(wrapper).toContainReact(<tbody>content</tbody>);
  });

  it('passes all props', () => {
    const props = {
      href: 'www.example.com',
      title: 'example.com',
    };

    const wrapper = shallow(<Table {...props} />);
    expect(wrapper).toHaveProp(props);
  });
});

describe('TableRow component', () => {
  let TableRow: React.FunctionComponent<ITableRow>;

  const theme: Partial<ITheme> = {
    table: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      shadow: '0 0 5px',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ TableRow } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('always renders table tow', () => {
    const wrapper = shallow(<TableRow as="span" />);
    expect(wrapper).toHaveProp('as', 'tr');
  });

  it('passes all props', () => {
    const props = {
      children: 'children!',
      href: 'www.example.com',
      title: 'example.com',
    };

    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper).toHaveProp(props);
  });
});

describe('TableCell component', () => {
  let TableCell: React.FunctionComponent<ITableCell>;

  const theme: Partial<ITheme> = {
    table: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      shadow: '0 0 5px',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ TableCell } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders td by default', () => {
    const wrapper = shallow(<TableCell as="td" />);
    expect(wrapper).toHaveProp('as', 'td');
  });

  it('may render th', () => {
    const wrapper = shallow(<TableCell as="th" />);
    expect(wrapper).toHaveProp('as', 'th');
  });

  it('passes all props', () => {
    const props = {
      children: 'children!',
      href: 'www.example.com',
      title: 'example.com',
    };

    const wrapper = shallow(<TableCell {...props} />);
    expect(wrapper).toHaveProp(props);
  });
});
