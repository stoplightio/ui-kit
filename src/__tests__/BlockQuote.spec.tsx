/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import { IBlockQuote, IText, ITheme } from '../';

describe('BlockQuote component', () => {
  let BlockQuote: FunctionComponent<IBlockQuote>;
  let Text: FunctionComponent<IText>;
  const theme: Partial<ITheme> = {
    blockQuote: {
      fg: '#000',
      border: '#fff',
      shadow: '0 2px 5px #000',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ BlockQuote, Text } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders Text component', () => {
    const wrapper = shallow(<BlockQuote />);
    expect(wrapper).toMatchElement(<Text />);
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
      const wrapper = shallow(<BlockQuote isSelected />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ boxShadow: theme.blockQuote!.shadow }]));
    });
  });
});
