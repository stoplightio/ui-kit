import { Omit } from '@stoplight/types';
import noop = require('lodash/noop');
import * as React from 'react';

import { Box, IBox, IBoxCSS } from '../Box';
import { Button, IButton } from '../Button';
import { Flex } from '../Flex';
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

  const toastActions = actions.map((action, index) => {
    const { label, onClick = noop, ...buttonProps } = action;
    return (
      <Button
        key={index}
        m="5px"
        color={theme.toastFg}
        backgroundColor="rgba(138,155,168,0.25)"
        border="transparent"
        {...buttonProps}
        css={{ ':hover': { backgroundColor: 'rgba(138,155,168,0.15)', ':active': { border: 'transparent' } } }}
        onClick={() => {
          onClick({ closeToast });
        }}
      >
        {label}
      </Button>
    );
  });

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      {...rest}
      ref={ref}
      css={[toastContentStyles(props, theme), css]}
    >
      {showCloseIcon && (
        <Icon
          icon={closeIcon || 'times'}
          onClick={closeToast}
          position="absolute"
          cursor="pointer"
          right={10}
          top={10}
        />
      )}

      <Flex alignItems="center">
        {icon && <Icon mr="5px" icon={icon} color={theme.toastFg} />}

        <Box>
          {title && (
            <Text letterSpacing="0.5px" fontWeight={600}>
              {title}
            </Text>
          )}

          {message && (
            <Text maxHeight="120px" overflow="auto">
              {message}
            </Text>
          )}

          {toastActions.length ? (
            <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
              {toastActions}
            </Flex>
          ) : null}
        </Box>
      </Flex>
    </Flex>
  );
});

ToastContent.displayName = 'ToastContent';

/**
 * STYLE
 */
export const toastContentStyles = (props: IToastContentProps, theme: ITheme['toast']): IBoxCSS => {
  const type: any = props.type;

  return [
    {
      background: theme.toastBg,
      color: theme.toastFg,
      borderLeft: type && `4px solid ${theme[type]}`,
      boxSizing: 'border-box',
      fontSize: '15px',
      padding: '10px 15px',
      height: '100%',
    },
  ];
};

export { ToastContent };
