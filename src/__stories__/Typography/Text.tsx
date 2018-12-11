/* @jsx jsx */

import { jsx } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { IText, Text } from '../../Text';
import { Casing, Decoration, LetterSpacing, LineHeight } from '../_utils';
import { boxKnobs } from '../Layout/Box';

export const textKnobs = (tabName = 'Text'): IText => ({
  ...boxKnobs(),
  tracking: select('tracking', LetterSpacing, '', tabName),
  leading: select('leading', LineHeight, '', tabName),
  casing: select('casing', Casing, '', tabName),
  textDecoration: select('textDecoration', Decoration, '', tabName),
  textDecorationColor: text('textDecorationColor', 'valid-color', tabName),
  italic: boolean('italic', false, tabName),
});

storiesOf('Typography/Text', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Text {...textKnobs()}>Some Text in a P tag</Text>);
