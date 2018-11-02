import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { map, pick } from 'lodash';
import * as React from 'react';

import { Icon } from '../Icon';
import { boxKnobs } from './Box';

export const iconKnobs = () => {
  const prefix = select('prefix', ['fas', 'fab', 'far'], 'fas', 'Icon');

  let icons: any = solidIcons;
  switch (prefix) {
    case 'fab':
      icons = brandIcons;
      break;
    case 'far':
      icons = regularIcons;
      break;
    case 'fas':
    default:
      icons = solidIcons;
      break;
  }

  const iconNames = map(icons, 'iconName').filter(Boolean);
  const iconName = select('icon', iconNames, iconNames.shift(), 'Icon');
  const flip = select('flip', ['', 'horizontal', 'vertical', 'both'], '', 'Icon') || undefined;
  const rotation = Number(select('rotation', ['0', '90', '180', '270'], '0', 'Icon')) || undefined;

  const props = {
    icon: [prefix, iconName],
    flip,
    rotation,
    spin: boolean('spin', false, 'Icon'),
    pulse: boolean('pulse', false, 'Icon'),
  };

  return props;
};

storiesOf('components/Icon', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Icon
      key="icon"
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
