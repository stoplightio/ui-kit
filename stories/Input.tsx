import * as React from 'react';

// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { omitBy } from 'lodash';

import { Input } from '../src/Input';
import { AutosizeInputType, InlineInputType } from './_utils';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

const store = new Store({
  value: 'Input Text',
});

export const inputKnobs = (tabName = 'Input'): any => {
  return omitBy(
    {
      disabled: boolean('disabled', false, tabName),
      type: select('type', InlineInputType, 'text', tabName),
      placeholder: text('placeholder', 'placeholder', tabName),
    },
    val => !val
  );
};

export const autosizeInputKnobs = (tabName = 'Input'): any => {
  return omitBy(
    {
      disabled: boolean('disabled', false, tabName),
      type: select('type', AutosizeInputType, 'text', tabName),
      placeholder: text('placeholder', 'placeholder', tabName),
    },
    val => !val
  );
};

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Input {...inputKnobs()} {...textKnobs()} {...boxKnobs()} />)
  .add('autosize', () => <Input {...autosizeInputKnobs()} {...textKnobs()} {...boxKnobs()} autosize />)
  .addDecorator(StateDecorator(store))
  .add('controlled store', () => (
    <Input
      {...inputKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      value={store.get('value')}
      onChange={(value: any) => store.set({ value })}
    />
  ))
  .add('controlled set', () => <Input {...inputKnobs()} {...textKnobs()} {...boxKnobs()} value="someText" />);
