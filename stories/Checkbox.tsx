// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Checkbox } from '../src/Checkbox';

const store = new Store({
  checked: false,
});

export const checkboxKnobs = (tabName = 'Checkbox') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Checkbox id="1" {...checkboxKnobs()} />)
  .addDecorator(StateDecorator(store))
  .add('controlled', () => (
    <Checkbox
      id="2"
      {...checkboxKnobs()}
      checked={store.checked}
      onChange={(checked?: boolean) => {
        store.set({ checked });
      }}
    />
  ))
  .add('controlled set', () => <Checkbox {...checkboxKnobs()} checked={true} />);
