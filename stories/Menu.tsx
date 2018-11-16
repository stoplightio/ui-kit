import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Menu, MenuItem } from '../src/';

storiesOf('Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Menu>
      <MenuItem onClick={action('onClick')} title={<span>First menu entry</span>} />
      <MenuItem onClick={action('onClick')} title={<span>Second menu entry</span>} />
    </Menu>
  ))
  .add('with padding', () => (
    <Menu padding="50px">
      <MenuItem onClick={action('onClick')} title={<span>First menu entry</span>} />
      <MenuItem padding=" 0 0 0 50px" onClick={action('onClick')} title={<span>Second menu entry</span>} />
      <MenuItem onClick={action('onClick')} title={<span>Third menu entry</span>} />
    </Menu>
  ))
  .add('with icons', () => (
    <Menu>
      <MenuItem onClick={action('onClick')} icon="marker" title={<span>First menu entry</span>} />
      <MenuItem onClick={action('onClick')} icon="image" title={<span>Second menu entry</span>} />
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
      <MenuItem icon="home" subTitle={<h6 style={{ margin: 0 }}>test</h6>} title="start page" />
      <MenuItem icon="home" subTitle={<h6 style={{ margin: 0 }}>check it out</h6>} title="News" />
    </Menu>
  ));
