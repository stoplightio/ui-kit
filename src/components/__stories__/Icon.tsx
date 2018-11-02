import { pick } from 'lodash';
import * as React from 'react';

import * as icons from '@fortawesome/pro-solid-svg-icons';

import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

// @ts-ignore
import { withKnobs } from '@storybook/addon-knobs';

import { Icon } from '../Icon';

import { boxKnobs } from './Box';

export const iconKnobs = (tabName = 'Icon') => {
  return {
    icon: icons[select('icon', Object.keys(icons), 'faBolt', 'Icon')],
    spin: boolean('spin', false, 'Icon'),
    pulse: boolean('pulse', false, 'Icon'),
    flip: select('flip', [undefined, 'horizontal', 'vertical', 'both'], undefined, 'Icon'),
    rotation: select('rotation', { undefined: 'undefined', '90': 90, '180': '180', '270': 270 }, 'undefined', 'Icon'),
  };
};

storiesOf('components/Icon', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Icon
      {...iconKnobs()}
      // Only supports a subset of box
      {...pick(boxKnobs(), [
        'fg',
        'bg',
        'text',
        'm',
        'mt',
        'mr',
        'mb',
        'ml',
        'mx',
        'my',
        'p',
        'pt',
        'pr',
        'pb',
        'pl',
        'px',
        'py',
        'border',
        'borderTop',
        'borderLeft',
        'borderRight',
        'borderBottom',
        'borderColor',
        'radius',
        'opacity',
        'postion',
        'top',
        'bottom',
        'left',
        'right',
        'z',
      ])}
    >
      Some Text in a P tag
    </Icon>
  ));
