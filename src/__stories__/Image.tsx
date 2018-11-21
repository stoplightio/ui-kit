import * as React from 'react';

import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Image } from '../Image';
import { BorderRadius } from './_utils';

export const imageKnobs = (tabName = 'Image'): any => {
  return {
    radius: select('radius', BorderRadius, '', tabName),
    height: text('height', '', tabName),
    hidden: boolean('hidden', false, tabName),
    responsive: boolean('responsive', true, tabName),
    opacity: number(
      'opacity',
      1,
      {
        min: 0,
        max: 1,
      } as NumberOptions,
      tabName
    ),
    src: text(
      'src',
      'https://s3.amazonaws.com/totem_production/assets/logos/10719/original/logo_light_bg.png?1501094221',
      tabName
    ),
    width: text('width', '', tabName),
  };
};

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>)
  .add('with defaults', () => <Image {...imageKnobs()} />);
