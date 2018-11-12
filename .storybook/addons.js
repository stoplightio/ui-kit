require('@storybook/addon-knobs/register');

require('@storybook/addon-actions/register');

require('@storybook/addon-links/register');

require('@storybook/addon-options/register');

const { register } = require('../src/storybook-addon/register');
const themes = require('../src/storybook-addon/themes');
register(themes);
