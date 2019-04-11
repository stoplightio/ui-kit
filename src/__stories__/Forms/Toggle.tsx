import * as React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IToggle, Toggle } from '../../Toggle';
import { cleanKnobs } from '../_utils';

const store = new Store({
  checked: false,
});

export const toggleKnobs = (tabName = 'Toggle'): IToggle => {
  return cleanKnobs({
    disabled: boolean('disabled', false, tabName),
    checked: boolean('checked', false, tabName),
  });
};

export const toggleActions = (): IToggle => ({
  onChange: action('onChange'),
});

storiesOf('Forms|Toggle', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Toggle {...toggleKnobs()} {...toggleActions} />)
  .add('checked', () => <Toggle {...toggleKnobs()} {...toggleActions} checked={true} />)
  .add('controlled', () => (
    <State store={store}>
      <Toggle
        id="2"
        {...toggleKnobs()}
        checked={store.get('checked')}
        onChange={(checked?: boolean) => {
          store.set({ checked });
        }}
      />
    </State>
  ));
