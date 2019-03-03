import * as React from 'react';

import { Box, IBox, IBoxCSS } from '../Box';
import { Icon, IIcon } from '../Icon';
import { Text } from '../Text';
import { ITheme, useTheme } from '../theme';
import { ToastType } from './index';

/**
 * TOAST CONTENT
 */

interface IToastContentProps extends IToastContent, IBox<HTMLElement> {}

export interface IToastContent<T = {}> {
  title?: string;
  message?: string;
  icon?: IIcon['IconProp'];
  closeIcon?: IIcon['IconProp'] | boolean;
  type?: ToastType;

  closeToast?: () => void;
  render?: (props: { ref?: React.Ref<HTMLElement>; closeToast?: () => void }) => any;
}

export const ToastContent = React.forwardRef<HTMLElement, IToastContentProps>((props, ref) => {
  const { title, message, type = 'default', icon, closeIcon, closeToast, render: customRenderer, css, ...rest } = props;
  const { toast: theme } = useTheme();

  if (customRenderer) {
    return customRenderer({ ref, closeToast });
  }

  return (
    <Box {...rest} ref={ref} css={[toastContentStyles(theme), css]}>
      <Icon icon={closeIcon || 'times'} onClick={closeToast} position="absolute" cursor="pointer" right={10} />
      <Icon icon={icon || iconMap[type]} color={theme[`${type}Fg`]} />

      {title && (
        <Text as="b" ml="5px">
          {title}
        </Text>
      )}

      {message && (
        <Text mt="5px" maxHeight="120px" overflow="auto">
          {message}
        </Text>
      )}
    </Box>
  );
});

/**
 * STYLE
 */
export const toastContentStyles = (theme: ITheme['toast']): IBoxCSS => {
  return [
    {
      background: theme.toastBg,
      color: theme.toastFg,
      // TODO take from theme
      border: '1px solid',
      boxSizing: 'border-box',
      padding: '10px',
      height: '100%',
    },
  ];
};

/**
 * HELPERS
 */
const iconMap = {
  info: 'info-circle',
  warning: 'exclamation-triangle',
  error: 'times-circle',
  success: 'check-circle',
  default: 'lightbulb',
};
