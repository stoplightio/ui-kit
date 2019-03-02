import * as React from 'react';
import { ToastType } from 'react-toastify';
import { Box, IBox, IBoxCSS } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { useTheme } from '../theme';

export const iconMap = {
  [ToastType.INFO]: 'info-circle',
  [ToastType.WARNING]: 'exclamation-triangle',
  [ToastType.ERROR]: 'times-circle',
  [ToastType.SUCCESS]: 'check-circle',
  [ToastType.DEFAULT]: 'lightbulb',
};

export interface IToastContent {
  title: string;
  body: string;
}

export interface IToast extends IBox<HTMLElement> {
  content: IToastContent;
  type: string;
  closeToast?: () => void;
}

export const Toast: React.FunctionComponent<IToast> = React.forwardRef<HTMLElement, IToast>((props, ref) => {
  const { content, type, css, closeToast, ...rest } = props;
  const { toaster: theme } = useTheme();

  return (
    <Box {...rest} ref={ref} css={[toastStyles(), css]}>
      <Icon icon={iconMap[type]} color={theme[`${type}Fg`]} />
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
