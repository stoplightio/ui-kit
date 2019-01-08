/* @jsx jsx */

import { jsx } from '@emotion/core';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Canvas } from '../../Canvas';

storiesOf('Layout:Canvas', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Canvas>Canvas is a specialized Box that derives its foreground and background colors from the theme.</Canvas>
  ));
