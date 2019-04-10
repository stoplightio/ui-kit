import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

import '../src/styles/index.scss';

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

function loadStories() {
  require('@project/stories');
}

configure(loadStories, module);
