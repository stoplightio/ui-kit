import { mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { ICheckbox } from '../Checkbox';
import { ITheme } from '../theme';

describe('Checkbox component', () => {
  let Checkbox: React.FunctionComponent<ICheckbox>;

  const theme: Partial<ITheme> = {
    checkbox: {
      fg: 'blue',
      bg: 'red',
      checked: 'green',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Checkbox } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('passes all custom props', () => {
    const props = {
      onBlur: jest.fn(),
      onFocus: jest.fn(),
    };

    const wrapper = mount(<Checkbox id="4" {...props} />);
    expect(wrapper).toHaveProp(props);
    wrapper.unmount();
  });

  it('renders svg icon', () => {
    const wrapper = mount(<Checkbox id="4" />);
    expect(wrapper.find('svg')).toExist();
    wrapper.unmount();
  });

  it('calls onChange handler with given state', () => {
    const onChange = jest.fn();

    const wrapper = mount(<Checkbox id="4" onChange={onChange} />);
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
    let wrapper = mount(<Checkbox id="4" checked={true} />);
    expect(wrapper.find('input')).toHaveProp('checked', true);
    wrapper.unmount();

    wrapper = mount(<Checkbox id="4" checked={false} />);
    expect(wrapper.find('input')).toHaveProp('checked', false);
    wrapper.unmount();
  });
});
