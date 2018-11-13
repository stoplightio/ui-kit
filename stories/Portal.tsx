import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Portal } from '../src/Portal';

export const portalKnobs = (tabName = 'Portal'): any => {
  return {
    children: text('children', 'some content', tabName),
    className: text('className', '', tabName),
  };
};

storiesOf('Portal', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Portal {...portalKnobs()}/>
  ));
