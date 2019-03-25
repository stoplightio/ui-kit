import * as React from 'react';

import { boolean, NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Flex, Icon, Input, Popup, Text } from '../..';
import { cleanKnobs } from '../_utils';

const TAB_NAME = 'Popup';

export const popupKnobs = (tabName = TAB_NAME): any => {
  return cleanKnobs({
    posX: select('posX', ['left', 'center', 'right'], 'left', tabName),
    posY: select('posY', ['top', 'center', 'bottom'], 'top', tabName),
    offset: {
      top: number('offset.top', 0, { min: 0 } as NumberOptions, tabName),
      bottom: number('offset.bottom', 0, { min: 0 } as NumberOptions, tabName),
      left: number('offset.left', 0, { min: 0 } as NumberOptions, tabName),
      right: number('offset.right', 0, { min: 0 } as NumberOptions, tabName),
    },
    padding: number('padding', 0, { min: 0, max: Infinity, range: false, step: 1 }, tabName),
    width: number('width', 0, { min: 0 } as NumberOptions, tabName),
    hideDelay: number('hideDelay', 200, { min: 0 } as NumberOptions, tabName),
  });
};

storiesOf('Miscellaneous:Popup', module)
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
      renderContent={() => <Box>{text('content', 'here is the popup content')}</Box>}
    />
  ))
  .add('with icon', () => (
    <Popup
      {...popupKnobs()}
      renderTrigger={() => {
        return (
          <Box as="span">
            Hover me <Icon icon="globe" />
          </Box>
        );
      }}
      renderContent={() => <Box as="span">Globe</Box>}
    />
  ))
  .add('with controlled mode', () => (
    <Popup
      {...popupKnobs()}
      show={boolean('show', false, TAB_NAME)}
      renderTrigger={() => <Box as="span">I am controlled, so hovering is no-op!</Box>}
      renderContent={() => <Box>{text('content', 'here is the popup content')}</Box>}
    />
  ))
  .add('inside Flexbox', () => (
    <Flex width="100%">
      <Popup
        {...popupKnobs()}
        renderTrigger={() => (
          <Flex flex="1" backgroundColor="red">
            {'<Flex> flex=1'}
          </Flex>
        )}
        renderContent={() => <Box>{text('content', 'here is the popup content')}</Box>}
      />
      <Popup
        {...popupKnobs()}
        renderTrigger={() => (
          <Input type="text" value="<Input> flex=2" onChange={() => void 0} flex="2" invalid={true} />
        )}
        renderContent={() => <Box>{text('content', 'here is the popup content')}</Box>}
      />
      <Popup
        {...popupKnobs()}
        renderTrigger={() => <Button backgroundColor="green">{'<Button> no flex'}</Button>}
        renderContent={() => <Box>{text('content', 'here is the popup content')}</Box>}
      />
    </Flex>
  ))
  .add('form validation', () => (
    <Popup
      {...popupKnobs()}
      padding={3}
      renderContent={() => (
        <Box border={`1px solid red`} borderRadius="10px" p={2}>
          This is a tooltip message.
        </Box>
      )}
      renderTrigger={() => (
        <Flex width="100%" alignItems="center">
          <Box flex="1">
            <Text as="label">Title</Text>
          </Box>
          <Flex flex="1" width="100%">
            <Box>
              <Input type="text" value="Here is some text" onChange={() => void 0} flex="1" invalid={true} />
            </Box>
          </Flex>
        </Flex>
      )}
    />
  ));
