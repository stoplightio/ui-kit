import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Menu } from '../src/';

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Menu
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span> },
        { title: 'No onClick' },
        { title: 'Disabled Item', disabled: true },
      ]}
    />
  ))

  .add('with icons', () => (
    <Menu
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with icons only', () => (
    <Menu
      menuItems={[
        { onClick: action('onClick'), icon: 'marker' },
        { icon: 'image' },
        { disabled: true, icon: 'times-circle' },
      ]}
    />
  ))
  .add('with subtext', () => (
    <Menu
      menuItems={[
        { onClick: action('onClick'), title: <span>Has onClick</span>, subtitle: 'has subtitle', icon: 'marker' },
        { title: 'No onClick', icon: 'image' },
        { title: 'Disabled Item', disabled: true, icon: 'times-circle' },
      ]}
    />
  ));
