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
  position: select(
    'position',
    ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
    'bottom-right',
    tabName
  ),
});

storiesOf('Miscellaneous:Toast', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box>
      <ToastContainer position={toastKnobs().position} />
      <button
        onClick={() =>
          Toast({
            title: toastKnobs().title,
            message: toastKnobs().message,
            type: toastKnobs().type,
            transition: toastKnobs().transition,
          })
        }
      >
        Toast!
      </button>
    </Box>
  ))
  .add('with actions', () => (
    <Box>
      <ToastContainer position={toastKnobs().position} />
      <button
        onClick={() =>
          Toast({
            title: toastKnobs().title,
            message: toastKnobs().message,
            type: toastKnobs().type,
            transition: toastKnobs().transition,
            actions: [
              {
                title: 'Check Dev.Console',
                onClick: () => console.log('clicked'),
              },
              {
                title: 'Close on Click',
                onClick: ({ closeToast }) => {
                  closeToast();
                },
              },
              { title: 'Disabled Action', disabled: true },
            ],
          })
        }
      >
        Toast!
      </button>
    </Box>
  ));
