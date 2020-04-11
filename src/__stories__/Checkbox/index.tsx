import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Checkbox } from '../../';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div className="p-40">
      <Checkbox />
    </div>
  ));
