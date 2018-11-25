import * as React from 'react';
import { AutoSizer, Index, List, ListRowProps, ListRowRenderer } from 'react-virtualized';

import { styled, themeGet } from './utils';

export interface IListScrollerItemProps {
  key: string;
  index: number;
  value: any;
  style: React.CSSProperties;
}

export interface IListScrollerProps {
  // Either a fixed row height (number) or a function that returns the height of a row given its index.
  rowHeight: number | ((params: Index) => number);

  // Responsible for rendering a row
  rowRenderer: ({ key, index, value }: IListScrollerItemProps) => JSX.Element;
  noRowsRenderer?: () => JSX.Element;
  onScroll?: () => void;
  list: any[];

  // Controls the alignment scrolled-to-rows.
  scrollToAlignment?: 'auto' | 'start' | 'end' | 'center';

  // Row index to ensure visible (by forcefully scrolling if necessary)
  scrollToIndex?: number;

  // Forced vertical scroll offset; can be used to synchronize scrolling between components
  scrollTop?: number;
}

const ListView = (props: IListScrollerProps & { className: string }) => {
  const {
    className,
    list,
    rowHeight,
    scrollToIndex,
    scrollToAlignment,
    scrollTop,
    rowRenderer,
    noRowsRenderer,
    onScroll,
  } = props;

  const renderRow = ({ key, index, style }: ListRowProps) => rowRenderer({ key, index, value: list[index], style });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className={className}
          height={height}
          rowHeight={rowHeight}
          rowCount={list.length}
          rowRenderer={renderRow as ListRowRenderer}
          noRowsRenderer={noRowsRenderer}
          onScroll={onScroll}
          scrollToAlignment={scrollToAlignment}
          scrollToIndex={scrollToIndex}
          scrollTop={scrollTop}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export const ListScroller = styled<IListScrollerProps>(ListView as any)`
  ::-webkit-scrollbar {
    background: none;
    width: ${themeGet('scrollbars.width')};
  }

  ::-webkit-scrollbar-thumb {
    background: ${themeGet('scrollbars.thumb')};
    border-radius: ${themeGet('scrollbars.thumbRadius')};
  }
`;
