import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { BlockQuote } from '../BlockQuote';
import { Text } from '../Text';
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
  it('renders Text as blockquote', () => {
    const wrapper = shallow(<BlockQuote />).shallow();
    expect(wrapper).toMatchElement(<Text as="blockquote" />);
  });

  it('passes all props but isSelected', () => {
    const props = {
      children: 'example',
      test: 2,
      isSelected: false,
    };

    const wrapper = shallow(<BlockQuote {...props} />);
    expect(wrapper).toHaveProp({
      children: props.children,
      test: props.test,
    });

    expect(wrapper).not.toHaveProp('isSelected');
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
        expect.arrayContaining([
          expect.objectContaining({
            color: theme.blockQuote!.fg,
            borderColor: theme.blockQuote!.border,
          }),
        ])
      );
    });

    it('adds a shadow when isSelected is true', () => {
      const theme = useTheme();
      const wrapper = shallow(<BlockQuote isSelected />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ boxShadow: theme.blockQuote!.shadow }]));
    });
  });
});
