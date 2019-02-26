import * as React from 'react';

import { Box, IBox } from './Box';
import { Flex } from './Flex';
import { Icon } from './Icon';
import { Text } from './Text';
import { iconMap, INotification, NotificationType, Toast } from './Toast';

export enum NotificationsState {
  MAXIMIZED,
  MINIMIZED,
}

export interface INotifications extends IBox<HTMLElement> {
  notifications: INotification[];
  onMinimize: () => {};
  onMaximize: () => {};
  onClose: (notification: INotification[]) => {};
  state: NotificationsState;
}

function renderCount(notifications: INotification[], type: NotificationType) {
  const count = notifications.filter(n => n.type === type).length;
  if (!count) {
    return;
  }
  return (
    <Box as="span">
      {count}
      <Icon mr="7px" icon={iconMap[type]} />
    </Box>
  );
}

export const Notifications = React.forwardRef<HTMLElement, INotifications>((props, ref) => {
  const { notifications, onClose, onMaximize, state, onMinimize, css, ...rest } = props;

  let notificationsElement;
  if (notifications.length) {
    notificationsElement = notifications.map(notification => (
      <Toast onClose={(n: INotification) => onClose([n])} mb="10px" notification={notification} />
    ));
  } else {
    notificationsElement = (
      <Text as="p" textAlign="center">
        All notifications read.
      </Text>
    );
  }

  return (
    <Box {...rest} ref={ref} css={[css]}>
      <Flex css={{ margin: '10px' }}>
        <Flex flex={1}>
          {renderCount(notifications, NotificationType.INFO)}
          {renderCount(notifications, NotificationType.WARNING)}
          {renderCount(notifications, NotificationType.ERROR)}
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          {state === NotificationsState.MAXIMIZED && (
            <Icon css={{ cursor: 'pointer' }} onClick={onMinimize} icon={['fas', 'minus-square']} />
          )}
          {state === NotificationsState.MINIMIZED && (
            <Icon css={{ cursor: 'pointer' }} onClick={onMaximize} icon={['fas', 'expand']} />
          )}

          <Icon
            ml="5px"
            css={{ cursor: 'pointer' }}
            onClick={() => {
              onClose(notifications);
            }}
            icon={['fas', 'trash']}
          />
        </Flex>
      </Flex>
      {state === NotificationsState.MAXIMIZED && <Box css={{ margin: '10px' }}>{notificationsElement}</Box>}
    </Box>
  );
});
