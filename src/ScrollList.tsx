/* @jsx jsx */

import { jsx } from '@emotion/core';
import { FunctionComponent, ReactNode, useState } from 'react';
import { AutoSizer, List, ListProps, ListRowProps } from 'react-virtualized';

import { Box } from './Box';
import { useTheme } from './theme';
import { getScrollTransform, getThumbDimension, verticalTrackStyle } from './utils/scroll';

export interface IScrollListItemProps extends ListRowProps {
  value: any;
}

export interface IOnScroll {
  clientHeight?: number;
  scrollHeight?: number;
  scrollTop?: number;
}

export declare type RowRendererFunc = ({ key, index, value }: IScrollListItemProps) => ReactNode;

export interface IScrollListProps {
  // Either a fixed row height (number) or a function that returns the height of a row given its index.
  rowHeight: ListProps['rowHeight'];

  // Responsible for rendering a row
  rowRenderer: RowRendererFunc;
  noRowsRenderer?: ListProps['noRowsRenderer'];
  onScroll?: (e: IOnScroll) => void;
  list: any[];

  // Controls the alignment scrolled-to-rows.
  scrollToAlignment?: 'auto' | 'start' | 'end' | 'center';

  // Row index to ensure visible (by forcefully scrolling if necessary)
  scrollToIndex?: number;

  // Forced vertical scroll offset; can be used to synchronize scrolling between components
  offset?: number;
}

export interface IScrollList extends IScrollListProps {}

export const ScrollList: FunctionComponent<IScrollList> = props => {
  const { list, offset, rowRenderer, onScroll, ...rest } = props;
  const theme = useTheme();

  const [{ clientHeight, scrollHeight, scrollTop }, setScrollEvent] = useState<IOnScroll>({});
  const thumbSize = getThumbDimension({ scroll: scrollHeight, client: clientHeight });

  const [isScrolling, setIsScrolling] = useState<null | number | NodeJS.Timer>(null);

  const renderRow = ({ index, ...rowProps }: ListRowProps) => rowRenderer({ index, value: list[index], ...rowProps });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Box height={height} width={width} overflow="hidden">
          <List
            {...rest}
            rowCount={list.length}
            rowRenderer={renderRow}
            onScroll={(e: IOnScroll) => {
              setScrollEvent(e);

              if (isScrolling !== null) {
                clearTimeout(isScrolling as number);
              }

              setIsScrolling(
                setTimeout(() => {
                  setIsScrolling(null);
                }, 1000)
              );

              if (onScroll) {
                onScroll(e);
              }
            }}
            scrollTop={offset}
            height={height + 15} // add 15 to offset the native scrollbars
            width={width + 15} // add 15 to offset the native scrollbars
          />

          {/** scrollbar */}
          <Box
            {...verticalTrackStyle()}
            height={`${thumbSize}px`}
            width="6px"
            cursor="grab"
            borderRadius="10px"
            opacity={isScrolling ? 1 : 0}
            backgroundColor={theme.scrollbar.bg}
            transform={`translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbSize)}px)`}
            transition="opacity .1s"
          />
        </Box>
      )}
    </AutoSizer>
  );
};
