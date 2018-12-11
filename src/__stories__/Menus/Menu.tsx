/* @jsx jsx */

import { jsx } from '@emotion/core';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Flex, Icon, Menu } from '../..';
import { IMenu } from '../../Menu';
import { flexKnobs } from '../Layout/Flex';

export const menuKnobs = (tabName = 'Menu'): Partial<IMenu> => ({
  ...flexKnobs(),
});

export const menuActions = (): Partial<IMenu> => ({
  onMouseEnter: action('onMouseEnter'),
  onMouseLeave: action('onMouseLeave'),
});

storiesOf('Menus/Menu', module)
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
      {...menuActions()}
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
      {...menuActions()}
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
      renderMenu={(props, items, renderMenuItem) => (
        <Flex direction="column">Custom menu {items.map(renderMenuItem)}</Flex>
      )}
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
