/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import {
  areEqual,
  FixedSizeList as WindowFixedSizeList,
  FixedSizeListProps as IFixedSizeList,
  shouldComponentUpdate,
  VariableSizeList as WindowVariableSizeList,
  VariableSizeListProps as IVariableSizeList,
} from 'react-window';

import { AutoSizer } from './AutoSizer';
import { ITheme, useTheme } from './theme';

export const FixedSizeList: FunctionComponent<IFixedSizeList> = props => {
  const { scrollbar: theme } = useTheme();
  const styles = scrollListStyles(theme);
  const { width, height, ...rest } = props;

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <WindowFixedSizeList {...rest} css={styles} height={listHeight} width={listWidth} />
      )}
    </AutoSizer>
  );
};

export const VariableSizeList: FunctionComponent<IVariableSizeList> = props => {
  const { width, height, ...rest } = props;

  const { scrollbar: theme } = useTheme();

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <WindowVariableSizeList {...rest} css={scrollListStyles(theme)} height={listHeight} width={listWidth} />
      )}
    </AutoSizer>
  );
};

export { IFixedSizeList, IVariableSizeList, areEqual, shouldComponentUpdate };

export const scrollListStyles = (theme: ITheme['scrollbar']) => {
  return css`
    &::-webkit-scrollbar {
      height: 6px;
      background-color: transparent;
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.bg};
      border-radius: 10px;
    }

    scrollbar-color: ${theme.bg} transparent;
    scrollbar-width: thin;
  `;
};
