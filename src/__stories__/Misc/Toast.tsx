import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Box } from '../../Box';
import { IToast, NotificationType, Toast } from '../../Toast';
import { boxKnobs } from '../Layout/Box';

export const toastKnobs = (tabName = 'Toast'): Partial<IToast> => ({
  ...boxKnobs(),
});

storiesOf('Miscellaneous:Toast', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box>
      <Toast
        {...toastKnobs()}
        notification={{
          type: NotificationType.ERROR,
          title: 'Error',
          body: 'Some regular error',
        }}
        onClose={action('onClose')}
      />
      <Toast
        {...toastKnobs()}
        notification={{
          type: NotificationType.WARNING,
          title: 'Warning',
          body: 'Some regular warning',
        }}
        onClose={action('onClose')}
      />
      <Toast
        {...toastKnobs()}
        notification={{
          type: NotificationType.INFO,
          title: 'Info',
          body: `Very long info. Very long info. 
            Very long info. Very long info. 
            Very long info. Very long info.
            Very long info. Very long info. 
            Very long info. Very long info. 
            Very long info. Very long info.
            Very long info. Very long info. 
            Very long info. Very long info. 
            Very long info. Very long info.
            Very long info. Very long info. 
            Very long info. Very long info. 
            Very long info. Very long info.`,
        }}
        onClose={action('onClose')}
      />
    </Box>
  ));
