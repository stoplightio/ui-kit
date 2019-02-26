import * as React from 'react';

import { Box, IBox, IBoxCSS } from './Box';
import { Icon } from './Icon';
import { Text } from './Text';

export enum NotificationType {
  INFO,
  WARNING,
  ERROR,
}

export const iconMap = {
  [NotificationType.INFO]: ['fas', 'info-circle'],
  [NotificationType.WARNING]: ['fas', 'exclamation-triangle'],
  [NotificationType.ERROR]: ['fas', 'times-circle'],
};

export interface INotification {
  title: string;
  body: string;
  type: NotificationType;
}

export interface IToast extends IBox<HTMLElement> {
  notification: INotification;
  onClose: (n: INotification) => void;
}

export const Toast = React.forwardRef<HTMLElement, IToast>((props, ref) => {
  const { notification, onClose, css, ...rest } = props;

  return (
    <Box {...rest} ref={ref} css={[toastStyles(), css]}>
      <Icon
        css={{ float: 'right', cursor: 'pointer' }}
        onClick={() => {
          onClose(notification);
        }}
        icon={['fas', 'window-close']}
      />
      <Icon icon={iconMap[notification.type]} />
      <Text as="b" ml="5px">
        {notification.title}
      </Text>
      <Box height="120px" overflow="auto">
        <Text as="p" mt="5px">
          {notification.body}
        </Text>
      </Box>
    </Box>
  );
});

export const toastStyles = (): IBoxCSS => {
  return [
    {
      border: '1px solid',
      padding: '7px 10px',
      minWidth: '147px',
    },
  ];
};
