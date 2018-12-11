/* @jsx jsx */

import { jsx } from '@emotion/core';

import { shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import { ILink, IText, ITheme } from '../';

describe('Link component', () => {
  let Link: FunctionComponent<ILink>;
  let Text: FunctionComponent<IText>;
  const theme: Partial<ITheme> = {
    link: {
      fg: '#000',
      hoverFg: '#111',
      visitedFg: '#222',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Link, Text } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders Text component', () => {
    const wrapper = shallow(<Link />);
    expect(wrapper).toMatchElement(<Text />);
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
