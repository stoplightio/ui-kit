import * as React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import omitBy = require('lodash/omitBy');

import { Text } from '../Text';
import { Casing, Decoration, LetterSpacing, LineHeight } from './_utils';

export const textKnobs = (tabName = 'Text'): any => {
  return omitBy(
    {
      tracking: select('tracking', LetterSpacing, '', tabName),
      leading: select('leading', LineHeight, '', tabName),
      casing: select('casing', Casing, '', tabName),
      decoration: select('decoration', Decoration, '', tabName),
      decorationColor: text('decorationColor', 'valid-color', tabName),
      italic: boolean('italic', false, tabName),
    },
    val => !val
  );
};

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <Text {...textKnobs()}>Some Text in a P tag</Text>);
