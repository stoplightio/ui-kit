import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { ContextMenu as ReactContextMenu } from 'react-contextmenu';
import { ITheme } from '../theme';

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
      hoverFg: 'blue',
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

    const wrapper = shallow(<ContextMenu renderTrigger={renderTrigger} id="uniq-id" />);

    expect(wrapper.find(ContextMenuTrigger)).toExist();
    expect(wrapper.find(ContextMenuTrigger).dive()).toHaveText(trigger);
  });

  it('should render ContextMenuView and pass rest properties', () => {
    const props = {
      onShow() {
        // nada
      },
      hideOnLeave: true,
    };

    const wrapper = shallow(<ContextMenu renderTrigger={() => null} id="uniq-id" {...props} />);

    expect(wrapper.find(ContextMenuView)).toExist();
    expect(wrapper.find(ContextMenuView)).toHaveProp(props);
  });

  it('should pass ID to ContextMenuView and ContextMenuTrigger', () => {
    const renderTrigger = () => null;
    const id = 'some-very-unique-id';

    const wrapper = shallow(<ContextMenu renderTrigger={renderTrigger} id={id} />);
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
      hoverFg: 'blue',
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

  it('should render as ReactContextMenu', () => {
    const wrapper = shallow(<ContextMenuView id="t" />);

    expect(wrapper).toHaveProp('as', ReactContextMenu);
  });

  it('should iterate over menuItems and render ContextMenuItem', () => {
    const menuItems = [
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
    ];

    const wrapper = shallow(<ContextMenuView id="t" menuItems={menuItems} />);
    const children = wrapper.children();

    expect(wrapper.find(ContextMenuItem)).toHaveLength(2);
    delete menuItems[0].key;
    delete menuItems[1].key;
    expect(children.at(0)).toHaveProp(menuItems[0]);
    expect(children.at(1)).toHaveProp(menuItems[1]);
  });
});
