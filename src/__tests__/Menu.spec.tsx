import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import * as _solidIcons from '@fortawesome/free-solid-svg-icons';

import { Icon, IconLibrary, IMenuItemProps, IThemeInterface, Menu, MenuItem } from '../index';
import { ThemeProvider } from '../utils';

describe('Menu', () => {
  it('renders items', () => {
    const children = <span>test</span>;

    const wrapper = mount(<Menu menuItems={[{ title: children }, { title: 'second elem' }]} />);

    expect(wrapper.find(MenuItem)).toHaveLength(2);
    wrapper.unmount();
  });

  it('accepts custom renderTrigger', () => {
    const trigger = <span>test</span>;
    const renderTrigger = jest.fn(() => trigger);

    const wrapper = mount(<Menu renderTrigger={renderTrigger} menuItems={[]} />);

    expect(renderTrigger).toHaveBeenCalled();
    expect(wrapper).toHaveText('test');
    wrapper.unmount();
  });

  it('accepts custom renderMenu', () => {
    const renderMenu = jest.fn(() => 'foo');
    const renderMenuItem = jest.fn();
    const menuItems = [{ title: 'test' }, { title: 'second elem' }];

    const wrapper = mount(<Menu renderMenu={renderMenu} renderMenuItem={renderMenuItem} menuItems={menuItems} />);

    expect(renderMenu).toHaveBeenCalledWith(expect.any(Object), menuItems, renderMenuItem);
    expect(wrapper).toHaveText('foo');
    wrapper.unmount();
  });

  it('accepts custom renderMenuItem', () => {
    const renderMenuItem = jest.fn((item: IMenuItemProps) => item.title);
    const menuItems = [{ title: 'test' }, { title: 'second elem' }];

    const wrapper = mount(<Menu renderMenuItem={renderMenuItem} menuItems={menuItems} />);

    expect(renderMenuItem).toHaveBeenCalledWith(menuItems[0], 0, menuItems);
    expect(renderMenuItem).toHaveBeenLastCalledWith(menuItems[1], 1, menuItems);

    expect(wrapper).toHaveText(menuItems.map(({ title }) => title).join(''));
    wrapper.unmount();
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
