/* @jsx jsx */
import { css as cssx, jsx } from '@emotion/core';
import { forwardRef } from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from './AutoSizer';
import { IBoxCSS } from './Box';
import { ITheme, useTheme } from './theme';

export {
  areEqual,
  shouldComponentUpdate,
  ListItemKeySelector,
  FixedSizeList as IFixedSizeList,
  VariableSizeList as IVariableSizeList,
} from 'react-window';

export interface IFixedSizeListProps extends ReactWindow.FixedSizeListProps {
  css?: IBoxCSS;
}

export interface IVariableSizeListProps extends ReactWindow.VariableSizeListProps {
  css?: IBoxCSS;
}

export const FixedSizeList = forwardRef<ReactWindow.FixedSizeList, IFixedSizeListProps>((props, ref) => {
  const { scrollbar: theme } = useTheme();
  const { width, height, css, ...rest } = props;

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.FixedSizeList
          {...rest}
          ref={ref}
          css={scrollListStyles(theme, css)}
          height={listHeight}
          width={listWidth}
        />
      )}
    </AutoSizer>
  );
});

export const VariableSizeList = forwardRef<ReactWindow.VariableSizeList, IVariableSizeListProps>((props, ref) => {
  const { width, height, css, ...rest } = props;
  const { scrollbar: theme } = useTheme();

  return (
    <AutoSizer width={width} height={height}>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.VariableSizeList
          {...rest}
          ref={ref}
          css={scrollListStyles(theme, css)}
          height={listHeight}
          width={listWidth}
        />
      )}
    </AutoSizer>
  );
});

export const scrollListStyles = (theme: ITheme['scrollbar'], css?: IBoxCSS) => {
  return [
    cssx`
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
    `,
    css,
  ];
};
