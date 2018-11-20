import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { omitBy } from 'lodash';
import { Link } from '../../SlateEditor/components/Link';

export const linkKnobs = (tabName = 'Link'): any => {
  return omitBy(
    {
      href: text('href', 'https://www.stoplight.io', tabName),
      title: text('title', 'Stoplight.io', tabName),
      children: text('content', 'stoplight.io', tabName),
    },
    val => !val
  );
};

storiesOf('SlateEditor/Link', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Link {...linkKnobs()} />);
