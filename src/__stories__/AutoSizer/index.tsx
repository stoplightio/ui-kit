import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { AutoSizer } from '../../';

storiesOf('AutoSizer', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <div style={{ height: '100vh' }}>
      <AutoSizer>
        {({ height, width }) => (
          <div style={{ height, width, background: 'red' }}>
            height: {height}px width: {width}px
          </div>
        )}
      </AutoSizer>
    </div>
  ));
