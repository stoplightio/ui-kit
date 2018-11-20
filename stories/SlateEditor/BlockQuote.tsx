import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BlockQuote } from '../../src/SlateEditor/components/BlockQuote';

storiesOf('SlateEditor/BlockQuote', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => <BlockQuote>{text('children', 'a quote', 'BlockQuote')}</BlockQuote>);
