import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Checkbox } from '../src/Checkbox';

export const checkboxKnobs = (tabName = 'Checkbox') => {
  return {
    checked: boolean('checked', false, tabName),
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Checkbox {...checkboxKnobs()} onChange={action('onChange')} />);
