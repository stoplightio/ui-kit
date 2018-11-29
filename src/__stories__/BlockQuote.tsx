import * as React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import omitBy = require('lodash/omitBy');
import { BlockQuote } from '../BlockQuote';

export const blockQuoteKnobs = (tabName = 'Block Quote'): any => {
  return omitBy(
    {
      children: text('children', 'a quote', tabName),
      isSelected: boolean('isSelected', false, tabName),
    },
    val => !val
  );
};

storiesOf('BlockQuote', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <BlockQuote {...blockQuoteKnobs()} />)
  .add('with shadow', () => <BlockQuote {...blockQuoteKnobs()} isSelected />);
