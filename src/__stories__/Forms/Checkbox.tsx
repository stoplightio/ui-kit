/* @jsx jsx */

import { jsx } from '@emotion/core';

import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';

import { Checkbox, ICheckbox } from '../../Checkbox';

const store = new Store<Partial<ICheckbox>>({
  checked: false,
});

export const checkboxKnobs = (tabName = 'Checkbox'): Partial<ICheckbox> => ({
  disabled: boolean('disabled', false, tabName),
  checked: boolean('checked', false, tabName),
});

storiesOf('Forms:Checkbox', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => (
    <div>
      <Checkbox id="1" {...checkboxKnobs()} /> Text
    </div>
  ))
  .add('checked', () => <Checkbox id="2" {...checkboxKnobs()} checked={true} />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('controlled', () => (
    <Checkbox
      id="3"
      {...checkboxKnobs()}
      checked={store.get('checked')}
      onChange={(checked: boolean) => {
        store.set({ checked });
      }}
    />
  ));
