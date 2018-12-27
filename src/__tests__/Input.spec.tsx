/* @jsx jsx */

import { jsx } from '@emotion/core';
import { mount } from 'enzyme';
import 'jest-enzyme';
import AutosizeInput from 'react-input-autosize';

import { FunctionComponent } from 'react';
import { IInput } from '../Input';
import { ITheme } from '../theme';

describe('Input component', () => {
  let Input: FunctionComponent<IInput>;

  const theme: Partial<ITheme> = {
    input: {
      fg: 'black',
      bg: 'red',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Input } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('passes className as inputClassName to AutosizeInput component', () => {
    const wrapper = mount(<Input autosize />);

    expect(wrapper.find(AutosizeInput)).toHaveProp('inputClassName', expect.stringMatching('css-'));
    wrapper.unmount();
  });
});
