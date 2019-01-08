/* @jsx jsx */

import { jsx } from '@emotion/core';
import { mount } from 'enzyme';
import 'jest-enzyme';

import { Box } from '../';

describe('Box component', () => {
  it('forwards refs', () => {
    const ref = jest.fn();
    const wrapper = mount(<Box ref={ref} />);
    expect(ref).toHaveBeenLastCalledWith(expect.any(Object));
    wrapper.unmount();
  });
});
