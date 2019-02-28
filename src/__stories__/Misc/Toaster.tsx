import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Box } from '../../Box';
import { toast, Toaster } from '../../Toaster';

export const toasterKnobs = (tabName = 'Toaster'): any => ({
  type: select('type', ['info', 'error', 'success', 'warning', 'default'], 'default', tabName),
  title: text('title', 'Title', tabName),
  body: text('body', 'Body', tabName),
});

storiesOf('Miscellaneous:Toaster', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box>
      <Toaster />
      <button
        onClick={() =>
          toast(
            {
              title: toasterKnobs().title,
              body: toasterKnobs().body,
            },
            { type: toasterKnobs().type }
          )
        }
      >
        Toast!
      </button>
    </Box>
  ));
