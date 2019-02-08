import * as React from 'react';

import { shallow } from 'enzyme';
import 'jest-enzyme';
import { Link } from '../Link';
import { Text } from '../Text';
import { useTheme } from '../theme';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    link: {
      fg: '#000',
      hoverFg: '#111',
      visitedFg: '#222',
    },
  }),
}));

describe('Link component', () => {
  it('renders Text as anchor', () => {
    const wrapper = shallow(<Link />).shallow();
    expect(wrapper).toMatchElement(<Text as="a" />);
  });

  it('passes all props', () => {
    const props = {
      children: 'example',
      href: 'www.example.com',
      title: 'example.com',
    };

    const wrapper = shallow(<Link {...props} />);
    expect(wrapper).toHaveProp({
      as: 'a',
      ...props,
    });
  });

  it('can render any tag', () => {
    const as = 'span';
    const wrapper = shallow(<Link as={as} />);
    expect(wrapper).toHaveProp({ as });
  });

  describe('styles', () => {
    it('provides a default styling based on theme', () => {
      const wrapper = shallow(<Link />);
      const theme = useTheme();
      expect(wrapper).toHaveProp('css', [
        { color: theme.link!.fg },
        {
          ':hover': { color: theme.link!.hoverFg },
        },
        {
          ':visited': { color: theme.link!.visitedFg },
        },
      ]);
    });
  });
});
