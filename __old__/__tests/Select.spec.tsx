import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Select } from '../Select';
import { baseTheme } from '../theme';
import { ThemeProvider } from '../utils';

describe('Select', () => {
  it('renders select input with menu', () => {
    const wrapper = mount(
      <ThemeProvider theme={baseTheme}>
        <Select
          menuIsOpen={true}
          options={[
            { label: 'option1', value: 1 },
            { label: 'option2', value: 2 },
            { label: 'option3', value: 3 },
            { label: 'option4', value: 4 },
            { label: 'option5', value: 5 },
          ]}
        />
      </ThemeProvider>
    );

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('div[role="option"]')).toHaveLength(5);
  });
});
