import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import omitBy = require('lodash/omitBy');
import * as React from 'react';

import { Box, Icon, Popup } from '..';

export const popupKnobs = (tabName = 'Popup'): any => {
  return omitBy(
    {
      posX: select('posX', ['left', 'center', 'right'], 'left', tabName),
      posY: select('posY', ['top', 'center', 'bottom'], 'top', tabName),
      offset: {
        top: number('offset.top', 0, { min: 0 } as NumberOptions, tabName),
        bottom: number('offset.bottom', 0, { min: 0 } as NumberOptions, tabName),
        left: number('offset.left', 0, { min: 0 } as NumberOptions, tabName),
        right: number('offset.right', 0, { min: 0 } as NumberOptions, tabName),
      },
      padding: number('padding', 0, { min: 0 } as NumberOptions, tabName),
      width: number('width', 0, { min: 0 } as NumberOptions, tabName),
      hideDelay: number('hideDelay', 200, { min: 0 } as NumberOptions, tabName),
    },
    val => !val
  );
};

storiesOf('Popup', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <Box height="500px" width="500px">
      {storyFn()}
    </Box>
  ))
  .add('with defaults', () => (
    <Popup
      {...popupKnobs()}
      renderTrigger={() => <Box as="span">With Defaults</Box>}
      renderContent={() => <Box fg="success">{text('content', 'here is the popup content')}</Box>}
    />
  ))
  .add('with icon', () => (
    <Popup
      {...popupKnobs()}
      renderTrigger={() => (
        <Box as="span">
          Hover me <Icon icon="globe" />
        </Box>
      )}
      renderContent={() => (
        <Box as="span" bg="lightest" fg="error">
          Globe
        </Box>
      )}
    />
  ));
