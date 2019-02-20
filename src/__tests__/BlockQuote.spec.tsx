import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { BlockQuote } from '../BlockQuote';
import { Box } from '../Box';
import { useTheme } from '../theme';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    blockQuote: {
      fg: '#000',
      border: '#fff',
      shadow: '0 2px 5px #000',
    },
  }),
}));

describe('BlockQuote component', () => {
  it('renders Box as blockquote', () => {
    const wrapper = shallow(<BlockQuote />).shallow();
    expect(wrapper).toMatchElement(<Box as="blockquote" />);
  });

  it('can render any tag', () => {
    const as = 'h3';
    const wrapper = shallow(<BlockQuote as={as} />);
    expect(wrapper).toHaveProp({ as });
  });

  describe('styles', () => {
    it('provides a default styling based on theme', () => {
      const theme = useTheme();
      const wrapper = shallow(<BlockQuote />);
      expect(wrapper).toHaveProp(
        'css',
        expect.objectContaining({
          backgroundColor: theme.blockQuote!.bg,
          borderLeft: expect.stringContaining(theme.blockQuote!.border),
          boxShadow: theme.blockQuote!.shadow,
        })
      );
    });
  });
});
