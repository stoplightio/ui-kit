import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Textarea } from '../Textarea';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const textareaKnobs = (tabName = 'Textarea') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

export const textareaAutosizeKnobs = (tabName = 'Textarea') => {
  return {
    disabled: boolean('disabled', false, tabName),
    minRows: number(
      'minRows',
      undefined,
      {
        min: 1,
        max: Infinity,
      },
      tabName
    ),
    maxRows: number(
      'maxRows',
      undefined,
      {
        min: 1,
        max: Infinity,
      },
      tabName
    ),
  };
};

storiesOf('components/Textarea', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Textarea {...textareaKnobs()} {...textKnobs()} {...boxKnobs()} defaultValue="Textarea Text" />
  ))
  .add('autosize', () => (
    <Textarea {...textareaAutosizeKnobs()} {...textKnobs()} {...boxKnobs()} autosize defaultValue="Textarea Text" />
  ));
