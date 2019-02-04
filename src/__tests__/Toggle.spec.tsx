import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { ITheme } from '../theme';
import { IToggle } from '../Toggle';

describe('Toggle component', () => {
  let Toggle: React.FunctionComponent<IToggle>;

  const theme: Partial<ITheme> = {
    toggle: {
      fg: 'blue',
      bg: 'red',
      border: 'green',
      checked: 'orange',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Toggle } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('passes all custom props', () => {
    const props = {
      onBlur: jest.fn(),
      onFocus: jest.fn(),
    };

    const wrapper = mount(<Toggle id="4" {...props} />);
    expect(wrapper).toHaveProp(props);
    wrapper.unmount();
  });

  it('calls onChange handler with given state', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Toggle id="4" onChange={onChange} />);
    wrapper.find('input').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(onChange).toHaveBeenLastCalledWith(true);

    wrapper.find('input').simulate('change', {
      target: {
        checked: false,
      },
    });
    expect(onChange).toHaveBeenLastCalledWith(false);
    wrapper.unmount();
  });

  it('passes checked prop to inner Input', () => {
    let wrapper = mount(<Toggle id="4" checked={true} />);
    expect(wrapper.find('input')).toHaveProp('checked', true);
    wrapper.unmount();

    wrapper = mount(<Toggle id="4" checked={false} />);
    expect(wrapper.find('input')).toHaveProp('checked', false);
    wrapper.unmount();
  });
});
