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

export interface IToastAction extends Omit<IButton, 'onClick'> {
  label: string;
  onClick?: (opts: { closeToast: () => void }) => void;
}

interface IToastContentProps extends IToastContent, IBox<HTMLElement> {}

export interface IToastContent<T = {}> {
  title?: string;
  message?: string;
  icon?: IIcon['IconProp'] | false;
  closeIcon?: IIcon['IconProp'] | false;
  type?: ToastType;
  actions?: IToastAction[];

  closeToast?: () => void;
}

const ToastContent = React.forwardRef<HTMLElement, IToastContentProps>(function ToastContent(props, ref) {
  const { title, message, type = 'default', icon, closeIcon, actions = [], closeToast = noop, css, ...rest } = props;
  const { toast: theme } = useTheme();

  const showCloseIcon = closeIcon !== false;

  return (
    <Box {...rest} ref={ref} css={[toastContentStyles(props, theme), css]}>
      {showCloseIcon && (
        <Icon icon={closeIcon || 'times'} onClick={closeToast} position="absolute" cursor="pointer" right={10} />
      )}

      {icon && <Icon mr="5px" icon={icon} color={theme[`${type}Fg`]} />}

      {title && <Text as="b">{title}</Text>}

      {message && (
        <Text mt="5px" maxHeight="120px" overflow="auto">
          {message}
        </Text>
      )}

      {actions.length
        ? actions.map(action => {
            const { label, onClick = noop, ...buttonProps } = action;
            return (
              <Button
                m="5px"
                {...buttonProps}
                onClick={() => {
                  onClick({ closeToast });
                }}
              >
                {label}
              </Button>
            );
          })
        : null}
    </Box>
  );
});

ToastContent.displayName = 'ToastContent';

/**
 * STYLE
 */
export const toastContentStyles = (props: IToastContentProps, theme: ITheme['toast']): IBoxCSS => {
  const type: any = props.type || 'default';

  return [
    {
      background: theme[`${type}Bg`],
      color: theme.toastFg,
      border: theme.toastBorder && `1px solid ${theme.toastBorder}`,
      boxSizing: 'border-box',
      padding: '10px',
      height: '100%',
    },
  ];
};

export { ToastContent };
