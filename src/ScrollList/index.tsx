import * as React from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from '../';
import { IScrollContainer, ScrollContainer } from '../ScrollContainer';

/**
 * HELPERS
 */

const CustomScrollContainer = React.forwardRef<HTMLDivElement, IScrollContainer>(({ style, ...props }, ref) => (
  <ScrollContainer {...props} style={{ ...style, overflow: 'hidden' }} forwardedRef={ref} />
));

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends ReactWindow.FixedSizeListProps {}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  const { className, children, height, width, ...rest } = props;

  return (
    <AutoSizer>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.FixedSizeList
          {...rest}
          height={height || listHeight}
          width={width || listWidth}
          outerRef={ref}
          outerElementType={CustomScrollContainer}
        >
          {children}
        </ReactWindow.FixedSizeList>
      )}
    </AutoSizer>
  );
});

FixedSizeList.displayName = 'FixedSizeList';

/**
 * VARIABLE SIZE LIST
 */
interface IVariableSizeListProps extends ReactWindow.VariableSizeListProps {}

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
