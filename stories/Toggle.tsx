import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Toggle } from '../src/Toggle';

export const toggleKnobs = (tabName = 'Toggle') => {
  return {
    checked: boolean('checked', false, tabName),
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Toggle {...toggleKnobs()} onChange={action('onChange')} />);
