import * as React from 'react';
import { AutoSizer, Index, List, ListRowProps, ListRowRenderer } from 'react-virtualized';

import { Box } from './Box';
import { styled } from './utils';

export interface IScrollListItemProps {
  key: string;
  index: number;
  value: any;
  style: React.CSSProperties;
}

export interface IOnScroll {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
}

export interface IScrollListProps {
  // Either a fixed row height (number) or a function that returns the height of a row given its index.
  rowHeight: number | ((params: Index) => number);

  // Responsible for rendering a row
  rowRenderer: ({ key, index, value }: IScrollListItemProps) => JSX.Element;
  noRowsRenderer?: () => JSX.Element;
  onScroll?: (e: IOnScroll) => void;
  list: any[];

  // Controls the alignment scrolled-to-rows.
  scrollToAlignment?: 'auto' | 'start' | 'end' | 'center';

  // Row index to ensure visible (by forcefully scrolling if necessary)
  scrollToIndex?: number;

  // Forced vertical scroll offset; can be used to synchronize scrolling between components
  offset?: number;
}

const ListView = (props: IScrollListProps & { className: string }) => {
  const {
    className,
    list,
    rowHeight,
    scrollToIndex,
    scrollToAlignment,
    offset,
    rowRenderer,
    noRowsRenderer,
    onScroll,
  } = props;

  const [clientHeight, setClientHeight] = React.useState(0);
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [isScrolling, setisScrolling] = React.useState(false);

  const renderRow = ({ key, index, style }: ListRowProps) => rowRenderer({ key, index, value: list[index], style });

  const getThumbVerticalHeight = (height: number) => {
    if (scrollHeight < clientHeight) return 0;

    const trackHeight = height - 12; // // subtract the top and bottom from div below 2+10
    const h = Math.ceil((clientHeight / scrollHeight) * trackHeight);

    return Math.max(h, 30);
  };

  const getThumbVerticalY = (height: number) => {
    const trackHeight = height - 12; // subtrack the rop and bottom from div below 2+10
    return (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - getThumbVerticalHeight(height));
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Box height={height} width={width} overflow="hidden" className={'box'}>
          <List
            className={className}
            rowHeight={rowHeight}
            rowCount={list.length}
            rowRenderer={renderRow as ListRowRenderer}
            noRowsRenderer={noRowsRenderer}
            onScroll={(e: IOnScroll) => {
              setClientHeight(e.clientHeight);
              setScrollHeight(e.scrollHeight);
              setScrollTop(e.scrollTop);

              if (isScrolling) {
                // @ts-ignore
                clearTimeout(isScrolling);
              }

              setisScrolling(
                // @ts-ignore
                setTimeout(() => {
                  setisScrolling(false);
                }, 1000)
              );

              if (onScroll) {
                onScroll(e);
              }
            }}
            scrollToAlignment={scrollToAlignment}
            scrollToIndex={scrollToIndex}
            scrollTop={offset}
            height={height + 15} // add 15 to offset the native scrollbars
            width={width + 15} // add 15 to offset the native scrollbars
          />

          {/** scrollbar */}
          <div
            style={{
              background: 'transparent',
              position: 'absolute',
              right: '2px',
              top: '2px',
              bottom: '10px',
              cursor: 'pointer',
            }}
          >
            <Box
              className={'scroll1'}
              height={`${getThumbVerticalHeight(height)}px`}
              width="6px"
              cursor="grab"
              radius="full"
              opacity={isScrolling ? 1 : 0}
              bg="scrollbar.bg"
              css={{
                transform: `translateY(${getThumbVerticalY(height)}px)`,
                transition: 'opacity .1s',
              }}
            />
          </div>
        </Box>
      )}
    </AutoSizer>
  );
};

export const ScrollList = styled<IScrollListProps>(ListView as any)``;
