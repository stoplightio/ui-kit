import * as React from 'react';

import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Image } from '../src/Image';

export const imageKnobs = (tabName = 'Image'): any => {
  return {
    circular: boolean('circular', false, tabName),
    height: text('height', '', tabName),
    hidden: boolean('hidden', false, tabName),
    responsive: boolean('responsive', true, tabName),
    rounded: boolean('rounded', false, tabName),
    opacity: number(
      'opacity',
      1,
      {
        min: 0,
        max: 1,
      } as NumberOptions,
      tabName
    ),
    src: text('src', 'https://s3.amazonaws.com/totem_production/assets/logos/10719/original/logo_light_bg.png?1501094221', tabName),
    width: text('width', '', tabName),
  };
};

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div style={{ width: '300px' }}>{storyFn()}</div>
  ))
  .add('with defaults', () => (
    <Image {...imageKnobs()} />
  ));
