import * as React from 'react';

import * as icons from '@fortawesome/pro-solid-svg-icons';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Icon } from '../Icon';

import { BorderRadius, BorderWidth, FontSize, FullSpace, PositionOpts } from './_utils';

storiesOf('components/Icon', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Icon
      icon={icons[select('icon', Object.keys(icons), 'faBolt', 'Icon')]}
      spin={boolean('spin', false, 'Icon')}
      pulse={boolean('pulse', false, 'Icon')}
      flip={select('flip', [undefined, 'horizontal', 'vertical', 'both'], undefined, 'Icon')}
      rotation={select(
        'rotation',
        { undefined: 'undefined', '90': 90, '180': '180', '270': 270 },
        'undefined',
        'Icon'
      )}
      // inherited from box
      fg={text('fg', undefined, 'Box')}
      bg={text('bg', undefined, 'Box')}
      text={select('text', FontSize, undefined, 'Box')}
      m={select('m', FullSpace, undefined, 'Box')}
      mt={select('mt', FullSpace, undefined, 'Box')}
      mr={select('mr', FullSpace, undefined, 'Box')}
      mb={select('mb', FullSpace, undefined, 'Box')}
      ml={select('ml', FullSpace, undefined, 'Box')}
      mx={select('mx', FullSpace, undefined, 'Box')}
      my={select('my', FullSpace, undefined, 'Box')}
      p={select('p', FullSpace, undefined, 'Box')}
      pt={select('pt', FullSpace, undefined, 'Box')}
      pr={select('pr', FullSpace, undefined, 'Box')}
      pb={select('pb', FullSpace, undefined, 'Box')}
      pl={select('pl', FullSpace, undefined, 'Box')}
      px={select('px', FullSpace, undefined, 'Box')}
      py={select('py', FullSpace, undefined, 'Box')}
      border={select('border', BorderWidth, undefined, 'Box')}
      borderTop={select('borderTop', BorderWidth, undefined, 'Box')}
      borderLeft={select('borderLeft', BorderWidth, undefined, 'Box')}
      borderRight={select('borderRight', BorderWidth, undefined, 'Box')}
      borderBottom={select('borderBottom', BorderWidth, undefined, 'Box')}
      borderColor={text('borderColor', undefined, 'Box')}
      radius={select('radius', BorderRadius, undefined, 'Box')}
      opacity={number('opacity', 1, {}, 'Box')}
      postion={select('position', PositionOpts, undefined, 'Box')}
      top={number('top', undefined, {}, 'Box')}
      bottom={number('bottom', undefined, {}, 'Box')}
      left={number('left', undefined, {}, 'Box')}
      right={number('right', undefined, {}, 'Box')}
      z={number('z', undefined, {}, 'Box')}
    >
      Some Text in a P tag
    </Icon>
  ));
