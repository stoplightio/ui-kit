import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Icon, Menu } from '../..';
import { IMenu } from '../../Menu';
import { flexKnobs } from '../Layout/Flex';

export const menuKnobs = (tabName = 'Menu'): Partial<IMenu> => ({
  ...flexKnobs(),
  posX: select('posX', ['left', 'center', 'right'], 'right', tabName),
  posY: select('posY', ['top', 'bottom'], 'bottom', tabName),
  hideDelay: number('hideDelay', 200, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
  offset: {
    x: number('offset.x', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
    y: number('offset.y', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
  },
});

storiesOf('Menus:Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span> },
        { title: 'No onClick' },
        { title: 'Disabled Item', disabled: true },
      ]}
    />
  ))
  .add('with icons', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with actions', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with icons only', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), icon: 'marker' },
        { icon: 'image' },
        { disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with subtext', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with trigger', () => (
    <Menu
      {...menuKnobs()}
      renderTrigger={() => <Icon icon="heading" />}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with custom renderMenu', () => (
    <Menu
      {...menuKnobs()}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with custom renderMenuItem', () => (
    <Menu
      {...menuKnobs()}
      renderMenuItem={item => <span>{item.title}</span>}
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ));
