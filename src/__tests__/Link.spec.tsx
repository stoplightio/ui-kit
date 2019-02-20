import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Box } from '../Box';
import { Link } from '../Link';
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
  it('renders Box as anchor', () => {
    const wrapper = shallow(<Link />).shallow();
    expect(wrapper).toMatchElement(<Box as="a" />);
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

  describe('styles', () => {
    it('provides a default styling based on theme', () => {
      const wrapper = shallow(<Link />);
      const theme = useTheme();
      expect(wrapper).toHaveProp('css', [
        expect.objectContaining({ color: theme.link!.fg }),
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
