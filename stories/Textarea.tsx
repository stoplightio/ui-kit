import * as React from 'react';

// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Textarea } from '../src/Textarea';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

const store = new Store({
  value: 'TextArea Text',
});

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
  .add('uncontrolled', () => <Textarea {...textareaKnobs()} {...textKnobs()} {...boxKnobs()} />)
  .addDecorator(StateDecorator(store))
  .add('with defaults', () => (
    <Textarea
      {...textareaKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      value={store.get('value')}
      onChange={(value: any) => store.set({ value })}
    />
  ))
  .add('autosize', () => (
    <Textarea
      {...textareaAutosizeKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      autosize
      value={store.get('value')}
      onChange={(value: any) => store.set({ value })}
    />
  ));
