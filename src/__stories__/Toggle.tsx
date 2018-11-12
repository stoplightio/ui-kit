import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Toggle } from '../Toggle';
import { boxKnobs } from './Box';

const store = new Store({
  checked: false,
});

export const toggleKnobs = (tabName = 'Toggle') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('components/Toggle', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store))
  .add('with defaults', () => (
    <Toggle
      {...toggleKnobs()}
      {...boxKnobs()}
      checked={store.get('checked')}
      onChange={e => {
        action('onChange')(e);
        store.set({ checked: e.target.checked });
      }}
    />
  ));
