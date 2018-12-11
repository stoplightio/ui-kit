/* @jsx jsx */

import { jsx } from '@emotion/core';

import { action } from '@storybook/addon-actions';
import { number, NumberOptions, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Box, Icon, Menu } from '../..';
import { IMenu } from '../../Menu';
import { flexKnobs } from '../Layout/Flex';

export const menuKnobs = (tabName = 'Menu'): Partial<IMenu> => ({
  ...flexKnobs(),
  posX: select('posX', ['left', 'center', 'right'], 'left', tabName),
  posY: select('posY', ['top', 'bottom'], 'bottom', tabName),
  offset: {
    top: number('offset.top', 0, { min: 0 } as NumberOptions, tabName),
    bottom: number('offset.bottom', 0, { min: 0 } as NumberOptions, tabName),
    left: number('offset.left', 0, { min: 0 } as NumberOptions, tabName),
    right: number('offset.right', 0, { min: 0 } as NumberOptions, tabName),
  },
});

storiesOf('Menus/Menu', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <Box mt="100px" height="500px" width="200px">
      {storyFn()}
    </Box>
  ))
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
  ))
