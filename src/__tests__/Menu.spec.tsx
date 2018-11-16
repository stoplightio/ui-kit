/**
 * @jest-environment jsdom
 */
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { Icon, IThemeInterface, Menu, MenuItem } from '../';
import { ThemeProvider } from '../utils';

describe('Menu', () => {
  it('renders children', () => {
    const children = <span>test</span>;

    expect(shallow(<Menu>{children}</Menu>)).toContainReact(children);
  });
});

describe('MenuItem', () => {
  it('renders proper Icon', () => {
    const theme = { base: {} } as IThemeInterface;

    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MenuItem icon="globe" />
      </ThemeProvider>
    );

    expect(wrapper.find(Icon)).toExist();
    expect(wrapper.find(Icon)).toHaveProp('icon', 'globe');
    wrapper.unmount();
  });

  it('propagates onClick event', () => {
    const onClick = jest.fn();
    const event = { type: 'click' };
    const wrapper = shallow(<MenuItem onClick={onClick} />);

    wrapper.simulate('click', event);

    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('renders proper title', () => {
    const text = <h4>menu entry</h4>;
    const wrapper = mount(<MenuItem title={text} />);

    expect(wrapper).toContainReact(text);
    wrapper.unmount();
  });

  it('renders subTitle', () => {
    const subText = <h4>sub text</h4>;
    const wrapper = mount(<MenuItem title="text" subTitle={subText} />);

    expect(wrapper).toContainReact(subText);
    wrapper.unmount();
  });

  it('does not render subTitle only if title is missing', () => {
    const subText = <h4>test</h4>;
    const wrapper = mount(<MenuItem subTitle={subText} />);

    expect(wrapper).not.toContainReact(subText);
    wrapper.unmount();
  });
});
