import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Input } from '../Input';
import { AutosizeInputType, InlineInputType } from './_utils';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

const store = new Store({
  value: 'Input Text',
});

export const inputKnobs = (tabName = 'Input') => {
  return {
    disabled: boolean('disabled', false, tabName),
    type: select('type', InlineInputType, 'text', tabName),
  };
};

export const autosizeInputKnobs = (tabName = 'Input') => {
  return {
    disabled: boolean('disabled', false, tabName),
    type: select('type', AutosizeInputType, 'text', tabName),
  };
};

storiesOf('components/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store))
  .add('with defaults', () => (
    <Input
      {...inputKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      value={store.get('value')}
      onChange={e => store.set({ value: e.target.value })}
    />
  ))
  .add('autosize', () => (
    <Input
      {...autosizeInputKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      autosize
      value={store.get('value')}
      onChange={e => store.set({ value: e.target.value })}
    />
  ));
