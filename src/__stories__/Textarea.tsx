import * as React from 'react';

// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { ITextarea, Textarea } from '../emotion/Textarea';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

const store = new Store({
  value: 'TextArea Text',
});

export const textareaKnobs = (tabName = 'Textarea'): ITextarea => ({
  autosize: boolean('autosize', false, tabName),
  disabled: boolean('disabled', false, tabName),
});

export const textareaAutosizeKnobs = (tabName = 'Textarea'): ITextarea => ({
  ...textareaKnobs(tabName),
  minRows: number(
    'minRows',
    0,
    {
      min: 0,
      range: false,
      max: Infinity,
      step: 1,
    },
    tabName
  ),
  maxRows: number(
    'maxRows',
    10,
    {
      min: 1,
      range: false,
      max: Infinity,
      step: 1,
    },
    tabName
  ),
});

storiesOf('Textarea', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Textarea {...textareaKnobs()} {...boxKnobs()} />)
  .add('autosize', () => <Textarea {...textareaAutosizeKnobs()} {...boxKnobs()} autosize />)
  .add('controlled set', () => <Textarea {...textareaKnobs()} {...boxKnobs()} value="not-editable" />)
  .addDecorator(StateDecorator(store))
  .add('controlled', () => (
    <Textarea
      {...textareaKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      value={store.get('value')}
      onChange={(value: any) => store.set({ value })}
    />
  ));
