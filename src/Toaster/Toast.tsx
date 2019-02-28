import * as React from 'react';
import { ToastType } from 'react-toastify';
import { IToast } from '.';
import { Box, IBoxCSS } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';

export const iconMap = {
  [ToastType.INFO]: ['fas', 'info-circle'],
  [ToastType.WARNING]: ['fas', 'exclamation-triangle'],
  [ToastType.ERROR]: ['fas', 'times-circle'],
  [ToastType.SUCCESS]: ['fas', 'check-circle'],
  [ToastType.DEFAULT]: ['fas', 'lightbulb'],
};

export const Toast = React.forwardRef<HTMLElement, IToast>((props, ref) => {
  const { content, type, css, ...rest } = props;

  return (
    <Box {...rest} ref={ref} css={[toastStyles(), css]}>
      <Icon icon={iconMap[type]} />
      <Text as="b" ml="5px">
        {content.title}
      </Text>
      <Box maxHeight="120px" overflow="auto">
        <Text as="p" mt="5px">
          {content.body}
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
