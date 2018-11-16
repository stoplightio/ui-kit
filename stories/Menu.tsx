import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Menu, MenuItem } from '../src/';

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Menu>
      <MenuItem onClick={action('onClick')} text={<span>First menu entry</span>} />
      <MenuItem onClick={action('onClick')} text={<span>Second menu entry</span>} />
    </Menu>
  ))
  .add('with padding', () => (
    <Menu padding="50px">
      <MenuItem onClick={action('onClick')} text={<span>First menu entry</span>} />
      <MenuItem padding=" 0 0 0 50px" onClick={action('onClick')} text={<span>Second menu entry</span>} />
      <MenuItem onClick={action('onClick')} text={<span>Third menu entry</span>} />
    </Menu>
  ))
  .add('with icons', () => (
    <Menu>
      <MenuItem onClick={action('onClick')} icon="marker" text={<span>First menu entry</span>} />
      <MenuItem onClick={action('onClick')} icon="image" text={<span>Second menu entry</span>} />
    </Menu>
  ))
  .add('with icons only', () => (
    <Menu>
      <MenuItem icon="marker" />
      <MenuItem icon="image" />
      <MenuItem icon="home" />
      <MenuItem icon="newspaper" />
    </Menu>
  ))
  .add('with subtext', () => (
    <Menu>
      <MenuItem icon="home" subText={<h6 style={{ margin: 0 }}>test</h6>} text="start page" />
      <MenuItem icon="home" subText={<h6 style={{ margin: 0 }}>check it out</h6>} text="News" />
    </Menu>
  ));
