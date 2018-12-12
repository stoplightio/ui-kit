/* @jsx jsx */

import { jsx } from '@emotion/core';
import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { FunctionComponent } from 'react';

import * as _solidIcons from '@fortawesome/free-solid-svg-icons';

import { Icon, IconLibrary } from '../Icon';
import { IMenu, IMenuItem, IMenuItemProps } from '../Menu';
import { ITheme } from '../theme';

describe('Menu component', () => {
  let Menu: FunctionComponent<IMenu>;
  let MenuItem: FunctionComponent<IMenuItem>;
  let useStateSpy: jest.SpyInstance;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      hoverBg: 'red',
      hoverFg: 'blue',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    jest.useFakeTimers();
    useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockReturnValue([true, () => null]);
    ({ Menu, MenuItem } = await import('../'));
  });

  afterEach(() => {
    useStateSpy.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
    useStateSpy.mockRestore();
    jest.unmock('../theme');
  });

  it('renders items', () => {
    const children = <span key="foo">test</span>;

    const wrapper = shallow(<Menu menuItems={[{ title: children }, { title: 'second elem' }]} />);

    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });

  it('accepts custom renderTrigger', () => {
    const trigger = <span key="menu-trigger">test</span>;
    const renderTrigger = jest.fn(() => trigger);

    const wrapper = shallow(<Menu renderTrigger={renderTrigger} menuItems={[]} />);

    expect(renderTrigger).toHaveBeenCalled();
    expect(wrapper).toHaveText('test');
  });

  it('accepts custom renderMenu', () => {
    const renderMenu = jest.fn(() => 'foo');
    const renderMenuItem = jest.fn();
    const menuItems = [{ title: 'test', key: '1' }, { title: 'second elem', key: '2' }];

    const wrapper = shallow(<Menu renderMenu={renderMenu} renderMenuItem={renderMenuItem} menuItems={menuItems} />);

    expect(renderMenu).toHaveBeenCalledWith(expect.any(Object), menuItems, renderMenuItem);
    expect(wrapper).toHaveText('foo');
  });

  it('accepts custom renderMenuItem', () => {
    const renderMenuItem = jest.fn((item: IMenuItemProps) => item.title);
    const menuItems = [{ title: 'test', key: '1' }, { title: 'second elem', key: '2' }];

    const wrapper = shallow(<Menu renderMenuItem={renderMenuItem} menuItems={menuItems} />);

    expect(renderMenuItem).toHaveBeenCalledWith(menuItems[0], 0, menuItems);
    expect(renderMenuItem).toHaveBeenLastCalledWith(menuItems[1], 1, menuItems);

    expect(wrapper).toHaveText(menuItems.map(({ title }) => title).join(''));
  });

  describe('on mouseenter', () => {
    let setStateSpy: jest.SpyInstance;

    beforeEach(() => {
      setStateSpy = jest.fn();
      useStateSpy.mockReturnValueOnce([false, setStateSpy]);
    });

    it('sets display state to true', () => {
      const wrapper = shallow(<Menu menuItems={[]} />);

      wrapper.simulate('mouseenter');

      expect(setStateSpy).toHaveBeenCalledWith(true);
    });

    it('clears timeout', () => {
      const wrapper = shallow(<Menu menuItems={[]} />);

      wrapper.simulate('mouseenter');

      expect(clearTimeout).toHaveBeenCalled();
    });
  });

  describe('on mouseleave', () => {
    let setStateSpy: jest.SpyInstance;

    beforeEach(() => {
      setStateSpy = jest.fn();
      useStateSpy.mockReturnValueOnce([true, setStateSpy]);
    });

    it('sets timeout', () => {
      const wrapper = shallow(<Menu menuItems={[]} />);

      wrapper.simulate('mouseleave');

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 200, false);
    });

    it('hides menu after timeout', () => {
      useStateSpy.mockReturnValueOnce([true, setStateSpy]);

      const wrapper = shallow(<Menu menuItems={[]} />);

      wrapper.simulate('mouseleave');
      jest.runTimersToTime(300);

      expect(setStateSpy).toHaveBeenCalledWith(false);
    });
  });
});

describe('MenuItem component', () => {
  let MenuItem: FunctionComponent<IMenuItem>;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      border: '#fff',
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
