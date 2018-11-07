import * as _brandIcons from '@fortawesome/free-brands-svg-icons';
import * as _regularIcons from '@fortawesome/free-regular-svg-icons';
import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import { map, pick } from 'lodash';
import * as React from 'react';

import { Icon, IconLibrary, IIcon } from '../Icon';
import { boxKnobs } from './Box';

const { fab, prefix: brandPrefix, ...brandIcons } = _brandIcons;
const { far, prefix: regularPrefix, ...regularIcons } = _regularIcons;
const { fas, prefix: solidPrefix, ...solidIcons } = _solidIcons;

IconLibrary.add(fab, far, fas);

export const iconKnobs = () => {
  const prefix = select('prefix', [brandPrefix, regularPrefix, solidPrefix], solidPrefix, 'Icon');

  let icons: IIcon[] | ReadonlyArray<any>;
  switch (prefix) {
    case 'fab':
      icons = map(brandIcons, icon => icon.iconName).filter(Boolean);
      break;
    case 'far':
      icons = map(regularIcons, icon => icon.iconName).filter(Boolean);
      break;
    case 'fas':
    default:
      icons = map(solidIcons, icon => icon.iconName).filter(Boolean);
      break;
  }

  const iconName: IIcon = select('icon', icons, icons[0], 'Icon');
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
    />
  ));
