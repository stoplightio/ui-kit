import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import omitBy = require('lodash/omitBy');

import { Button } from '../Button';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const buttonKnobs = (tabName = 'Button'): any => {
  return omitBy(
    {
      disabled: boolean('disabled', false, tabName),
    },
    val => !val
  );
};

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Button {...boxKnobs()} {...textKnobs()} {...buttonKnobs()}>
      Button Text
    </Button>
  ));
