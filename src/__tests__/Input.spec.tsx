import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import AutosizeInput from 'react-input-autosize';

import { Input } from '../Input';
import { useTheme } from '../theme';

jest.mock('../theme', () => ({
  useTheme: jest.fn().mockReturnValue({
    input: {
      fg: 'black',
      bg: 'pink',
      border: 'red',
    },
  }),
}));

describe('Input component', () => {
  it('passes className as inputClassName to AutosizeInput component', () => {
    const wrapper = mount(<Input autosize />);

    expect(wrapper.find(AutosizeInput)).toHaveProp('inputClassName', expect.stringMatching('css-'));
    wrapper.unmount();
  });

  describe('styles', () => {
    // TODO: why does this not work?
    it.skip('provides a default styling based on theme, and passes custom css through', () => {
      const theme = useTheme();
      const wrapper = mount(<Input css={{ opacity: 0.5 }} />);

      expect(wrapper).toHaveProp(
        'css',
        expect.arrayContaining([
          expect.objectContaining({
            backgroundColor: theme.input!.bg,
            color: theme.input!.fg,
            border: `1px solid ${theme.input!.border}`,
          }),
          {
            opacity: 0.5,
          },
        ])
      );
    });
  });
});
