/**
 * @jest-environment jsdom
 */
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import * as _solidIcons from '@fortawesome/free-solid-svg-icons';

import { Icon, IconLibrary, IThemeInterface, Menu, MenuItem } from '../index';
import { ThemeProvider } from '../utils';

describe('Menu', () => {
  it('renders items', () => {
    const children = <span>test</span>;

    const wrapper = shallow(<Menu menuItems={[{ title: children }, { title: 'second elem' }]} />);

    expect(wrapper.children().length).toBe(2);
  });
});

describe('MenuItem', () => {
  // TODO fixme fails because we need to register the icons
  it('renders proper Icon', () => {
    const theme = { base: {} } as IThemeInterface;
    const { fas } = _solidIcons;

    IconLibrary.add(fas);

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
    const wrapper = mount(<MenuItem title="text" subtitle={subText} />);

    expect(wrapper).toContainReact(subText);
    wrapper.unmount();
  });

  it('does render subTitle only if title is missing', () => {
    const subText = <h4>test</h4>;
    const wrapper = mount(<MenuItem subtitle={subText} />);

    expect(wrapper).toContainReact(subText);
    wrapper.unmount();
  });
});
