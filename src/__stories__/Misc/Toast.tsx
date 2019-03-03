import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Box } from '../../Box';
import { Toast, ToastContainer } from '../../Toast';

export const toastKnobs = (tabName = 'Toaster'): any => ({
  type: select('type', ['info', 'error', 'success', 'warning', 'default'], 'default', tabName),
  title: text('title', 'Title', tabName),
  message: text('message', 'Message', tabName),
  transition: select('transition', ['zoom', 'bounce', 'slide', 'flip'], 'zoom', tabName),
});

storiesOf('Miscellaneous:Toast', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box>
      <ToastContainer />
      <button
        onClick={() =>
          Toast({
            title: toastKnobs().title,
            message: toastKnobs().message,
            type: toastKnobs().type,
            autoClose: false,
            transition: toastKnobs().transition,
          })
        }
      >
        Toast!
      </button>
    </Box>
  ));
