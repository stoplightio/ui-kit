import * as React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BlockQuote, IBlockQuote } from '../../BlockQuote';
import { cleanKnobs } from '../_utils';
import { textKnobs } from './Text';

export const blockQuoteKnobs = (tabName = 'Block Quote'): IBlockQuote => {
  return cleanKnobs({
    ...textKnobs(),
    children: text('content', 'a quote', tabName),
    isSelected: boolean('isSelected', false, tabName),
  });
};

storiesOf('Typography:BlockQuote', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <BlockQuote {...blockQuoteKnobs()} />)
  .add('with shadow', () => <BlockQuote {...blockQuoteKnobs()} isSelected />);
