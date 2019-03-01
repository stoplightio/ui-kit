/* @jsx jsx */
import { css, jsx } from '@emotion/core';
import { forwardRef } from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from './AutoSizer';
import { ITheme, useTheme } from './theme';

export {
  areEqual,
  shouldComponentUpdate,
  ListItemKeySelector,
  FixedSizeList as IFixedSizeList,
  VariableSizeList as IVariableSizeList,
  FixedSizeListProps as IFixedSizeListProps,
  VariableSizeListProps as IVariableSizeListProps,
} from 'react-window';

export const FixedSizeList = forwardRef<ReactWindow.FixedSizeList, ReactWindow.FixedSizeListProps>((props, ref) => {
  const { scrollbar: theme } = useTheme();
  const { width, height, ...rest } = props;

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.FixedSizeList
          {...rest}
          ref={ref}
          css={scrollListStyles(theme)}
          height={listHeight}
          width={listWidth}
        />
      )}
    </AutoSizer>
  );
});

export const VariableSizeList = forwardRef<ReactWindow.VariableSizeList, ReactWindow.VariableSizeListProps>(
  (props, ref) => {
    const { width, height, ...rest } = props;
    const { scrollbar: theme } = useTheme();

    return (
      <AutoSizer width={width} height={height}>
        {({ width: listWidth, height: listHeight }) => (
          <ReactWindow.VariableSizeList
            {...rest}
            ref={ref}
            css={scrollListStyles(theme)}
            height={listHeight}
            width={listWidth}
          />
        )}
      </AutoSizer>
    );
  }
);

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
