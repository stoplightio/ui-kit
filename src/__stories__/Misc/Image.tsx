import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IImage, Image } from '../../Image';
import { boxKnobs } from '../Layout/Box';

export const imageKnobs = (tabName = 'Image'): IImage => ({
  ...boxKnobs(),
  height: text('height', null, tabName),
  hidden: boolean('hidden', false, tabName),
  responsive: boolean('responsive', false, tabName),
  src: text('src', 'https://placehold.it/150x50', tabName),
  alt: text('alt', 'Placeholder', tabName),
  title: text('title', 'Placeholder', tabName),
  width: text('width', null, tabName),
});

storiesOf('Miscellaneous:Image', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => <div style={{ width: '300px' }}>{storyFn()}</div>)
  .add('with defaults', () => <Image {...imageKnobs()} />)
  .add('responsive', () => <Image {...imageKnobs()} responsive />);
