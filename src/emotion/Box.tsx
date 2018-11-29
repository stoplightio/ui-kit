/* @jsx jsx */

import { jsx } from '@emotion/core';
import { CSSProperties, SFC } from 'react';

import { useTheme } from './theme';

interface IBox {
  style?: CSSProperties;
}

export const buttonStyle = () => {
  const theme = useTheme();

  return {
    backgroundColor: theme.button.bg,
    color: theme.button.fg,

    '&:hover': {
      bg: theme.button.hoverBg,
    },
  };
};

export const boxStyle = () => {
  return {};
};

// Box, Flex, Button

export const Box: SFC<IBox> = ({ children, style, ...rest }) => {
  const styles = [boxStyle()];

  if (style) styles.push(style);

  return (
    <div css={styles} {...rest}>
      {children}
    </div>
  );
};
