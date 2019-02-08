import { mount } from 'enzyme';

import 'jest-enzyme';
import * as React from 'react';

import { Box } from '../';

describe('Box component', () => {
  it('forwards refs', () => {
    const ref = jest.fn();
    const wrapper = mount(<Box ref={ref} />);
    expect(ref).toHaveBeenLastCalledWith(expect.any(Object));
    wrapper.unmount();
  });

  it('filters out unknown properties', () => {
    const ref = jest.fn();
    const wrapper = mount(<Box ref={ref} node="dd" />);

    expect(wrapper.find('div')).not.toHaveProp('node');
    wrapper.unmount();
  });
});
