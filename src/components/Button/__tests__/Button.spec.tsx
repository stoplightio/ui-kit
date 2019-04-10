import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Button } from '../Button';

describe('Button component', () => {
  it.only('renders', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
