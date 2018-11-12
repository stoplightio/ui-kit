import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Popup } from '../src/Popup';
import { boxKnobs } from './Box';

storiesOf('components/Popup', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Popup
      {...boxKnobs()}
      show={boolean('show', true, 'Popup')}
      top={text('top', 'auto', 'Popup')}
    >
      Some Popup content
    </Popup>
  ));
