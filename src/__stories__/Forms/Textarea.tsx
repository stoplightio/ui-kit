import * as React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { ITextarea, Textarea } from '../../Textarea';
import { cleanKnobs } from '../_utils';
import { boxKnobs } from '../Layout/Box';

const store = new Store({
  value: 'TextArea Text',
});

export const textareaKnobs = (tabName = 'Textarea'): ITextarea => {
  return cleanKnobs({
    ...boxKnobs<HTMLTextAreaElement>(),
    autosize: boolean('autosize', false, tabName),
    disabled: boolean('disabled', false, tabName),
    invalid: boolean('invalid', false, tabName),
  });
};

export const textareaAutosizeKnobs = (tabName = 'Textarea'): ITextarea => {
  return cleanKnobs({
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
};

storiesOf('Forms|Textarea', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Textarea {...textareaKnobs()} autoFocus />)
  .add('uncontrolled autofocus', () => <Textarea {...textareaKnobs()} autoFocus />)
  .add('autosize', () => <Textarea {...textareaAutosizeKnobs()} autosize />)
  .add('autosize autofocus', () => <Textarea {...textareaAutosizeKnobs()} autosize autoFocus />)
  .add('controlled set', () => <Textarea {...textareaKnobs()} value="not-editable" />)
  .add('controlled store', () => (
    <State store={store}>
      <Textarea
        {...textareaKnobs()}
        value={store.get('value')}
        onChange={(event: React.SyntheticEvent<HTMLTextAreaElement>) => store.set({ value: event.currentTarget.value })}
      />
    </State>
  ));
