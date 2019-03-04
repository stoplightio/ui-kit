import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import * as React from 'react';

import { Box, IBox, IBoxCSS } from '../Box';
import { Button, IButton } from '../Button';
import { Icon, IIcon } from '../Icon';
import { Text } from '../Text';
import { ITheme, useTheme } from '../theme';
import { ToastType } from './index';

/**
 * TOAST CONTENT
 */

interface IToastAction extends Omit<IButton, 'onClick'> {
  title: string;
  onClick?: (opts: { closeToast: () => void }) => void;
}

interface IToastContentProps extends IToastContent, IBox<HTMLElement> {}

export interface IToastContent<T = {}> {
  title?: string;
  message?: string;
  icon?: IIcon['IconProp'];
  closeIcon?: IIcon['IconProp'] | false;
  type?: ToastType;
  actions?: IToastAction[];

  closeToast?: () => void;
}

export const ToastContent = React.forwardRef<HTMLElement, IToastContentProps>((props, ref) => {
  const { title, message, type = 'default', icon, closeIcon, actions = [], closeToast = noop, css, ...rest } = props;
  const { toast: theme } = useTheme();

  const showCloseIcon = closeIcon !== false;

  return (
    <Box {...rest} ref={ref} css={[toastContentStyles(theme), css]}>
      {showCloseIcon && (
        <Icon icon={closeIcon || 'times'} onClick={closeToast} position="absolute" cursor="pointer" right={10} />
      )}

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

      {actions.length
        ? actions.map(action => {
            const { title: actionTitle, onClick = noop, ...buttonProps } = action;
            return (
              <React.Fragment>
                <Button
                  m="5px"
                  {...buttonProps}
                  onClick={() => {
                    onClick({ closeToast });
                  }}
                >
                  {actionTitle}
                </Button>
              </React.Fragment>
            );
          })
        : null}
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
      border: theme.toastBorder && `1px solid ${theme.toastBorder}`,
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
