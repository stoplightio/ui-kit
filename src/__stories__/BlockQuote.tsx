import * as React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BlockQuote, IBlockQuote } from '../BlockQuote';

export const blockQuoteKnobs = (tabName = 'Block Quote'): IBlockQuote => ({
  children: text('content', 'a quote', tabName),
  isSelected: boolean('isSelected', false, tabName),
});

storiesOf('BlockQuote', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <BlockQuote {...blockQuoteKnobs()} />)
  .add('with shadow', () => <BlockQuote {...blockQuoteKnobs()} isSelected />);
