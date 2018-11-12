import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number, select } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PopupPosition } from './_utils';
import { boxKnobs } from './Box';
import { Popup } from '../src/Popup';

storiesOf('components/Popup', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        border: '1px solid black',
        position: 'relative',
        width: '300px',
        textAlign: 'center',
      }}
    >
      content
      {story()}
    </div>
  ))
  .add('with defaults', () => (
    <Popup
      show={boolean('show', true, 'Popup')}
      offset={number('offset', 0, { min: 0, max: Infinity }, 'Popup')}
      position={select('position', PopupPosition, undefined, 'Popup')}
      {...boxKnobs()}
    >
      Some Popup content
    </Popup>
  ));
