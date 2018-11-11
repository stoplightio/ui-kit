import * as React from 'react';

// @ts-ignore
import addons from '@storybook/addons';

import { Panel } from './Panel';

export const register = (themes: any[]) =>
  addons.register('themes', (api: any) => {
    // Also need to set a unique name to the panel.
    addons.addPanel('themes/panel', {
      title: 'Themes',
      render: ({ active }: any) => <Panel channel={addons.getChannel()} api={api} active={active} themes={themes} />,
    });
  });
