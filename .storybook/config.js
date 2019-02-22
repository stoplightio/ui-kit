import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

import * as themes from './custom-addons/withThemes/themes';
import { withThemes } from './custom-addons/withThemes/decorator';

addDecorator(
  withOptions({
    name: 'Stoplight UI-Kit',
    url: 'https://github.com/stoplightio/ui-kit',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /:/,
    selectedAddonPanel: undefined,
  })
);

addDecorator(
  withThemes(themes, {
    app: ({ base }) => ({
      canvas:
        base === 'light'
          ? {
              fg: '#111',
              bg: '#fff',
            }
          : {
              fg: '#fff',
              bg: '#111',
            },
    }),
    inverted: ({ base }) => ({
      container:
        base === 'dark'
          ? {
              fg: '#111',
              bg: '#fff',
            }
          : {
              fg: '#fff',
              bg: '#111',
            },
    }),
    inner: {
      container: {
        fg: 'white',
        bg: 'purple',
      },
    },
  })
);

function loadStories() {
  require('../src/__stories__');
}

configure(loadStories, module);
