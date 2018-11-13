import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Checkbox } from '../Checkbox';
import { boxKnobs } from './Box';

export const checkboxKnobs = (tabName = 'Checkbox') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('components/Checkbox', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Checkbox {...checkboxKnobs()} {...boxKnobs()} onChange={action('onChange')} />);
