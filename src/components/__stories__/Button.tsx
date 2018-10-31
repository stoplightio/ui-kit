import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Button } from '../Button';
import { boxKnobs } from './Box';
import { textKnobs } from './Text';

export const buttonKnobs = (tabName = 'Button') => {
  return {
    disabled: boolean('disabled', false, tabName),
  };
};

storiesOf('components/Button', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Button {...buttonKnobs()} {...textKnobs()} {...boxKnobs()}>
      Button Text
    </Button>
  ));
