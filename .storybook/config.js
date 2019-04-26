import * as React from 'react';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

import '../styles/_ui-kit.scss';
import { ThemeContainer } from '../src/';

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

addDecorator(story => <ThemeContainer>{story()}</ThemeContainer>);

configure(loadStories, module);
