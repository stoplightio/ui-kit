import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import omitBy = require('lodash/omitBy');
import { Badge, BadgeColor, BadgeVariant } from '../../Badge';

export const badgeKnobs = (tabName = 'Badge'): any => {
  const props = {
    label: text('label', '5', tabName),
    color: select('color', [BadgeColor.Error, BadgeColor.Warning, BadgeColor.Default], BadgeColor.Default, tabName),
    variant: select('variant', [BadgeVariant.Pill, BadgeVariant.Textual], BadgeVariant.Pill, tabName),
  };

  return omitBy(props, val => !val);
};

storiesOf('Utilities:Badge', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div>
      <Badge key="badge" {...badgeKnobs()} />
    </div>
  ));
