/* @jsx jsx */

import { css, jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import {
  FixedSizeList as WindowFixedSizeList,
  FixedSizeListProps as IFixedSizeList,
  VariableSizeList as WindowVariableSizeList,
  VariableSizeListProps as IVariableSizeList,
} from 'react-window';

import { AutoSizer } from './AutoSizer';
import { useTheme } from './theme';

export const FixedSizeList: FunctionComponent<IFixedSizeList> = props => {
  const styles = scrollListStyles();
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
  const styles = scrollListStyles();
  const { width, height, ...rest } = props;

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <WindowVariableSizeList {...rest} css={styles} height={listHeight} width={listWidth} />
      )}
    </AutoSizer>
  );
};

export { IFixedSizeList, IVariableSizeList };

export const scrollListStyles = () => {
  const theme = useTheme();

  return css`
    &::-webkit-scrollbar {
      height: 6px;
      background-color: transparent;
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.scrollbar.bg};
      border-radius: 10px;
    }

    scrollbar-color: ${theme.scrollbar.bg} transparent;
    scrollbar-width: thin;
  `;
};
