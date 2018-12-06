import * as React from 'react';

import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';

import { IInput, Input } from '../../Input';
import { AutosizeInputType, InlineInputType } from '../_utils';
import { boxKnobs } from '../Layout/Box';
import { textKnobs } from '../Typography/Text';

const store = new Store({
  value: 'Input Text',
});

export const inputKnobs = (tabName = 'Input'): IInput => ({
  ...boxKnobs(),
  disabled: boolean('disabled', false, tabName),
  type: select('type', InlineInputType, 'text', tabName),
  placeholder: text('placeholder', 'placeholder', tabName),
});

export const autosizeInputKnobs = (tabName = 'Input'): IInput => ({
  ...inputKnobs(),
  type: select('type', AutosizeInputType, 'text', tabName),
});

storiesOf('Forms/Input', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Input {...inputKnobs()} {...textKnobs()} />)
  .add('autosize', () => <Input {...autosizeInputKnobs()} {...textKnobs()} autosize />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('controlled set', () => <Input {...inputKnobs()} {...textKnobs()} value="not editable" />)
  .add('controlled store', () => (
    <Input
      {...inputKnobs()}
      value={store.get('value')}
      onChange={event => store.set({ value: event.currentTarget.value })}
    />
  ));
