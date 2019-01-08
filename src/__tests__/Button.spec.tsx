/* @jsx jsx */

import { jsx } from '@emotion/core';
import { shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import { IBox, IButton, ITheme } from '../';

describe('Button component', () => {
  let Button: FunctionComponent<IButton>;
  let Box: FunctionComponent<IBox>;
  const theme: Partial<ITheme> = {
    button: {
      fg: '#000',
      bg: '#fff',
      hoverBg: '0 2px 5px #000',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Button } = await import('../Button'));
    ({ Box } = await import('../Box'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders Box as button', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchElement(<Box as="button" />);
  });

  it('can render any tag', () => {
    const as = 'h3';
    const wrapper = shallow(<Button as={as} />);
    expect(wrapper).toHaveProp({ as });
  });

  it('passes disabled to Box', () => {
    const wrapper = shallow(<Button disabled />);
    expect(wrapper).toHaveProp('disabled', true);
  });
});
