import * as React from 'react';

import { NumberOptions, withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IImage, Image } from '../Image';
import { BorderRadius } from './_utils';

export const imageKnobs = (tabName = 'Image'): IImage => ({
  borderRadius: select('borderRadius', BorderRadius, '', tabName),
  height: text('height', '', tabName),
  hidden: boolean('hidden', false, tabName),
  responsive: boolean('responsive', false, tabName),
  opacity: number(
    'opacity',
    1,
    {
      min: 0,
      max: 1,
    } as NumberOptions,
    tabName
  ),
  src: text('src', 'https://placehold.it/150x50', tabName),
  alt: text('alt', 'Placeholder', tabName),
  title: text('title', 'Placeholder', tabName),
  width: text('width', '', tabName),
  boxShadow: select('boxShadow', ['', '@sm', '@md', '@lg'], '', tabName),
});

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>)
  .add('with defaults', () => <Image {...imageKnobs()} />)
  .add('responsive', () => <Image {...imageKnobs()} responsive />);
