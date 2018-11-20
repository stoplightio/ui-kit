// @ts-ignore
import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Toggle } from '../Toggle';

const store = new Store({
  checked: false,
});

export const toggleKnobs = (tabName = 'Toggle') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Toggle {...toggleKnobs()} />)
  .add('controlled checked', () => <Toggle {...toggleKnobs()} checked={true} />)
  .addDecorator(StateDecorator(store))
  .add('controlled', () => (
    <Toggle
      id="2"
      {...toggleKnobs()}
      checked={store.checked}
      onChange={(checked?: boolean) => {
        store.set({ checked });
      }}
    />
  ));
