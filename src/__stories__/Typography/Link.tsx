import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ILink, Link } from '../../Link';
import { cleanKnobs } from '../_utils';
import { boxKnobs } from '../Layout/Box';

export const linkKnobs = (tabName = 'Link'): ILink => {
  return cleanKnobs({
    ...boxKnobs(),
    href: text('href', 'https://www.stoplight.io', tabName),
    title: text('title', 'Stoplight.io', tabName),
    children: text('content', 'stoplight.io', tabName),
  });
};

storiesOf('Typography:Link', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Link {...linkKnobs()} />);
