import * as React from 'react';

// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IInput, Input } from '../Input';
import { AutosizeInputType, InlineInputType } from './_utils';
import { textKnobs } from './Text';

const store = new Store({
  value: 'Input Text',
});

export const inputKnobs = (tabName = 'Input'): IInput => ({
  disabled: boolean('disabled', false, tabName),
  type: select('type', InlineInputType, 'text', tabName),
  placeholder: text('placeholder', 'placeholder', tabName),
});

export const autosizeInputKnobs = (tabName = 'Input'): IInput => ({
  disabled: boolean('disabled', false, tabName),
  type: select('type', AutosizeInputType, 'text', tabName),
  placeholder: text('placeholder', 'placeholder', tabName),
});

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Input {...inputKnobs()} {...textKnobs()} />)
  .add('autosize', () => <Input {...autosizeInputKnobs()} {...textKnobs()} autosize />)
  .add('controlled set', () => <Input {...inputKnobs()} {...textKnobs()} value="not editable" />)
  .addDecorator(StateDecorator(store))
  .add('controlled store', () => (
    <Input
      {...inputKnobs()}
      {...textKnobs()}
      value={store.get('value')}
      onChange={event => store.set({ value: event.currentTarget.value })}
    />
  ));
