import * as React from 'react';

import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Break } from '../src/';

export const breakKnobs = (tabName = 'Break'): any => {
  return omitBy(
    {
      thickness: number('thickness', 10, { min: 0, max: Infinity } as NumberOptions, tabName),
    },
    val => !val
  );
};

storiesOf('Break', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Break {...breakKnobs()} />)
