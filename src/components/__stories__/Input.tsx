import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Input } from '../Input';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

const store = new Store({
  value: 'Input Text',
});

export const inputKnobs = (tabName = 'Input') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('components/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store))
  .add('with defaults', () => (
    <Input
      {...inputKnobs()}
      {...textKnobs()}
      {...boxKnobs()}
      value={store.get('value')}
      onChange={e => store.set({ value: e.target.value })}
    />
  ));
