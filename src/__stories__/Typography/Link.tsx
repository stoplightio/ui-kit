/* @jsx jsx */

import { jsx } from '@emotion/core';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ILink, Link } from '../../Link';
import { textKnobs } from './Text';

export const linkKnobs = (tabName = 'Link'): ILink => ({
  ...textKnobs(),
  href: text('href', 'https://www.stoplight.io', tabName),
  title: text('title', 'Stoplight.io', tabName),
  children: text('content', 'stoplight.io', tabName),
});

storiesOf('Typography:Link', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Link {...linkKnobs()} />);
