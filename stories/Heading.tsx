import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Heading } from '../src/Heading';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const headingKnobs = (tabName = 'Heading'): any => {
  return omitBy(
    {
      as: select('as', ['', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], '', tabName),
    },
    val => !val
  );
};

storiesOf('Heading', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Heading {...headingKnobs()} {...textKnobs()} {...boxKnobs()}>
      Some Text in a H* tag
    </Heading>
  ));
