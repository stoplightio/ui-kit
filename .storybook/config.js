import 'storybook-chromatic';

const { configure, addDecorator } = require('@storybook/react');
const { withOptions } = require('@storybook/addon-options');

const CenterDecorator = require('./center-decorator');

withOptions({
  addonPanelInRight: true,
  goFullScreen: false,
  name: '@stoplight/ui-kit',
  showAddonPanel: true,
  showStoriesPanel: true,
  sortStoriesByKind: true,
  url: 'https://github.com/stoplightio/ui-kit',
});

addDecorator(CenterDecorator);

// automatically import all files ending in *stories*
const reqs = [require.context('../src/__stories__', true, /\.*/)];
function loadStories() {
  reqs.forEach(req => {
    req.keys().forEach(filename => req(filename));
  });
}
configure(loadStories, module);
