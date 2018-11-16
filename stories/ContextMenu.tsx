import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { ContextMenu, ContextMenuTrigger, MenuItem } from '../src/ContextMenu';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const contextMenuKnobs = (tabName = 'ContextMenu') => {
  return {
    hideOnLeave: boolean('hideOnLeave', false, tabName),
  };
};

storiesOf('Context Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div>
      <ContextMenuTrigger id="defaultContextMenu">Right click to see the menu</ContextMenuTrigger>

      <ContextMenu {...contextMenuKnobs()} {...boxKnobs()} id="defaultContextMenu">
        <MenuItem {...textKnobs()}>Menu Item 1</MenuItem>
        <MenuItem {...textKnobs()}>Menu Item 2</MenuItem>
        <MenuItem {...textKnobs()}>Menu Item 3</MenuItem>
        <MenuItem divider />
        <MenuItem {...textKnobs()} disabled>
          Disabled Menu Item
        </MenuItem>
      </ContextMenu>
    </div>
  ))
  .add('custom styles', () => (
    <div>
      <ContextMenuTrigger id="customContextMenu">Right click to see the menu </ContextMenuTrigger>

      <ContextMenu {...contextMenuKnobs()} {...boxKnobs()} id="customContextMenu" borderColor="fg">
        <MenuItem {...textKnobs()} fg="success">
          Menu Item 1
        </MenuItem>
        <MenuItem {...textKnobs()} fg="warning">
          Menu Item 2
        </MenuItem>
        <MenuItem {...textKnobs()} fg="error">
          Menu Item 3
        </MenuItem>
        <MenuItem divider borderColor="fg" />
        <MenuItem {...textKnobs()} disabled italic>
          Disabled Menu Item
        </MenuItem>
      </ContextMenu>
    </div>
  ));
