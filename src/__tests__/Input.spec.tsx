import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import AutosizeInput from 'react-input-autosize';

import { IInput } from '../Input';
import { ITheme } from '../theme';

describe('Input component', () => {
  let Input: React.FunctionComponent<IInput>;

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
