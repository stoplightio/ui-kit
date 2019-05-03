import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Checkbox } from '../../';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Checkbox />);
