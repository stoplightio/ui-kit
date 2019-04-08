import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

import '../styles/blueprint.scss';
import '../styles/index.css';

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
  require('../src/__stories__/Button');
}

configure(loadStories, module);
