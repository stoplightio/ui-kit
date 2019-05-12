import { Omit } from '@stoplight/types';
import * as React from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from '../';
import { IScrollContainer, ScrollContainer } from '../ScrollContainer';

/**
 * HELPERS
 */

const CustomScrollContainer = React.forwardRef<HTMLDivElement, IScrollContainer & { listHeight: number }>(
  ({ style, listHeight, ...props }, ref) => (
    <ScrollContainer {...props} style={{ ...style, overflow: 'hidden' }} maxHeight={listHeight} forwardedRef={ref} />
  )
);

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
  className?: string;
  height?: number | string;
  maxRows?: number;
}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  const { className, children, height, itemSize, itemCount, maxRows, ...rest } = props;
  const listHeight = (maxRows ? Math.min(itemCount, maxRows) : itemCount) * itemSize;

  return (
    <ReactWindow.FixedSizeList
      {...rest}
      itemSize={itemSize}
      itemCount={itemCount}
      height={listHeight}
      width="100%"
      outerRef={ref}
      outerElementType={outerElemProps => <CustomScrollContainer listHeight={listHeight} {...outerElemProps} />}
    >
      {children}
    </ReactWindow.FixedSizeList>
  );
});

FixedSizeList.displayName = 'FixedSizeList';

/**
 * VARIABLE SIZE LIST
 */
interface IVariableSizeListProps extends Omit<ReactWindow.VariableSizeListProps, 'height' | 'width'> {
  className?: string;
  height?: number | string;
  width?: number | string;
}

const VariableSizeList: React.FunctionComponent<IVariableSizeListProps> = React.forwardRef<
  ReactWindow.VariableSizeList,
  IVariableSizeListProps
>(function VariableSizeList(props, ref) {
  const { className, children, ...rest } = props;

  return (
    <AutoSizer>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.VariableSizeList
          {...rest}
          height={listHeight}
          width={listWidth}
          outerRef={ref}
          outerElementType={ScrollContainer}
        >
          {children}
        </ReactWindow.VariableSizeList>
      )}
    </AutoSizer>
  );
});

VariableSizeList.displayName = 'VariableSizeList';

/**
 * EXPORTS
 */
export { areEqual, shouldComponentUpdate, ListItemKeySelector, FixedSizeList as IFixedSizeList } from 'react-window';

export { IFixedSizeListProps, FixedSizeList, IVariableSizeListProps, VariableSizeList };
