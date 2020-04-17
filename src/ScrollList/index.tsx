import { noop } from 'lodash';
import * as React from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from '../AutoSizer';
import { ScrollContainer } from '../ScrollContainer';

/**
 * HELPERS
 */

export const CustomScrollContainer = React.forwardRef<
  HTMLDivElement,
  IFixedSizeListProps & { listHeight: number; scrollbarWidth?: number }
>(({ onScroll = noop, children, className, style, scrollbarWidth = 8 }, ref) => {
  return (
    <ScrollContainer
      ref={ref}
      // @ts-ignore typings on onScroll are not right?
      onScroll={scrollValues => onScroll({ currentTarget: scrollValues })}
      autosize={false}
      scrollbarWidth={scrollbarWidth}
      className={className}
      style={style}
    >
      {children}
    </ScrollContainer>
  );
});

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
  className?: string;
  maxRows?: number;
  autoSize?: boolean;
  instanceRef?: React.Ref<ReactWindow.FixedSizeList>;
}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  let { className, children, itemSize, itemCount, instanceRef, maxRows, style, autoSize, ...rest } = props;
  if (isNaN(itemCount)) {
    itemCount = 0;
  }

  const listHeight = Math.min(itemCount, maxRows || Infinity) * itemSize;

  const renderList = ({ height, width }: { height?: number; width?: number } = {}) => {
    return (
      <ReactWindow.FixedSizeList
        {...rest}
        ref={instanceRef}
        itemSize={itemSize}
        itemCount={itemCount}
        height={(height ? Math.min(height, listHeight) : listHeight) || 0}
        width={width || '100%'}
        // className gets passed to ScrollList-Content
        className={className}
        // style gets passed to SrollList-Scrollbars
        style={style}
        outerRef={ref}
        outerElementType={CustomScrollContainer}
      >
        {children}
      </ReactWindow.FixedSizeList>
    );
  };

  if (autoSize) {
    return <AutoSizer>{renderList}</AutoSizer>;
  }

  return renderList();
});

FixedSizeList.displayName = 'FixedSizeList';

/**
 * VARIABLE SIZE LIST
 */
interface IVariableSizeListProps extends Omit<ReactWindow.VariableSizeListProps, 'height' | 'width'> {
  className?: string;
  instanceRef?: React.Ref<ReactWindow.VariableSizeList>;
}

const VariableSizeList: React.FunctionComponent<IVariableSizeListProps> = React.forwardRef<
  ReactWindow.VariableSizeList,
  IVariableSizeListProps
>(function VariableSizeList(props, ref) {
  let { children, instanceRef, itemCount, ...rest } = props;

  if (isNaN(itemCount)) {
    itemCount = 0;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ReactWindow.VariableSizeList
          {...rest}
          ref={instanceRef}
          height={height}
          width={width}
          itemCount={itemCount}
          outerRef={ref}
          outerElementType={CustomScrollContainer}
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
export {
  areEqual,
  shouldComponentUpdate,
  ListItemKeySelector,
  FixedSizeList as IFixedSizeList,
  VariableSizeList as IVariableSizeList,
} from 'react-window';

export { IFixedSizeListProps, FixedSizeList, IVariableSizeListProps, VariableSizeList };
