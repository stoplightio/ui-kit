import { withKnobs } from '@storybook/addon-knobs';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Text } from '../Text';
import { Casing, Decoration, LetterSpacing, LineHeight } from './_utils';
import { boxKnobs } from './Box';

export const textKnobs = (tabName = 'Text') => {
  return {
    tracking: select('tracking', LetterSpacing, undefined, tabName),
    leading: select('leading', LineHeight, undefined, tabName),
    casing: select('casing', Casing, undefined, tabName),
    decoration: select('decoration', Decoration, undefined, tabName),
    decorationColor: text('decorationColor', 'valid-color', tabName),
    italic: boolean('italic', false, tabName),
  };
};

storiesOf('components/Text', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Text {...textKnobs()} {...boxKnobs()}>
      Some Text in a P tag
    </Text>
  ));
