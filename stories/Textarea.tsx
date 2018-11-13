import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Textarea } from '../src/Textarea';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const textareaKnobs = (tabName = 'Textarea'): any => {
  return omitBy(
    {
      disabled: boolean('disabled', false, tabName),
    },
    val => !val
  );
};

export const textareaAutosizeKnobs = (tabName = 'Textarea'): any => {
  return omitBy(
    {
      disabled: boolean('disabled', false, tabName),
      minRows: number(
        'minRows',
        0,
        // @ts-ignore
        {
          min: 0,
          max: Infinity,
        },
        tabName
      ),
      maxRows: number(
        'maxRows',
        10,
        // @ts-ignore
        {
          min: 1,
          max: Infinity,
        },
        tabName
      ),
    },
    val => !val
  );
};

storiesOf('Textarea', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Textarea {...textareaKnobs()} {...textKnobs()} {...boxKnobs()} defaultValue="Textarea Text" />
  ))
  .add('autosize', () => (
    <Textarea {...textareaAutosizeKnobs()} {...textKnobs()} {...boxKnobs()} autosize defaultValue="Textarea Text" />
  ));
