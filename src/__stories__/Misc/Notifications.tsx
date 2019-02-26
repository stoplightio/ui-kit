import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Box } from '../../Box';
import { Notifications, NotificationsState } from '../../Notifications';
import { INotification, NotificationType } from '../../Toast';
import { boxKnobs } from '../Layout/Box';

export const notificationsKnobs = (tabName = 'Notifications'): Partial<INotification> => ({
  ...boxKnobs(),
});

const notifications: INotification[] = [
  {
    type: NotificationType.ERROR,
    title: 'Error',
    body: 'Some regular error',
  },
  {
    type: NotificationType.WARNING,
    title: 'Warning',
    body: 'Some regular warning',
  },
  {
    type: NotificationType.INFO,
    title: 'Info',
    body: 'Some regular info',
  },
];

storiesOf('Miscellaneous:Notifications', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Box>
      <Notifications
        {...notificationsKnobs()}
        css={{ border: '1px solid' }}
        onClose={action('close')}
        onMinimize={action('minimize')}
        onMaximize={action('maximize')}
        notifications={notifications}
        state={NotificationsState.MAXIMIZED}
      />
    </Box>
  ))
  .add('minimized', () => (
    <Box>
      <Notifications
        {...notificationsKnobs()}
        css={{ border: '1px solid' }}
        onClose={action('close')}
        onMinimize={action('minimize')}
        onMaximize={action('maximize')}
        notifications={notifications}
        state={NotificationsState.MINIMIZED}
      />
    </Box>
  ))
  .add('no notifications', () => (
    <Box>
      <Notifications
        {...notificationsKnobs()}
        css={{ border: '1px solid' }}
        onClose={action('close')}
        onMinimize={action('minimize')}
        onMaximize={action('maximize')}
        notifications={[]}
        state={NotificationsState.MAXIMIZED}
      />
    </Box>
  ));
