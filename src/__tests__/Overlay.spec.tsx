/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import { IBox } from '../Box';
import { IOverlay } from '../Overlay';
import { ITheme } from '../theme';

describe('Overlay component', () => {
  let Overlay: FunctionComponent<IOverlay>;
  let Box: FunctionComponent<IBox>;

  const theme: Partial<ITheme> = {
    overlay: {
      bg: 'red',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Overlay, Box } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders Box component', () => {
    const wrapper = shallow(<Overlay />);
    expect(wrapper).toMatchElement(<Box />);
  });

  it('applies background from theme', () => {
    const wrapper = shallow(<Overlay />);
    expect(wrapper).toHaveProp(
      'defaultCSS',
      expect.objectContaining({
        backgroundColor: theme.overlay!.bg,
      })
    );
  });

  it('passes all props', () => {
    const props = {
      width: '200px',
      height: '500px',
    };
    const children = <span>a</span>;

    const wrapper = shallow(<Overlay {...props}>{children}</Overlay>);
    expect(wrapper).toHaveProp(props);
    expect(wrapper).toContainReact(children);
  });
});
