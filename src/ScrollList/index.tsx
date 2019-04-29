import * as cn from 'classnames';
import * as React from 'react';
import * as ReactWindow from 'react-window';

import { AutoSizer, Classes } from '../index';

/**
 * FIXED SIZE LIST
 */
interface IFixedSizeListProps extends ReactWindow.FixedSizeListProps {
  className?: string;
  autoHideTimeout?: number;
}

const FixedSizeList: React.FunctionComponent<IFixedSizeListProps> = React.forwardRef<
  ReactWindow.FixedSizeList,
  IFixedSizeListProps
>(function FixedSizeList(props, ref) {
  const { className, autoHideTimeout = 500, ...rest } = props;

  const [scrollOffset, setScrollOffset] = React.useState<null | number>(null);
  const [scrollHeight, setScrollHeight] = React.useState<null | number>(null);
  const [isScrolling, setIsScrolling] = React.useState<null | number | NodeJS.Timer>(null);

  const outerRef = React.useRef(null);

  // wrap in outer div to hide native scrollbars
  return (
    <AutoSizer>
      {({ width: listWidth, height: listHeight }) => (
        <div className="relative overflow-hidden" style={{ height: listHeight, width: listWidth }}>
          <ReactWindow.FixedSizeList
            {...rest}
            className={cn(className)}
            style={{ marginRight: -15 }}
            height={listHeight}
            width={listWidth + 15}
            outerRef={outerRef}
            onScroll={() => {
              if (outerRef.current) {
                // @ts-ignore says current can be null despite the check
                setScrollHeight(outerRef.current.scrollWidth);
                // @ts-ignore
                setScrollOffset(outerRef.current.scrollTop);
              }

              if (isScrolling !== null) {
                clearTimeout(isScrolling as number);
              }

              setIsScrolling(
                setTimeout(() => {
                  setIsScrolling(null);
                }, autoHideTimeout)
              );
            }}
          />
          <div className={cn(Classes.SCROLL_TRACK, 'vertical')} style={{ width: 6 }}>
            <div
              className={cn(Classes.SCROLL_THUMB, !isScrolling && 'static')}
              style={{
                display: 'block',
                position: 'relative',
                height: scrollHeight ? scrollHeight - 12 : 0,
                width: '6px',
                transform: `translateY(${scrollOffset}px)`,
              }}
            />
          </div>
        </div>
      )}
    </AutoSizer>
  );
});

FixedSizeList.displayName = 'FixedSizeList';

/**
 * VARIABLE SIZE LIST
 */
interface IVariableSizeListProps extends ReactWindow.VariableSizeListProps {
  className?: string;
}

const VariableSizeList: React.FunctionComponent<IVariableSizeListProps> = React.forwardRef<
  ReactWindow.VariableSizeList,
  IVariableSizeListProps
>(function VariableSizeList(props, ref) {
  const { className, ...rest } = props;

  return (
    <AutoSizer>
      {({ width: listWidth, height: listHeight }) => (
        <ReactWindow.VariableSizeList
          {...rest}
          ref={ref}
          className={cn(className)}
          style={{ marginRight: -15 }}
          height={listHeight}
          width={listWidth + 15}
        />
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
