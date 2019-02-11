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

  it('does not filter out unknown properties when custom component is given', () => {
    const customComponent = jest.fn(() => null);
    const wrapper = mount(<Box ref={jest.fn()} as={customComponent} attributes="abc" />);

    expect(customComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        attributes: 'abc',
      }),
      expect.anything()
    );
    wrapper.unmount();
  });
});
