import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { ContextMenu } from '../src/ContextMenu';
// import { boxKnobs } from './Box';
// import { textKnobs } from './Text';

export const contextMenuKnobs = (tabName = 'ContextMenu') => {
  return {
    hideOnLeave: boolean('hideOnLeave', false, tabName),
  };
};

storiesOf('Context Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <ContextMenu
      id="defaultContextMenu"
      renderTrigger={() => 'trigger'}
      menuItems={[
        { title: 'Menu Item 1' },
        { title: 'Menu Item 2' },
        { title: 'Menu Item 3' },
        { divider: true },
        { title: 'Disabled Menu Item', disabled: true },
      ]}
    />
  ))
  .add('custom items', () => (
    <ContextMenu
      id="defaultContextMenu"
      renderTrigger={() => 'Right Click Me!'}
      menuItems={[
        { title: 'Menu Item 1', attributes: { fg: 'success' } },
        { title: 'Menu Item 2', attributes: { fg: 'warning' } },
        { title: 'Menu Item 3', attributes: { fg: 'error' } },
        { divider: true, attributes: { borderColor: 'fg' } },
        {
          title: 'Disabled Menu Item',
          disabled: true,
          attributes: {
            italic: true,
          },
        },
      ]}
    />
  ));
