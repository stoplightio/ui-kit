import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Badge, BadgeColor, BadgeVariant } from '../../Badge';

export const badgeKnobs = (tabName = 'Badge'): any => {
  return {
    color: select('color', Object.values(BadgeColor), BadgeColor.Default, tabName),
    variant: select('variant', Object.values(BadgeVariant), BadgeVariant.Pill, tabName),
  };
};

storiesOf('Utilities:Badge', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div>
      <Badge key="badge" {...badgeKnobs()}>
        5
      </Badge>
    </div>
  ));
