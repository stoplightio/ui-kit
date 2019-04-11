import * as React from 'react';

import * as _brandIcons from '@fortawesome/free-brands-svg-icons';
import * as _regularIcons from '@fortawesome/free-regular-svg-icons';
import * as _solidIcons from '@fortawesome/free-solid-svg-icons';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import map = require('lodash/map');

import { Icon, IconLibrary, IIcon } from '../../Icon';
import { cleanKnobs } from '../_utils';

const { fab, prefix: brandPrefix, ...brandIcons } = _brandIcons;
const { far, prefix: regularPrefix, ...regularIcons } = _regularIcons;
const { fas, prefix: solidPrefix, ...solidIcons } = _solidIcons;

IconLibrary.add(fab, far, fas);

export const iconKnobs = (tabName = 'Icon'): any => {
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

  const iconName: IIcon = select('icon', icons, icons[10], tabName);
  const flip = select('flip', ['', 'horizontal', 'vertical', 'both'], '', tabName) || undefined;
  const rotation = Number(select('rotation', ['0', '90', '180', '270'], '0', tabName)) || undefined;

  const props = {
    icon: [prefix, iconName],
    flip,
    rotation,
    spin: boolean('spin', false, tabName),
    pulse: boolean('pulse', false, tabName),
  };

  return cleanKnobs(props);
};

storiesOf('Utilities|Icon', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div style={{ fontSize: 40 }}>
      <Icon key="icon" {...iconKnobs()} />
    </div>
  ));
