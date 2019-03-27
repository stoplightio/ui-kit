import { mount, shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { ContextMenu as ReactContextMenu } from 'react-contextmenu';

import { ITheme } from '../theme';

import { Box } from '../Box';
import { IContextMenu, IContextMenuItem, IContextMenuView } from '../ContextMenu';

describe('ContextMenu component', () => {
  let ContextMenu: React.FunctionComponent<IContextMenu>;
  let ContextMenuView: React.FunctionComponent<IContextMenuView>;
  let ContextMenuTrigger: React.FunctionComponent<any>;

  const theme: Partial<ITheme> = {
    contextMenu: {
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

    // @ts-ignore
    ({ ContextMenu, ContextMenuView, ContextMenuTrigger } = await import('../ContextMenu'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('should render ContextMenuTrigger and render result of renderTrigger', () => {
    const trigger = 'I am a trigger!';
    const renderTrigger = () => trigger;

    const wrapper = mount(<ContextMenu renderTrigger={renderTrigger} id="uniq-id" />);

    expect(wrapper.find(ContextMenuTrigger)).toExist();
    // TODO FIX
    // expect(wrapper.find(ContextMenuTrigger)).toHaveText(trigger);
  });

  it('should render ContextMenuView and pass rest properties', () => {
    const props = {
      onShow() {
        // nada
      },
      hideOnLeave: true,
    };

    const wrapper = mount(<ContextMenu renderTrigger={() => null} id="uniq-id" {...props} />);

    expect(wrapper.find(ContextMenuView)).toExist();
    expect(wrapper.find(ContextMenuView)).toHaveProp(props);
  });

  it('should pass ID to ContextMenuView and ContextMenuTrigger', () => {
    const renderTrigger = () => null;
    const id = 'some-very-unique-id';

    const wrapper = mount(<ContextMenu renderTrigger={renderTrigger} id={id} />);
    expect(wrapper.find(ContextMenuView)).toHaveProp('id', id);
    expect(wrapper.find(ContextMenuTrigger)).toHaveProp('id', id);
  });
});

describe('ContextMenuView component', () => {
  let ContextMenuView: React.FunctionComponent<IContextMenuView>;
  let ContextMenuItem: React.FunctionComponent<IContextMenuItem>;

  const theme: Partial<ITheme> = {
    contextMenu: {
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

    ({ ContextMenuItem, ContextMenuView } = await import('../ContextMenu'));
  });

  afterAll(() => {
    jest.unmock('../theme');
  });

  it('should render an empty placeholder element', () => {
    const wrapper = shallow(<ContextMenuView id="t" menuItems={[]} />);

    expect(wrapper.find(Box)).toHaveProp('as', ReactContextMenu);
    expect(wrapper.find(ContextMenuItem)).toHaveLength(0);
  });

  it('should iterate over menuItems and render ContextMenuItem', () => {
    const menuItems: IContextMenuItem[] = [
      {
        key: '1',
        title: 'new file',
        preventClose: true,
      },
      {
        key: '2',
        title: 'new folder',
        disabled: true,
      },
      {
        key: '3',
        title: 'Hey',
        shortcut: 'CTRL',
      },
    ];

    const wrapper = shallow(<ContextMenuView id="t" menuItems={menuItems} />);
    const children = wrapper.find(Box).children();

    expect(wrapper.find(Box)).toHaveProp('as', ReactContextMenu);
    expect(wrapper.find(ContextMenuItem)).toHaveLength(3);
    delete menuItems[0].key;
    delete menuItems[1].key;
    expect(children.at(0)).toHaveProp(menuItems[0]);
    expect(children.at(1)).toHaveProp(menuItems[1]);
    expect(children.at(2)).toHaveProp('shortcut');
  });
});
