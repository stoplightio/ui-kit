import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import * as _solidIcons from '@fortawesome/free-solid-svg-icons';

import { Icon, IconLibrary } from '../Icon';
import { IMenu, IMenuItem, IMenuItemProps } from '../Menu';
import { ITheme } from '../theme';

describe('Menu component', () => {
  let Menu: React.FunctionComponent<IMenu>;
  let MenuItem: React.FunctionComponent<IMenuItem>;
  let useHoverMock: jest.MockInstance<any>;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      hoverBg: 'red',
    },
  };

  beforeAll(async () => {
    jest.mock('../theme', () => ({
      useTheme: jest.fn().mockReturnValue(theme),
    }));

    jest.mock('../hooks/useHover', () => ({
      useHover: jest.fn().mockReturnValue([]),
    }));

    // @ts-ignore
    ({ useHover: useHoverMock } = await import('../hooks/useHover'));

    jest.useFakeTimers();
    ({ Menu, MenuItem } = await import('../'));
  });

  afterEach(() => {
    useHoverMock.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.unmock('../theme');
    jest.unmock('../hooks/useHover');
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

    expect(wrapper.html()).toContain(menuItems.map(({ title }) => title).join(''));
  });

  it('attaches hover handlers', () => {
    const handlers = {
      onMouseEnter() {
        /* nada */
      },
      onMouseLeave() {
        /* nada */
      },
    };

    useHoverMock.mockReturnValue([false, handlers]);
    const wrapper = shallow(<Menu menuItems={[]} />);
    expect(wrapper).toHaveProp(handlers);
  });

  describe('on hover', () => {
    beforeEach(() => {
      useHoverMock.mockReturnValueOnce([true]);
    });

    it('displays list', () => {
      const renderMenu = jest.fn();
      shallow(<Menu menuItems={[]} renderMenu={renderMenu} />);

      expect(renderMenu).toHaveBeenCalled();
    });
  });
});

describe('MenuItem component', () => {
  let MenuItem: React.FunctionComponent<IMenuItem>;

  const theme: Partial<ITheme> = {
    menu: {
      fg: '#000',
      border: '#fff',
      bg: '#111',
      hoverBg: 'red',
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
