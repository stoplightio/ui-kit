import * as React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Button } from '../../Button';
import { Popup } from '../../Popup';
import { ITooltip, Tooltip } from '../../Tooltip';
import { cleanKnobs } from '../_utils';
import { boxKnobs } from '../Layout/Box';

export const TooltipKnobs = (tabName = 'Tooltip'): ITooltip => {
  return cleanKnobs({
    ...boxKnobs(),
    invalid: boolean('invalid', false, tabName),
    posX: select('posX', ['left', 'center', 'right'], 'left', tabName),
    posY: select('posY', ['top', 'center', 'bottom'], 'top', tabName),
  });
};

const sometext = `Here is some tooltip text Here is some tooltip text Here is some tooltip text Here is some tooltip text Here is some tooltip text`;

storiesOf('Miscellaneous:Tooltip', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Tooltip {...TooltipKnobs()}>
      <div>{text('children', 'Here is some tooltip text', 'Tooltip')}</div>
    </Tooltip>
  ))
  .add('inside Popups', () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '403px', margin: '100px' }}>
      <Popup
        posY="top"
        posX="left"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="left" posY="top">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>top left</Button>}
      />
      <Popup
        posY="top"
        posX="center"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="center" posY="top">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>top center</Button>}
      />
      <Popup
        posY="top"
        posX="right"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="right" posY="top">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>top right</Button>}
      />

      <Popup
        posY="center"
        posX="left"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="200px" posX="left" posY="center">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>center left</Button>}
      />
      <Popup
        posY="center"
        posX="center"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="center" posY="center">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>center center</Button>}
      />
      <Popup
        posY="center"
        posX="right"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="200px" posX="right" posY="center">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>center right</Button>}
      />

      <Popup
        posY="bottom"
        posX="left"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="left" posY="bottom">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>bottom left</Button>}
      />
      <Popup
        posY="bottom"
        posX="center"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="center" posY="bottom">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>bottom center</Button>}
      />
      <Popup
        posY="bottom"
        posX="right"
        padding={2}
        renderContent={() => (
          <Tooltip maxWidth="400px" posX="right" posY="bottom">
            {sometext}
          </Tooltip>
        )}
        renderTrigger={() => <Button>bottom right</Button>}
      />
    </div>
  ));
