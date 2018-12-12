import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

import * as themes from '../src/storybook-addon/themes';
import { withThemes } from '../src/storybook-addon/withThemes';
import {ITheme} from '../src/theme';

withOptions({
  addonPanelInRight: true,
  goFullScreen: false,
  name: '@stoplight/ui-kit',
  showAddonPanel: true,
  showStoriesPanel: true,
  sortStoriesByKind: true,
  url: 'https://github.com/stoplightio/ui-kit',
});

addDecorator(
  withInfo({
    header: false,
    inline: true,
    source: false, // not that helpful?
    styles: {
      infoBody: {
        backgroundColor: 'white',
        margin: '50px 0 0 0',
        padding: '0 25px 25px 25px',
        lineHeight: '2',
        width: 800,
        fontSize: 12,
      },
    },
  })
);

addDecorator(withThemes(themes, {
  inverted: ({ container }) => ({
    container: {
      fg: container.bg,
      bg: container.fg,
    },
  }),
  inner: {
    container: {
      fg: 'white',
      bg: 'purple',
    },
  },
}));

function loadStories() {
  require('../src/__stories__');
}

configure(loadStories, module);
