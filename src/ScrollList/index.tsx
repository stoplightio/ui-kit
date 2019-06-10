import { Omit } from '@stoplight/types';
import * as cn from 'classnames';
import * as React from 'react';
import * as ReactWindow from 'react-window';

import min = require('lodash/min');
import noop = require('lodash/noop');

import { AutoSizer } from '../AutoSizer';
import { ScrollContainer } from '../ScrollContainer';

/**
 * HELPERS
 */

export const CustomScrollContainer = React.forwardRef<HTMLDivElement, IFixedSizeListProps & { listHeight: number }>(
  ({ onScroll = noop, children, style, className }, ref) => {
    return (
      <div ref={ref} style={style} className="ScrollList-Scrollbars">
        <ScrollContainer
          // @ts-ignore typings on onScroll are not right?
          onScroll={scrollValues => onScroll({ currentTarget: scrollValues })}
          autosize={false}
        >
          <div className={cn('ScrollList-Content relative', className)}>{children}</div>
        </ScrollContainer>
      </div>
    );
  }
);

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends Omit<ReactWindow.FixedSizeListProps, 'height' | 'width'> {
  className?: string;
  maxRows?: number;
  offset?: number;
}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  const { className, offset = 0, children, itemSize, itemCount, maxRows, style, ...rest } = props;
  const listHeight = (min([itemCount, maxRows]) as number) * itemSize + offset;

  return (
    <div style={{ height: maxRows ? listHeight : '100%' }} className="ScrollList-Container">
      <AutoSizer>
        {({ height, width }) => (
          <ReactWindow.FixedSizeList
            {...rest}
            itemSize={itemSize}
            itemCount={itemCount}
            height={min([height, listHeight]) as number}
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
// interface IVariableSizeListProps extends Omit<ReactWindow.VariableSizeListProps, 'height' | 'width'> {
//   className?: string;
//   height: number | string;
//   width: number | string;
//   shadows?: boolean;
// }

// const VariableSizeList: React.FunctionComponent<IVariableSizeListProps> = React.forwardRef<
//   ReactWindow.VariableSizeList,
//   IVariableSizeListProps
// >(function VariableSizeList(props, ref) {
//   const { className, children, ...rest } = props;

//   return (
//     <ReactWindow.VariableSizeList {...rest} outerRef={ref} outerElementType={ScrollContainer}>
//       {children}
//     </ReactWindow.VariableSizeList>
//   );
// });

// VariableSizeList.displayName = 'VariableSizeList';

/**
 * EXPORTS
 */
export { areEqual, shouldComponentUpdate, ListItemKeySelector, FixedSizeList as IFixedSizeList } from 'react-window';

export { IFixedSizeListProps, FixedSizeList };
