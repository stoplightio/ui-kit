import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Select } from '../Select';

describe('Select', () => {
  it('renders select input with menu', () => {
    const wrapper = mount(
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
    );

    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('Option')).toHaveLength(5);
  });
});
