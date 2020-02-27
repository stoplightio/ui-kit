import * as cn from 'classnames';
import { noop } from 'lodash';
import * as React from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer } from '../AutoSizer';
import { ScrollContainer } from '../ScrollContainer';

/**
 * HELPERS
 */

export const CustomScrollContainer = React.forwardRef<HTMLDivElement, IFixedSizeListProps & { listHeight: number }>(
  ({ onScroll = noop, children, style, className }, ref) => {
    return (
      <div style={style} className="ScrollList-Scrollbars">
        <ScrollContainer
          ref={ref}
          // @ts-ignore typings on onScroll are not right?
          onScroll={scrollValues => onScroll({ currentTarget: scrollValues })}
          autosize={false}
        >
          <div className={cn('ScrollList-Content relative', className)}>{children}</div>
        </ScrollContainer>
      </div>
    );
  },
);

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
  className?: string;
  maxRows?: number;
  instanceRef?: React.Ref<ReactWindow.FixedSizeList>;
}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  const { className, children, itemSize, itemCount, instanceRef, maxRows, style, ...rest } = props;
  const listHeight = Math.min(itemCount, maxRows || Infinity) * itemSize;

  return (
    <div style={{ height: maxRows ? listHeight : '100%' }} className="ScrollList-Container">
      <AutoSizer>
        {({ height, width }) => (
          <ReactWindow.FixedSizeList
            {...rest}
            ref={instanceRef}
            itemSize={itemSize}
            itemCount={itemCount}
            height={Math.min(height, listHeight)}
            width={width}
            // className gets passed to ScrollList-Content
            className={className}
            // style gets passed to SrollList-Scrollbars
            style={style}
            outerRef={ref}
            outerElementType={CustomScrollContainer}
          >
            {children}
          </ReactWindow.FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
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
  const { children, instanceRef, ...rest } = props;

  return (
    <div className="ScrollList-Container h-full">
      <AutoSizer>
        {({ height, width }) => (
          <ReactWindow.VariableSizeList
            {...rest}
            ref={instanceRef}
            height={height}
            width={width}
            outerRef={ref}
            outerElementType={CustomScrollContainer}
          >
            {children}
          </ReactWindow.VariableSizeList>
        )}
      </AutoSizer>
    </div>
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
