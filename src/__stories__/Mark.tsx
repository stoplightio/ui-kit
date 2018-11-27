import * as React from 'react';

import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { omitBy } from 'lodash';
import { Mark } from '../Mark';

export const markKnobs = (tabName = 'Mark'): any => {
  return omitBy(
    {
      mark: {
        type: select('mark.type', ['strong', 'emphasis', 'delete', 'inlineCode', 'different'], 'strong', tabName),
      },
      children: text('content', 'stoplight', tabName),
    },
    val => !val
  );
};

storiesOf('Mark', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Mark {...markKnobs()} />);
