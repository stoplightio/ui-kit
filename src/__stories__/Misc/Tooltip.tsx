import * as React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box } from '../../Box';
import { ITooltip, Tooltip } from '../../Tooltip';

export const TooltipKnobs = (tabName = 'Tooltip'): ITooltip => ({
  invalid: boolean('invalid', false, tabName),
  caret: {
    posX: select('caret.posX', ['left', 'center', 'right'], 'left', tabName),
    posY: select('caret.posY', ['top', 'center', 'bottom'], 'top', tabName),
  },
});

storiesOf('Miscellaneous:Tooltip', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box width={number('container width', 400, {}, 'Tooltip')}>
      <Tooltip {...TooltipKnobs()}>
        <div>{text('children', 'Here is some tooltip text', 'Tooltip')}</div>
      </Tooltip>
    </Box>
  ));
