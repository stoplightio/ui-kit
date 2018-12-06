import { StateDecorator, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import * as React from 'react';

import { IToggle, Toggle } from '../../Toggle';

const store = new Store({
  checked: false,
});

export const toggleKnobs = (tabName = 'Toggle'): IToggle => ({
  disabled: boolean('disabled', false, tabName),
  checked: boolean('checked', false, tabName),
});

export const toggleActions = (): IToggle => ({
  onChange: action('onChange'),
});

storiesOf('Forms/Toggle', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Toggle {...toggleKnobs()} {...toggleActions} />)
  .add('checked', () => <Toggle {...toggleKnobs()} {...toggleActions} checked={true} />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('controlled', () => (
    <Toggle
      id="2"
      {...toggleKnobs()}
      checked={store.get('checked')}
      onChange={(checked?: boolean) => {
        store.set({ checked });
      }}
    />
  ));
