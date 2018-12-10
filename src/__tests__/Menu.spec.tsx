/* @jsx jsx */

import { jsx } from '@emotion/core';
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import { FunctionComponent } from 'react';

import * as _solidIcons from '@fortawesome/free-solid-svg-icons';

import { Icon, IconLibrary } from '../Icon';
import { IMenu, IMenuItem, IMenuItemProps } from '../Menu';
import { ITheme } from '../theme';

describe('Menu component', () => {
  let Menu: FunctionComponent<IMenu>;
  let MenuItem: FunctionComponent<IMenuItem>;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      borderColor: '#fff',
      bg: '#111',
      hoverBg: 'red',
      hoverFg: 'blue',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ Menu, MenuItem } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

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

describe('MenuItem component', () => {
  let MenuItem: FunctionComponent<IMenuItem>;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      borderColor: '#fff',
      bg: '#111',
      hoverBg: 'red',
      hoverFg: 'blue',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    ({ MenuItem } = await import('../'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('renders proper Icon', () => {
    const { fas } = _solidIcons;

    IconLibrary.add(fas);

    const wrapper = shallow(<MenuItem icon="globe" />);

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
    const wrapper = shallow(<MenuItem title="text" subtitle={subText} />);

    expect(wrapper).toContainReact(subText);
  });

  it('does render subTitle only if title is missing', () => {
    const subText = <h4>test</h4>;
    const wrapper = shallow(<MenuItem subtitle={subText} />);

    expect(wrapper).toContainReact(subText);
    wrapper.unmount();
  });
});
