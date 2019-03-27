import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Button, IButton } from '../../Button';
import { boxKnobs } from '../Layout/Box';

import { cleanKnobs } from '../_utils';

export const buttonKnobs = (tabName = 'Button'): Partial<IButton> => {
  return cleanKnobs<IButton>({
    ...boxKnobs<HTMLButtonElement>(),
    disabled: boolean('disabled', false, tabName),
  });
};

storiesOf('Forms:Button', module)
  .addDecorator(withKnobs)

  .add('with defaults', () => {
    return <Button {...buttonKnobs()}>Button Text</Button>;
  })
  .add('disabled', () => (
    <Button {...buttonKnobs()} disabled>
      Button Text
    </Button>
  ));
