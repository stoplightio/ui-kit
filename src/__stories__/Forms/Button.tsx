/* @jsx jsx */

import { jsx } from '@emotion/core';
import omit = require('lodash/omit');

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Button, IButton } from '../../Button';
import { boxKnobs } from '../Layout/Box';

export const buttonKnobs = (tabName = 'Button'): Partial<IButton> => ({
  ...omit(boxKnobs(), 'opacity'),
  disabled: boolean('disabled', false, tabName),
});

storiesOf('Forms:Button', module)
  .addDecorator(withKnobs)

  .add('with defaults', () => <Button {...buttonKnobs()}>Button Text</Button>)
  .add('disabled', () => (
    <Button {...buttonKnobs()} disabled>
      Button Text
    </Button>
  ));
