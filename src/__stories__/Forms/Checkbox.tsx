import * as React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Checkbox, ICheckbox } from '../../Checkbox';
import { cleanKnobs } from '../_utils';

const store = new Store<Partial<ICheckbox>>({
  checked: false,
});

export const checkboxKnobs = (tabName = 'Checkbox'): Partial<ICheckbox> => {
  return cleanKnobs({
    disabled: boolean('disabled', false, tabName),
    checked: boolean('checked', false, tabName),
    invalid: boolean('invalid', false, tabName),
  });
};

storiesOf('Forms|Checkbox', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => (
    <div>
      <Checkbox id="1" {...checkboxKnobs()} /> Text
    </div>
  ))
  .add('checked', () => <Checkbox id="2" {...checkboxKnobs()} checked={true} />)
  .add('controlled', () => (
    <State store={store}>
      <Checkbox
        id="3"
        {...checkboxKnobs()}
        checked={store.get('checked')}
        onChange={(checked: boolean) => {
          store.set({ checked });
        }}
      />
    </State>
  ));
